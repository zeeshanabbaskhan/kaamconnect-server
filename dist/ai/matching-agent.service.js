"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MatchingAgentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchingAgentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
let MatchingAgentService = MatchingAgentService_1 = class MatchingAgentService {
    configService;
    logger = new common_1.Logger(MatchingAgentService_1.name);
    mapsClient = new google_maps_services_js_1.Client({});
    constructor(configService) {
        this.configService = configService;
    }
    calculateHaversineDistance(loc1, loc2) {
        if (!loc1 || !loc2)
            return 5;
        const R = 6371;
        const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
        const dLon = (loc2.lng - loc1.lng) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(loc1.lat * (Math.PI / 180)) *
                Math.cos(loc2.lat * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    async getActualDrivingDistance(origins, destinations) {
        const apiKey = this.configService.get("GOOGLE_MAPS_API_KEY");
        if (!apiKey) {
            this.logger.warn("GOOGLE_MAPS_API_KEY missing. Falling back to Haversine straight-line distance.");
            return destinations.map((dest) => this.calculateHaversineDistance(origins[0], dest));
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
                        return element.distance.value / 1000;
                    }
                    return null;
                });
                return distances.map((d, index) => d !== null
                    ? d
                    : this.calculateHaversineDistance(origins[0], destinations[index]));
            }
            else {
                throw new Error(response.data.error_message ||
                    "Distance Matrix API returned non-OK status");
            }
        }
        catch (error) {
            this.logger.error(`Google Maps Distance Matrix failed: ${error.message}`);
            return destinations.map((dest) => this.calculateHaversineDistance(origins[0], dest));
        }
    }
    async rankProviders(providers, intent, userLocation) {
        if (providers.length === 0)
            return [];
        const providerLocations = providers.map((p) => p.location);
        const actualDistances = await this.getActualDrivingDistance([userLocation], providerLocations);
        const scoredProviders = providers.map((provider, index) => {
            let score = 0;
            const hasSkill = provider.skills.some((s) => s.toLowerCase().includes(intent.serviceType.toLowerCase()));
            if (hasSkill)
                score += 40;
            const distance = actualDistances[index];
            if (distance <= 2)
                score += 30;
            else if (distance <= 5)
                score += 20;
            else if (distance <= 10)
                score += 10;
            score += (provider.rating / 5) * 15;
            score += (provider.reliabilityScore / 100) * 10;
            if (intent.urgency === "high" && provider.status === "active")
                score += 5;
            if (provider.status !== "active")
                score -= 50;
            return { provider, score, distance };
        });
        return scoredProviders
            .sort((a, b) => b.score - a.score)
            .map((p) => ({ ...p.provider, distanceToUser: p.distance }));
    }
};
exports.MatchingAgentService = MatchingAgentService;
exports.MatchingAgentService = MatchingAgentService = MatchingAgentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MatchingAgentService);
//# sourceMappingURL=matching-agent.service.js.map