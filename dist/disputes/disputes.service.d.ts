import { Model } from 'mongoose';
import { DisputeDocument } from '../schemas/dispute.schema';
import { BookingDocument } from '../schemas/booking.schema';
import { ProviderDocument } from '../schemas/provider.schema';
import { DisputeAgentService } from '../ai/dispute-agent.service';
export declare class DisputesService {
    private disputeModel;
    private bookingModel;
    private providerModel;
    private disputeAgent;
    constructor(disputeModel: Model<DisputeDocument>, bookingModel: Model<BookingDocument>, providerModel: Model<ProviderDocument>, disputeAgent: DisputeAgentService);
    createDispute(userId: string, dto: any): Promise<{
        dispute: import("mongoose").Document<unknown, {}, DisputeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/dispute.schema").Dispute & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        aiAnalysis: any;
    }>;
    getMyDisputes(userId: string): Promise<(import("mongoose").Document<unknown, {}, DisputeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/dispute.schema").Dispute & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    resolveDispute(id: string): Promise<(import("mongoose").Document<unknown, {}, DisputeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/dispute.schema").Dispute & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
