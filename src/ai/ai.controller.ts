import { Controller, Post, Body, Get } from "@nestjs/common";
import { OrchestratorService } from "./orchestrator.service";
import { IntentAgentService } from "./intent-agent.service";

@Controller("ai")
export class AiController {
  constructor(
    private readonly orchestrator: OrchestratorService,
    private readonly intentAgent: IntentAgentService,
  ) {}

  @Post("orchestrate")
  async orchestrateBooking(@Body() body: any) {
    return this.orchestrator.handleBookingFlow(
      body.userId,
      body.request,
      body.location,
      body.scheduledTime,
      body.preferences,
    );
  }

  @Post("parse-intent")
  async parseIntent(@Body() body: any) {
    return this.intentAgent.extractIntent(body.request);
  }
}
