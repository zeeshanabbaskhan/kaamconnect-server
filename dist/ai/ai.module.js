"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const gemini_service_1 = require("./gemini.service");
const intent_agent_service_1 = require("./intent-agent.service");
const matching_agent_service_1 = require("./matching-agent.service");
const pricing_agent_service_1 = require("./pricing-agent.service");
const dispute_agent_service_1 = require("./dispute-agent.service");
const orchestrator_service_1 = require("./orchestrator.service");
const ai_controller_1 = require("./ai.controller");
const provider_schema_1 = require("../schemas/provider.schema");
const booking_schema_1 = require("../schemas/booking.schema");
const config_1 = require("@nestjs/config");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Provider', schema: provider_schema_1.ProviderSchema },
                { name: 'Booking', schema: booking_schema_1.BookingSchema },
            ]),
        ],
        controllers: [ai_controller_1.AiController],
        providers: [
            gemini_service_1.GeminiService,
            intent_agent_service_1.IntentAgentService,
            matching_agent_service_1.MatchingAgentService,
            pricing_agent_service_1.PricingAgentService,
            dispute_agent_service_1.DisputeAgentService,
            orchestrator_service_1.OrchestratorService,
        ],
        exports: [
            gemini_service_1.GeminiService,
            intent_agent_service_1.IntentAgentService,
            matching_agent_service_1.MatchingAgentService,
            pricing_agent_service_1.PricingAgentService,
            dispute_agent_service_1.DisputeAgentService,
            orchestrator_service_1.OrchestratorService,
        ],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map