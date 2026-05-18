import { Injectable, Logger } from "@nestjs/common";
import { LlmService } from "./llm.service";

@Injectable()
export class DisputeAgentService {
  private logger = new Logger(DisputeAgentService.name);

  constructor(private llm: LlmService) {}

  async analyzeDispute(
    disputeDetails: any,
    bookingDetails: any,
    providerDetails: any,
  ) {
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
    } catch (error: any) {
      this.logger.error(`Dispute analysis failed: ${error.message}`);
      return {
        fault: "neutral",
        refundAmount: 0,
        penalizeProvider: false,
        reliabilityDeduction: 0,
        explanation:
          "Fallback analysis due to AI failure. Manual review required.",
      };
    }
  }
}
