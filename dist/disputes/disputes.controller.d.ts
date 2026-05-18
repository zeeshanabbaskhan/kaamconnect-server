import { DisputesService } from './disputes.service';
export declare class DisputesController {
    private readonly disputesService;
    constructor(disputesService: DisputesService);
    create(body: any, req: any): Promise<{
        dispute: import("mongoose").Document<unknown, {}, import("../schemas/dispute.schema").DisputeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/dispute.schema").Dispute & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        aiAnalysis: any;
    }>;
    getMyDisputes(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/dispute.schema").DisputeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/dispute.schema").Dispute & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    resolve(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/dispute.schema").DisputeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/dispute.schema").Dispute & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
