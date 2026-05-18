"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const gemini_service_1 = require("../ai/gemini.service");
let ReviewsService = class ReviewsService {
    reviewModel;
    providerModel;
    bookingModel;
    geminiService;
    constructor(reviewModel, providerModel, bookingModel, geminiService) {
        this.reviewModel = reviewModel;
        this.providerModel = providerModel;
        this.bookingModel = bookingModel;
        this.geminiService = geminiService;
    }
    async createReview(userId, dto) {
        const sentimentPrompt = `
Analyze the sentiment of this service review and return JSON:
Review: "${dto.review}"
Return: {"score": 0.0-1.0, "label": "positive|neutral|negative"}
`;
        let sentimentScore = 0.7;
        try {
            const raw = await this.geminiService.generateText(sentimentPrompt);
            const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
            sentimentScore = parsed.score || 0.7;
        }
        catch { }
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
            provider.rating = Math.round(updatedRating * 10) / 10;
            provider.reviewCount = (provider.reviewCount || 0) + 1;
            await provider.save();
        }
        await this.bookingModel.findByIdAndUpdate(dto.bookingId, {
            feedback: { rating: dto.rating, review: dto.review, sentimentScore },
            status: 'completed',
        });
        return review;
    }
    async getProviderReviews(providerId) {
        return this.reviewModel
            .find({ providerId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Review')),
    __param(1, (0, mongoose_1.InjectModel)('Provider')),
    __param(2, (0, mongoose_1.InjectModel)('Booking')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        gemini_service_1.GeminiService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map