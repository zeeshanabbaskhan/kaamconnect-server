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
var IntentAgentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentAgentService = void 0;
const common_1 = require("@nestjs/common");
const gemini_service_1 = require("./gemini.service");
let IntentAgentService = IntentAgentService_1 = class IntentAgentService {
    gemini;
    logger = new common_1.Logger(IntentAgentService_1.name);
    constructor(gemini) {
        this.gemini = gemini;
    }
    async extractIntent(text) {
        this.logger.log(`Extracting intent from: "${text}"`);
        const prompt = `
System Context: You are the "Intent Agent" for KaamConnect AI, an orchestrator for informal services in Pakistan.
Task: Intent Extraction. 
Analyze the user's request (can be English, Urdu, or Roman Urdu). 
Return ONLY a valid JSON object matching this schema, no markdown blocks:
{
  "serviceType": "string (e.g., plumbing, electrical, cleaning, tutoring, undefined)",
  "urgency": "string (low, medium, high)",
  "language": "string (en, ur, roman_ur)",
  "extractedDetails": ["list of strings containing specific issues"],
  "sentiment": "string (calm, stressed, angry, neutral)"
}
User Request: "${text}"
`;
        try {
            const response = await this.gemini.generateText(prompt);
            const cleaned = response.replace(/```json|```/g, '').trim();
            return JSON.parse(cleaned);
        }
        catch (error) {
            this.logger.error(`Intent extraction failed: ${error.message}`);
            return {
                serviceType: 'general',
                urgency: 'medium',
                language: 'en',
                extractedDetails: [text],
                sentiment: 'neutral',
            };
        }
    }
};
exports.IntentAgentService = IntentAgentService;
exports.IntentAgentService = IntentAgentService = IntentAgentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService])
], IntentAgentService);
//# sourceMappingURL=intent-agent.service.js.map