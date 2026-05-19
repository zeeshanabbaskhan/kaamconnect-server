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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var LlmService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = __importDefault(require("openai"));
let LlmService = LlmService_1 = class LlmService {
    configService;
    logger = new common_1.Logger(LlmService_1.name);
    openai = null;
    model;
    constructor(configService) {
        this.configService = configService;
        this.model = this.configService.get("OPENROUTER_MODEL", "google/gemini-2.5-flash");
        const apiKey = this.configService.get("OPENROUTER_API_KEY");
        if (!apiKey || apiKey === "your_openrouter_api_key_here") {
            this.logger.warn("OPENROUTER_API_KEY is not set or invalid. AI features will use fallback mocks.");
        }
        else {
            this.openai = new openai_1.default({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey,
                defaultHeaders: {
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "KaamConnect AI Orchestrator",
                },
            });
        }
    }
    async generateText(prompt) {
        if (!this.openai) {
            return this.getMockResponse(prompt);
        }
        try {
            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: [{ role: "user", content: prompt }],
            });
            return response.choices[0]?.message?.content || "{}";
        }
        catch (error) {
            this.logger.error(`OpenRouter API Error: ${error.message}`);
            return this.getMockResponse(prompt);
        }
    }
    getMockResponse(prompt) {
        if (prompt.includes("Intent Extraction")) {
            return JSON.stringify({
                serviceType: "plumbing",
                urgency: "high",
                language: "en",
                extractedDetails: ["leak", "urgent"],
                sentiment: "stressed",
            });
        }
        if (prompt.includes("Dispute Agent")) {
            return JSON.stringify({
                fault: "provider",
                refundAmount: 500,
                penalizeProvider: true,
                reliabilityDeduction: 5,
                explanation: "Provider did not show up.",
            });
        }
        if (prompt.includes("sentiment")) {
            return JSON.stringify({ score: 0.8, label: "positive" });
        }
        return "{}";
    }
};
exports.LlmService = LlmService;
exports.LlmService = LlmService = LlmService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LlmService);
//# sourceMappingURL=llm.service.js.map