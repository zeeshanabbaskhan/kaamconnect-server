import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProviderDocument } from "../schemas/provider.schema";
import { ReviewDocument } from "../schemas/review.schema";

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel("Provider") private providerModel: Model<ProviderDocument>,
    @InjectModel("Review") private reviewModel: Model<ReviewDocument>,
  ) {}

  async getAllProviders(query: any = {}) {
    const filter: any = { status: "active" };
    if (query.skill) filter.skills = { $regex: query.skill, $options: "i" };
    return this.providerModel
      .find(filter)
      .select("-passwordHash")
      .sort({ rating: -1 });
  }

  async getById(id: string) {
    const provider = await this.providerModel
      .findById(id)
      .select("-passwordHash");
    if (!provider) throw new NotFoundException("Provider not found");
    return provider;
  }

  async updateProfile(id: string, dto: any) {
    return this.providerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select("-passwordHash");
  }

  async updateLocation(id: string, lat: number, lng: number) {
    return this.providerModel.findByIdAndUpdate(
      id,
      { location: { lat, lng } },
      { new: true },
    );
  }

  async getProviderStats(id: string) {
    const provider = await this.providerModel
      .findById(id)
      .select("-passwordHash");
    const reviews = await this.reviewModel
      .find({ providerId: id })
      .sort({ createdAt: -1 })
      .limit(5);
    return { provider, recentReviews: reviews };
  }

  private haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  async searchProviders(serviceType: string, lat: number, lng: number) {
    const providers = await this.providerModel
      .find({
        skills: { $regex: serviceType, $options: "i" },
        status: "active",
      })
      .select("-passwordHash")
      .limit(50); // Fetch more then sort/trim by distance

    // If coordinates supplied, sort by distance ascending and return nearest 20
    if (lat && lng) {
      return providers
        .map((p) => {
          const distanceKm =
            p.location?.lat && p.location?.lng
              ? this.haversineKm(lat, lng, p.location.lat, p.location.lng)
              : 9999;
          return { ...p.toObject(), distanceKm };
        })
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, 20);
    }

    return providers;
  }

  async updateRating(providerId: string, newRating: number) {
    const provider = await this.providerModel.findById(providerId);
    if (!provider) return;
    const updatedRating = 0.8 * (provider.rating || 0) + 0.2 * newRating;
    provider.rating = Math.round(updatedRating * 10) / 10;
    provider.reviewCount = (provider.reviewCount || 0) + 1;
    provider.completedJobs = (provider.completedJobs || 0) + 1;
    await provider.save();
    return provider;
  }
}
