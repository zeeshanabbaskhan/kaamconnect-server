import { GeminiService } from './gemini.service';
export declare class DisputeAgentService {
    private gemini;
    private logger;
    constructor(gemini: GeminiService);
    analyzeDispute(disputeDetails: any, bookingDetails: any, providerDetails: any): Promise<any>;
}
