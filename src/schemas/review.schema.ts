import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, ref: "Booking", required: true })
  bookingId: string;

  @Prop({ type: Types.ObjectId, ref: "Provider", required: true })
  providerId: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop()
  review: string;

  @Prop({ default: 0.5 })
  sentimentScore: number;

  @Prop({ type: [String] })
  tags: string[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
