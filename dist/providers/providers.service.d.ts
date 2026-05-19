import { Model } from "mongoose";
import { ProviderDocument } from "../schemas/provider.schema";
import { ReviewDocument } from "../schemas/review.schema";
export declare class ProvidersService {
    private providerModel;
    private reviewModel;
    constructor(providerModel: Model<ProviderDocument>, reviewModel: Model<ReviewDocument>);
    getAllProviders(query?: any): Promise<(import("mongoose").Document<unknown, {}, ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProfile(id: string, dto: any): Promise<(import("mongoose").Document<unknown, {}, ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateLocation(id: string, lat: number, lng: number): Promise<(import("mongoose").Document<unknown, {}, ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getProviderStats(id: string): Promise<{
        provider: (import("mongoose").Document<unknown, {}, ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        }) | null;
        recentReviews: (import("mongoose").Document<unknown, {}, ReviewDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    private haversineKm;
    searchProviders(serviceType: string, lat: number, lng: number): Promise<(import("mongoose").Document<unknown, {}, ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    updateRating(providerId: string, newRating: number): Promise<(import("mongoose").Document<unknown, {}, ProviderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/provider.schema").Provider & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | undefined>;
}
