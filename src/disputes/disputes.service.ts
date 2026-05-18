import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DisputeDocument } from "../schemas/dispute.schema";
import { BookingDocument } from "../schemas/booking.schema";
import { ProviderDocument } from "../schemas/provider.schema";
import { DisputeAgentService } from "../ai/dispute-agent.service";

@Injectable()
export class DisputesService {
  constructor(
    @InjectModel("Dispute") private disputeModel: Model<DisputeDocument>,
    @InjectModel("Booking") private bookingModel: Model<BookingDocument>,
    @InjectModel("Provider") private providerModel: Model<ProviderDocument>,
    private disputeAgent: DisputeAgentService,
  ) {}

  async createDispute(userId: string, dto: any) {
    const booking = await this.bookingModel
      .findOne({ _id: dto.bookingId, userId })
      .lean();
    if (!booking) throw new NotFoundException("Booking not found");

    const provider = await this.providerModel
      .findById(booking.providerId)
      .lean();
    if (!provider) throw new NotFoundException("Provider not found");

    const analysis = await this.disputeAgent.analyzeDispute(
      { type: dto.type, description: dto.description },
      booking,
      provider,
    );

    const dispute = await this.disputeModel.create({
      bookingId: dto.bookingId,
      userId,
      providerId: booking.providerId,
      type: dto.type,
      description: dto.description,
      status: "investigating",
      aiAnalysis: analysis,
      refundAmount: analysis.refundAmount,
      resolution: analysis.explanation,
    });

    await this.bookingModel.findByIdAndUpdate(dto.bookingId, {
      status: "disputed",
    });

    if (analysis.penalizeProvider && analysis.reliabilityDeduction > 0) {
      await this.providerModel.findByIdAndUpdate(booking.providerId, {
        $inc: { reliabilityScore: -analysis.reliabilityDeduction },
      });
    }

    return { dispute, aiAnalysis: analysis };
  }

  async getMyDisputes(userId: string) {
    return this.disputeModel
      .find({ userId })
      .populate("bookingId")
      .populate("providerId", "name phone")
      .sort({ createdAt: -1 });
  }

  async resolveDispute(id: string) {
    return this.disputeModel.findByIdAndUpdate(
      id,
      { status: "resolved" },
      { new: true },
    );
  }
}
