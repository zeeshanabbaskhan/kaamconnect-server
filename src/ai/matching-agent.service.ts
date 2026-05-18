import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from "@googlemaps/google-maps-services-js";

@Injectable()
export class MatchingAgentService {
  private logger = new Logger(MatchingAgentService.name);
  private mapsClient = new Client({});

  constructor(private configService: ConfigService) {}

  private calculateHaversineDistance(loc1: any, loc2: any) {
    if (!loc1 || !loc2) return 5;
    const R = 6371;
    const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const dLon = (loc2.lng - loc1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * (Math.PI / 180)) *
        Math.cos(loc2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private async getActualDrivingDistance(
    origins: any[],
    destinations: any[],
  ): Promise<number[]> {
    const apiKey = this.configService.get<string>("GOOGLE_MAPS_API_KEY");

    if (!apiKey) {
      this.logger.warn(
        "GOOGLE_MAPS_API_KEY missing. Falling back to Haversine straight-line distance.",
      );
      return destinations.map((dest) =>
        this.calculateHaversineDistance(origins[0], dest),
      );
    }

    try {
      const response = await this.mapsClient.distancematrix({
        params: {
          origins: origins.map((loc) => ({ lat: loc.lat, lng: loc.lng })),
          destinations: destinations.map((loc) => ({
            lat: loc.lat,
            lng: loc.lng,
          })),
          key: apiKey,
        },
      });

      if (response.data.status === "OK") {
        const distances = response.data.rows[0].elements.map((element) => {
          if (element.status === "OK") {
            // Distance comes back in meters, return km
            return element.distance.value / 1000;
          }
          return null; // Route not found
        });

        return distances.map((d, index) =>
          d !== null
            ? d
            : this.calculateHaversineDistance(origins[0], destinations[index]),
        );
      } else {
        throw new Error(
          response.data.error_message ||
            "Distance Matrix API returned non-OK status",
        );
      }
    } catch (error: any) {
      this.logger.error(`Google Maps Distance Matrix failed: ${error.message}`);
      return destinations.map((dest) =>
        this.calculateHaversineDistance(origins[0], dest),
      );
    }
  }

  async rankProviders(providers: any[], intent: any, userLocation: any) {
    if (providers.length === 0) return [];

    // Batch fetch distances for all providers to save API calls
    const providerLocations = providers.map((p) => p.location);
    const actualDistances = await this.getActualDrivingDistance(
      [userLocation],
      providerLocations,
    );

    const scoredProviders = providers.map((provider, index) => {
      let score = 0;

      const hasSkill = provider.skills.some((s: string) =>
        s.toLowerCase().includes(intent.serviceType.toLowerCase()),
      );
      if (hasSkill) score += 40;

      const distance = actualDistances[index];
      if (distance <= 2) score += 30;
      else if (distance <= 5) score += 20;
      else if (distance <= 10) score += 10;

      score += (provider.rating / 5) * 15;
      score += (provider.reliabilityScore / 100) * 10;

      if (intent.urgency === "high" && provider.status === "active") score += 5;
      if (provider.status !== "active") score -= 50;

      return { provider, score, distance };
    });

    return scoredProviders
      .sort((a, b) => b.score - a.score)
      .map((p) => ({ ...p.provider, distanceToUser: p.distance }));
  }
}
