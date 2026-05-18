import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProviderDocument = Provider & Document;

@Schema({ timestamps: true })
export class Provider {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: [String], required: true })
  skills: string[];

  @Prop({ required: true })
  cnic: string;

  @Prop({ type: Object })
  location: { lat: number; lng: number };

  @Prop({ default: 5.0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({ default: 0 })
  completedJobs: number;

  @Prop({ default: 100 })
  reliabilityScore: number;

  @Prop({ default: "active", enum: ["active", "busy", "offline", "suspended"] })
  status: string;

  @Prop({ default: 0 })
  baseRatePerHour: number;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
