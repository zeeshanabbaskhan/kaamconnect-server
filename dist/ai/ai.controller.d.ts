import { OrchestratorService } from "./orchestrator.service";
import { IntentAgentService } from "./intent-agent.service";
export declare class AiController {
    private readonly orchestrator;
    private readonly intentAgent;
    constructor(orchestrator: OrchestratorService, intentAgent: IntentAgentService);
    orchestrateBooking(body: any): Promise<{
        message: string;
        bookingId: import("mongoose").Types.ObjectId;
        provider: {
            id: any;
            name: any;
            rating: any;
            distance: any;
        };
        pricing: {
            base: number;
            distance: number;
            urgency: number;
            surge: number;
            total: number;
            isEstimated: boolean;
        };
        intent: any;
    }>;
    parseIntent(body: any): Promise<any>;
}
