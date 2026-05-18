import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: "Provider" })
  providerId: string;

  @Prop({ required: true })
  serviceType: string;

  @Prop()
  description: string;

  @Prop({ type: Object, required: true })
  location: { lat: number; lng: number; address: string };

  @Prop({
    default: "requested",
    enum: [
      "requested",
      "matched",
      "provider_en_route",
      "in_progress",
      "completed",
      "disputed",
      "cancelled",
    ],
  })
  status: string;

  @Prop({ type: Object })
  pricing: {
    base: number;
    distance: number;
    urgency: number;
    surge: number;
    total: number;
    isEstimated: boolean;
  };

  @Prop({ type: Object })
  aiIntentAnalysis: any;

  @Prop()
  scheduledTime: Date;

  @Prop({ type: Object })
  feedback: { rating: number; review: string; sentimentScore: number };
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
