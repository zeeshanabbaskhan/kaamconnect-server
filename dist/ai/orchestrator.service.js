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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrchestratorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrchestratorService = void 0;
const common_1 = require("@nestjs/common");
const intent_agent_service_1 = require("./intent-agent.service");
const matching_agent_service_1 = require("./matching-agent.service");
const pricing_agent_service_1 = require("./pricing-agent.service");
const dispute_agent_service_1 = require("./dispute-agent.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const kaamconnect_gateway_1 = require("../sockets/kaamconnect.gateway");
let OrchestratorService = OrchestratorService_1 = class OrchestratorService {
    intentAgent;
    matchingAgent;
    pricingAgent;
    disputeAgent;
    providerModel;
    bookingModel;
    gateway;
    logger = new common_1.Logger(OrchestratorService_1.name);
    constructor(intentAgent, matchingAgent, pricingAgent, disputeAgent, providerModel, bookingModel, gateway) {
        this.intentAgent = intentAgent;
        this.matchingAgent = matchingAgent;
        this.pricingAgent = pricingAgent;
        this.disputeAgent = disputeAgent;
        this.providerModel = providerModel;
        this.bookingModel = bookingModel;
        this.gateway = gateway;
    }
    async handleBookingFlow(userId, requestText, userLocation, scheduledTime, userPreferences) {
        this.logger.log(`[Orchestrator] Starting flow for User ${userId}`);
        const intent = await this.intentAgent.extractIntent(requestText);
        this.logger.log(`[Orchestrator] Intent: ${JSON.stringify(intent)}`);
        const allProviders = await this.providerModel
            .find({ status: "active" })
            .lean();
        const matchedProviders = await this.matchingAgent.rankProviders(allProviders, intent, userLocation);
        if (userPreferences?.maxBudget) {
        }
        if (matchedProviders.length === 0) {
            throw new common_1.NotFoundException("No available providers found for this service.");
        }
        const bestProvider = matchedProviders[0];
        this.logger.log(`[Orchestrator] Best match: Provider ${bestProvider._id}`);
        const distance = bestProvider.distanceToUser || 2.5;
        const pricing = this.pricingAgent.calculatePrice(intent, distance, bestProvider.baseRatePerHour || 1000);
        this.logger.log(`[Orchestrator] Pricing: ${JSON.stringify(pricing)}`);
        const booking = await this.bookingModel.create({
            userId,
            providerId: bestProvider._id,
            serviceType: intent.serviceType,
            description: requestText,
            location: userLocation,
            status: "matched",
            pricing,
            aiIntentAnalysis: intent,
            scheduledTime: scheduledTime || new Date(),
        });
        return {
            message: "Booking successfully orchestrated",
            bookingId: booking._id,
            provider: {
                id: bestProvider._id,
                name: bestProvider.name,
                rating: bestProvider.rating,
                distance,
            },
            pricing,
            intent,
        };
    }
    async handleDispute(disputeDetails, bookingId) {
        this.logger.log(`[Orchestrator] Handling dispute for Booking ${bookingId}`);
    }
};
exports.OrchestratorService = OrchestratorService;
exports.OrchestratorService = OrchestratorService = OrchestratorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mongoose_1.InjectModel)("Provider")),
    __param(5, (0, mongoose_1.InjectModel)("Booking")),
    __metadata("design:paramtypes", [intent_agent_service_1.IntentAgentService,
        matching_agent_service_1.MatchingAgentService,
        pricing_agent_service_1.PricingAgentService,
        dispute_agent_service_1.DisputeAgentService,
        mongoose_2.Model,
        mongoose_2.Model,
        kaamconnect_gateway_1.KaamConnectGateway])
], OrchestratorService);
//# sourceMappingURL=orchestrator.service.js.map