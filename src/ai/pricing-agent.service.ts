import { Injectable } from "@nestjs/common";

@Injectable()
export class PricingAgentService {
  calculatePrice(
    intent: any,
    distanceKm: number,
    baseRate: number,
    isNightTime: boolean = false,
  ) {
    let urgencySurge = 0;
    if (intent.urgency === "high") urgencySurge = 0.2;
    else if (intent.urgency === "low") urgencySurge = -0.1;

    const timeSurge = isNightTime ? 0.3 : 0;

    let distanceCost = 0;
    if (distanceKm > 3) {
      distanceCost = (distanceKm - 3) * 50; // 50 PKR per extra km
    }

    const totalSurgeMultiplier = 1 + urgencySurge + timeSurge;
    const total = Math.round((baseRate + distanceCost) * totalSurgeMultiplier);

    return {
      base: baseRate,
      distance: Math.round(distanceCost),
      urgency: Math.round(baseRate * urgencySurge),
      surge: Math.round(baseRate * timeSurge),
      total,
      isEstimated: true,
    };
  }
}
