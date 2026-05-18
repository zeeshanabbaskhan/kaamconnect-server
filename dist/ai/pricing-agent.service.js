"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingAgentService = void 0;
const common_1 = require("@nestjs/common");
let PricingAgentService = class PricingAgentService {
    calculatePrice(intent, distanceKm, baseRate, isNightTime = false) {
        let urgencySurge = 0;
        if (intent.urgency === 'high')
            urgencySurge = 0.2;
        else if (intent.urgency === 'low')
            urgencySurge = -0.1;
        let timeSurge = isNightTime ? 0.3 : 0;
        let distanceCost = 0;
        if (distanceKm > 3) {
            distanceCost = (distanceKm - 3) * 50;
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
};
exports.PricingAgentService = PricingAgentService;
exports.PricingAgentService = PricingAgentService = __decorate([
    (0, common_1.Injectable)()
], PricingAgentService);
//# sourceMappingURL=pricing-agent.service.js.map