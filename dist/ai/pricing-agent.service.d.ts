export declare class PricingAgentService {
    calculatePrice(intent: any, distanceKm: number, baseRate: number, isNightTime?: boolean): {
        base: number;
        distance: number;
        urgency: number;
        surge: number;
        total: number;
        isEstimated: boolean;
    };
}
