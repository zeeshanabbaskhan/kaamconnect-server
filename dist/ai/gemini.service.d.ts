import { ConfigService } from '@nestjs/config';
export declare class GeminiService {
    private configService;
    private logger;
    private genAI;
    private model;
    constructor(configService: ConfigService);
    generateText(prompt: string): Promise<string>;
    private getMockResponse;
}
