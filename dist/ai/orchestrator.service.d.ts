import { IntentAgentService } from './intent-agent.service';
import { MatchingAgentService } from './matching-agent.service';
import { PricingAgentService } from './pricing-agent.service';
import { DisputeAgentService } from './dispute-agent.service';
import { Model } from 'mongoose';
import { ProviderDocument } from '../schemas/provider.schema';
import { BookingDocument } from '../schemas/booking.schema';
export declare class OrchestratorService {
    private intentAgent;
    private matchingAgent;
    private pricingAgent;
    private disputeAgent;
    private providerModel;
    private bookingModel;
    private logger;
    constructor(intentAgent: IntentAgentService, matchingAgent: MatchingAgentService, pricingAgent: PricingAgentService, disputeAgent: DisputeAgentService, providerModel: Model<ProviderDocument>, bookingModel: Model<BookingDocument>);
    handleBookingFlow(userId: string, requestText: string, userLocation: any, scheduledTime?: Date, userPreferences?: any): Promise<{
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
    handleDispute(disputeDetails: any, bookingId: string): Promise<void>;
}
