import { Document } from 'mongoose';
export type ProviderDocument = Provider & Document;
export declare class Provider {
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
}
export declare const ProviderSchema: import("mongoose").Schema<Provider, import("mongoose").Model<Provider, any, any, any, any, any, Provider>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Provider, Document<unknown, {}, Provider, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    passwordHash?: import("mongoose").SchemaDefinitionProperty<string, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    skills?: import("mongoose").SchemaDefinitionProperty<string[], Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    cnic?: import("mongoose").SchemaDefinitionProperty<string, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<{
        lat: number;
        lng: number;
    }, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rating?: import("mongoose").SchemaDefinitionProperty<number, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reviewCount?: import("mongoose").SchemaDefinitionProperty<number, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    completedJobs?: import("mongoose").SchemaDefinitionProperty<number, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reliabilityScore?: import("mongoose").SchemaDefinitionProperty<number, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    baseRatePerHour?: import("mongoose").SchemaDefinitionProperty<number, Provider, Document<unknown, {}, Provider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Provider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Provider>;
