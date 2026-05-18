import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IntentAgentService } from "./intent-agent.service";
import { MatchingAgentService } from "./matching-agent.service";
import { PricingAgentService } from "./pricing-agent.service";
import { DisputeAgentService } from "./dispute-agent.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProviderDocument } from "../schemas/provider.schema";
import { BookingDocument } from "../schemas/booking.schema";
import { KaamConnectGateway } from "../sockets/kaamconnect.gateway";

@Injectable()
export class OrchestratorService {
  private logger = new Logger(OrchestratorService.name);

  constructor(
    private intentAgent: IntentAgentService,
    private matchingAgent: MatchingAgentService,
    private pricingAgent: PricingAgentService,
    private disputeAgent: DisputeAgentService,
    @InjectModel("Provider") private providerModel: Model<ProviderDocument>,
    @InjectModel("Booking") private bookingModel: Model<BookingDocument>,
    private gateway: KaamConnectGateway,
  ) {}

  async handleBookingFlow(
    userId: string,
    requestText: string,
    userLocation: any,
    scheduledTime?: Date,
    userPreferences?: any,
  ) {
    this.logger.log(`[Orchestrator] Starting flow for User ${userId}`);

    const intent = await this.intentAgent.extractIntent(requestText);
    this.logger.log(`[Orchestrator] Intent: ${JSON.stringify(intent)}`);

    const allProviders = await this.providerModel
      .find({ status: "active" })
      .lean();

    const matchedProviders = await this.matchingAgent.rankProviders(
      allProviders,
      intent,
      userLocation,
    );

    if (userPreferences?.maxBudget) {
      // Filter based on estimated pricing if we wanted to
    }

    if (matchedProviders.length === 0) {
      throw new NotFoundException(
        "No available providers found for this service.",
      );
    }

    const bestProvider = matchedProviders[0];
    this.logger.log(`[Orchestrator] Best match: Provider ${bestProvider._id}`);

    const distance = bestProvider.distanceToUser || 2.5;
    const pricing = this.pricingAgent.calculatePrice(
      intent,
      distance,
      bestProvider.baseRatePerHour || 1000,
    );
    this.logger.log(`[Orchestrator] Pricing: ${JSON.stringify(pricing)}`);

    const booking = await this.bookingModel.create({
      userId,
      providerId: bestProvider._id,
      serviceType: intent.serviceType,
      description: requestText,
      location: userLocation,
      status: "matched",
      pricing,
      aiIntentAnalysis: intent,
      scheduledTime: scheduledTime || new Date(),
    });

    return {
      message: "Booking successfully orchestrated",
      bookingId: booking._id,
      provider: {
        id: bestProvider._id,
        name: bestProvider.name,
        rating: bestProvider.rating,
        distance,
      },
      pricing,
      intent,
    };
  }

  async handleDispute(disputeDetails: any, bookingId: string) {
    this.logger.log(`[Orchestrator] Handling dispute for Booking ${bookingId}`);
    // Will be called by DisputeService
  }
}
