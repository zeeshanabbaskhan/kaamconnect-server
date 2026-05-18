import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type DisputeDocument = Dispute & Document;

@Schema({ timestamps: true })
export class Dispute {
  @Prop({ type: Types.ObjectId, ref: "Booking", required: true })
  bookingId: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: "Provider", required: true })
  providerId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    default: "investigating",
    enum: ["investigating", "resolved", "escalated"],
  })
  status: string;

  @Prop({ type: Object })
  aiAnalysis: any;

  @Prop({ default: 0 })
  refundAmount: number;

  @Prop()
  resolution: string;
}

export const DisputeSchema = SchemaFactory.createForClass(Dispute);
