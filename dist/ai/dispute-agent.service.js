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
var DisputeAgentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisputeAgentService = void 0;
const common_1 = require("@nestjs/common");
const llm_service_1 = require("./llm.service");
let DisputeAgentService = DisputeAgentService_1 = class DisputeAgentService {
    llm;
    logger = new common_1.Logger(DisputeAgentService_1.name);
    constructor(llm) {
        this.llm = llm;
    }
    async analyzeDispute(disputeDetails, bookingDetails, providerDetails) {
        const prompt = `
System Context: You are the "Dispute Agent" for KaamConnect AI.
Task: Analyze a dispute between a user and a service provider.
Input Data:
Dispute: ${JSON.stringify(disputeDetails)}
Booking: ${JSON.stringify(bookingDetails)}
Provider Stats: Rating: ${providerDetails.rating}, Reliability: ${providerDetails.reliabilityScore}

Determine who is at fault, calculate refund (if any), and whether to penalize the provider.
Return ONLY valid JSON:
{
  "fault": "user | provider | neutral",
  "refundAmount": number,
  "penalizeProvider": boolean,
  "reliabilityDeduction": number,
  "explanation": "string explaining reasoning"
}
`;
        try {
            const response = await this.llm.generateText(prompt);
            const cleaned = response.replace(/```json|```/g, "").trim();
            return JSON.parse(cleaned);
        }
        catch (error) {
            this.logger.error(`Dispute analysis failed: ${error.message}`);
            return {
                fault: "neutral",
                refundAmount: 0,
                penalizeProvider: false,
                reliabilityDeduction: 0,
                explanation: "Fallback analysis due to AI failure. Manual review required.",
            };
        }
    }
};
exports.DisputeAgentService = DisputeAgentService;
exports.DisputeAgentService = DisputeAgentService = DisputeAgentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [llm_service_1.LlmService])
], DisputeAgentService);
//# sourceMappingURL=dispute-agent.service.js.map