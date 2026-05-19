import { Document, Types } from "mongoose";
export type DisputeDocument = Dispute & Document;
export declare class Dispute {
    bookingId: string;
    userId: string;
    providerId: string;
    type: string;
    description: string;
    status: string;
    aiAnalysis: any;
    refundAmount: number;
    resolution: string;
}
export declare const DisputeSchema: import("mongoose").Schema<Dispute, import("mongoose").Model<Dispute, any, any, any, any, any, Dispute>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Dispute, Document<unknown, {}, Dispute, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    bookingId?: import("mongoose").SchemaDefinitionProperty<string, Dispute, Document<unknown, {}, Dispute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<string, Dispute, Document<unknown, {}, Dispute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    providerId?: import("mongoose").SchemaDefinitionProperty<string, Dispute, Document<unknown, {}, Dispute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, Dispute, Document<unknown, {}, Dispute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Dispute, Document<unknown, {}, Dispute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Dispute, Document<unknown, {}, Dispute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    aiAnalysis?: import("mongoose").SchemaDefinitionProperty<any, Dispute, Document<unknown, {}, Dispute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    refundAmount?: import("mongoose").SchemaDefinitionProperty<number, Dispute, Document<unknown, {}, Dispute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    resolution?: import("mongoose").SchemaDefinitionProperty<string, Dispute, Document<unknown, {}, Dispute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Dispute & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Dispute>;
