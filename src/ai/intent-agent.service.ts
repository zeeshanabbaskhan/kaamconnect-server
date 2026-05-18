import { Injectable, Logger } from "@nestjs/common";
import { LlmService } from "./llm.service";

@Injectable()
export class IntentAgentService {
  private logger = new Logger(IntentAgentService.name);

  constructor(private llm: LlmService) {}

  async extractIntent(text: string) {
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
      const response = await this.llm.generateText(prompt);
      const cleaned = response.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (error: any) {
      this.logger.error(`Intent extraction failed: ${error.message}`);
      return {
        serviceType: "general",
        urgency: "medium",
        language: "en",
        extractedDetails: [text],
        sentiment: "neutral",
      };
    }
  }
}
