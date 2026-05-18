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
var GeminiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("@nestjs/config");
let GeminiService = GeminiService_1 = class GeminiService {
    configService;
    logger = new common_1.Logger(GeminiService_1.name);
    genAI;
    model;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (!apiKey) {
            this.logger.warn('GEMINI_API_KEY is not set. AI features will use fallback mocks.');
        }
        else {
            this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        }
    }
    async generateText(prompt) {
        if (!this.model) {
            return this.getMockResponse(prompt);
        }
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            this.logger.error(`Gemini API Error: ${error.message}`);
            return this.getMockResponse(prompt);
        }
    }
    getMockResponse(prompt) {
        if (prompt.includes('Intent Extraction')) {
            return JSON.stringify({
                serviceType: 'plumbing',
                urgency: 'high',
                language: 'en',
                extractedDetails: ['leak', 'urgent'],
                sentiment: 'stressed',
            });
        }
        if (prompt.includes('Dispute Agent')) {
            return JSON.stringify({
                fault: 'provider',
                refundAmount: 500,
                penalizeProvider: true,
                reliabilityDeduction: 5,
                explanation: 'Provider did not show up.',
            });
        }
        if (prompt.includes('sentiment')) {
            return JSON.stringify({ score: 0.8, label: 'positive' });
        }
        return '{}';
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = GeminiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GeminiService);
//# sourceMappingURL=gemini.service.js.map