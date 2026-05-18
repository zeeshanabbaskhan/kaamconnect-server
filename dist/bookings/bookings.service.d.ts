import { Model } from 'mongoose';
import { BookingDocument } from '../schemas/booking.schema';
import { ProviderDocument } from '../schemas/provider.schema';
import { UserDocument } from '../schemas/user.schema';
import { OrchestratorService } from '../ai/orchestrator.service';
export declare class BookingsService {
    private bookingModel;
    private providerModel;
    private userModel;
    private orchestrator;
    constructor(bookingModel: Model<BookingDocument>, providerModel: Model<ProviderDocument>, userModel: Model<UserDocument>, orchestrator: OrchestratorService);
    createBooking(userId: string, request: string, location: any, scheduledTime?: Date): Promise<{
        message: string;
        bookingId: import("mongoose").Types.ObjectId;
        provider: {
            id: any;
            name: any;
            rating: any;
            distance: any;
        };
        pricing: {
            base: number;
            distance: number;
            urgency: number;
            surge: number;
            total: number;
            isEstimated: boolean;
        };
        intent: any;
    }>;
    getMyBookings(userId: string): Promise<(import("mongoose").Document<unknown, {}, BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getProviderBookings(providerId: string): Promise<(import("mongoose").Document<unknown, {}, BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateStatus(id: string, status: string, providerId?: string): Promise<import("mongoose").Document<unknown, {}, BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
