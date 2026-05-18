import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LlmService } from "./llm.service";
import { IntentAgentService } from "./intent-agent.service";
import { MatchingAgentService } from "./matching-agent.service";
import { PricingAgentService } from "./pricing-agent.service";
import { DisputeAgentService } from "./dispute-agent.service";
import { OrchestratorService } from "./orchestrator.service";
import { AiController } from "./ai.controller";
import { ProviderSchema } from "../schemas/provider.schema";
import { BookingSchema } from "../schemas/booking.schema";
import { ConfigModule } from "@nestjs/config";
import { SocketsModule } from "../sockets/sockets.module";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: "Provider", schema: ProviderSchema },
      { name: "Booking", schema: BookingSchema },
    ]),
    SocketsModule,
  ],
  controllers: [AiController],
  providers: [
    LlmService,
    IntentAgentService,
    MatchingAgentService,
    PricingAgentService,
    DisputeAgentService,
    OrchestratorService,
  ],
  exports: [
    LlmService,
    IntentAgentService,
    MatchingAgentService,
    PricingAgentService,
    DisputeAgentService,
    OrchestratorService,
  ],
})
export class AiModule {}
