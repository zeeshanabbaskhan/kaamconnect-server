import { LlmService } from "./llm.service";
export declare class DisputeAgentService {
    private llm;
    private logger;
    constructor(llm: LlmService);
    analyzeDispute(disputeDetails: any, bookingDetails: any, providerDetails: any): Promise<any>;
}
