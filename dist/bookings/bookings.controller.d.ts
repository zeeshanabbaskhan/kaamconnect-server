import { BookingsService } from "./bookings.service";
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(body: any, req: any): Promise<{
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
    getMyBookings(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getProviderBookings(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateStatus(id: string, body: any, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/booking.schema").BookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/booking.schema").Booking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
