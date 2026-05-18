import { GeminiService } from './gemini.service';
export declare class IntentAgentService {
    private gemini;
    private logger;
    constructor(gemini: GeminiService);
    extractIntent(text: string): Promise<any>;
}
