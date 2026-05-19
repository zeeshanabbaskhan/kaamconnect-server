import { ProvidersService } from "./providers.service";
export declare class ProvidersController {
    private readonly providersService;
    constructor(providersService: ProvidersService);
    getAll(query: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/provider.schema").ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    search(body: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/provider.schema").ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[] | {
        distanceKm: number;
        name: string;
        phone: string;
        passwordHash: string;
        skills: string[];
        cnic: string;
        location: {
            lat: number;
            lng: number;
        };
        rating: number;
        reviewCount: number;
        completedJobs: number;
        reliabilityScore: number;
        status: string;
        baseRatePerHour: number;
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }[]>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/provider.schema").ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getStats(id: string): Promise<{
        provider: (import("mongoose").Document<unknown, {}, import("../schemas/provider.schema").ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        }) | null;
        recentReviews: (import("mongoose").Document<unknown, {}, import("../schemas/review.schema").ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    updateProfile(body: any, req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/provider.schema").ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateLocation(body: any, req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/provider.schema").ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
