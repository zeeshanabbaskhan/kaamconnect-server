import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReviewDocument } from "../schemas/review.schema";
import { ProviderDocument } from "../schemas/provider.schema";
import { BookingDocument } from "../schemas/booking.schema";
import { LlmService } from "../ai/llm.service";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel("Review") private reviewModel: Model<ReviewDocument>,
    @InjectModel("Provider") private providerModel: Model<ProviderDocument>,
    @InjectModel("Booking") private bookingModel: Model<BookingDocument>,
    private llm: LlmService,
  ) {}

  async createReview(userId: string, dto: any) {
    const sentimentPrompt = `
Analyze the sentiment of this service review and return JSON:
Review: "${dto.review}"
Return: {"score": 0.0-1.0, "label": "positive|neutral|negative"}
`;
    let sentimentScore = 0.7;
    try {
      const raw = await this.llm.generateText(sentimentPrompt);
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      sentimentScore = parsed.score || 0.7;
    } catch {
      // ignore parse error if LLM fails
    }

    const review = await this.reviewModel.create({
      bookingId: dto.bookingId,
      providerId: dto.providerId,
      userId,
      rating: dto.rating,
      review: dto.review,
      sentimentScore,
      tags: dto.tags || [],
    });

    const provider = await this.providerModel.findById(dto.providerId);
    if (provider) {
      const updatedRating = 0.8 * (provider.rating || 3) + 0.2 * dto.rating;
      await this.providerModel.findByIdAndUpdate(dto.providerId, {
        rating: Math.round(updatedRating * 10) / 10,
        $inc: { reviewCount: 1, completedJobs: 1 },
      });
    }

    await this.bookingModel.findByIdAndUpdate(dto.bookingId, {
      feedback: { rating: dto.rating, review: dto.review, sentimentScore },
      status: "completed",
    });

    return review;
  }

  async getProviderReviews(providerId: string) {
    return this.reviewModel
      .find({ providerId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
  }
}
