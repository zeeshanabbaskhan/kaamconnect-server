import { Model } from 'mongoose';
import { ReviewDocument } from '../schemas/review.schema';
import { ProviderDocument } from '../schemas/provider.schema';
import { BookingDocument } from '../schemas/booking.schema';
import { GeminiService } from '../ai/gemini.service';
export declare class ReviewsService {
    private reviewModel;
    private providerModel;
    private bookingModel;
    private geminiService;
    constructor(reviewModel: Model<ReviewDocument>, providerModel: Model<ProviderDocument>, bookingModel: Model<BookingDocument>, geminiService: GeminiService);
    createReview(userId: string, dto: any): Promise<import("mongoose").Document<unknown, {}, ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getProviderReviews(providerId: string): Promise<(import("mongoose").Document<unknown, {}, ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
