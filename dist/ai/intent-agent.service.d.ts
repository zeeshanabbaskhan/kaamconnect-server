import { LlmService } from "./llm.service";
export declare class IntentAgentService {
    private llm;
    private logger;
    constructor(llm: LlmService);
    extractIntent(text: string): Promise<any>;
}
