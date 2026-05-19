import { ConfigService } from "@nestjs/config";
export declare class LlmService {
    private configService;
    private logger;
    private openai;
    private model;
    constructor(configService: ConfigService);
    generateText(prompt: string): Promise<string>;
    private getMockResponse;
}
