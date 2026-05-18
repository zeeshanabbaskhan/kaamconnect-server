import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

@Injectable()
export class LlmService {
  private logger = new Logger(LlmService.name);
  private openai: OpenAI | null = null;
  private model: string;

  constructor(private configService: ConfigService) {
    this.model = this.configService.get<string>(
      "OPENROUTER_MODEL",
      "google/gemini-2.5-flash",
    );
    const apiKey = this.configService.get<string>("OPENROUTER_API_KEY");
    if (!apiKey || apiKey === "your_openrouter_api_key_here") {
      this.logger.warn(
        "OPENROUTER_API_KEY is not set or invalid. AI features will use fallback mocks.",
      );
    } else {
      this.openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey,
        defaultHeaders: {
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "KaamConnect AI Orchestrator",
        },
      });
    }
  }

  async generateText(prompt: string): Promise<string> {
    if (!this.openai) {
      return this.getMockResponse(prompt);
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{ role: "user", content: prompt }],
      });
      return response.choices[0]?.message?.content || "{}";
    } catch (error: any) {
      this.logger.error(`OpenRouter API Error: ${error.message}`);
      return this.getMockResponse(prompt);
    }
  }

  private getMockResponse(prompt: string): string {
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
}
