import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LlmService } from './llm.service';
import { IntentAgentService } from './intent-agent.service';
import { MatchingAgentService } from './matching-agent.service';
import { PricingAgentService } from './pricing-agent.service';
import { DisputeAgentService } from './dispute-agent.service';

describe('AI System Verification', () => {
  let llmService: LlmService;
  let intentAgent: IntentAgentService;
  let matchingAgent: MatchingAgentService;
  let pricingAgent: PricingAgentService;
  let disputeAgent: DisputeAgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        LlmService,
        IntentAgentService,
        MatchingAgentService,
        PricingAgentService,
        DisputeAgentService,
        ConfigService,
      ],
    }).compile();

    llmService = module.get<LlmService>(LlmService);
    intentAgent = module.get<IntentAgentService>(IntentAgentService);
    matchingAgent = module.get<MatchingAgentService>(MatchingAgentService);
    pricingAgent = module.get<PricingAgentService>(PricingAgentService);
    disputeAgent = module.get<DisputeAgentService>(DisputeAgentService);
  });

  describe('Intent Agent', () => {
    it('should extract intent from English request', async () => {
      const result = await intentAgent.extractIntent(
        'I need a plumber to fix a leaking pipe urgently'
      );
      expect(result).toBeDefined();
      expect(result.serviceType).toBeDefined();
      expect(result.urgency).toBeDefined();
      expect(['low', 'medium', 'high']).toContain(result.urgency);
    }, 20000);

    it('should fallback gracefully on error', async () => {
      const result = await intentAgent.extractIntent('test');
      expect(result.sentiment).toBeDefined();
      expect(result.extractedDetails).toBeInstanceOf(Array);
    }, 20000);
  });

  describe('Matching Agent', () => {
    it('should calculate haversine distance correctly', async () => {
      const providers = [
        {
          _id: '1',
          name: 'Provider 1',
          skills: ['plumbing', 'electrical'],
          rating: 4.5,
          reliabilityScore: 85,
          status: 'active',
          location: { lat: 31.5204, lng: 74.3587 }, // Lahore
        },
        {
          _id: '2',
          name: 'Provider 2',
          skills: ['cleaning'],
          rating: 4.0,
          reliabilityScore: 75,
          status: 'active',
          location: { lat: 31.5249, lng: 74.3394 }, // Lahore nearby
        },
      ];

      const intent = { serviceType: 'plumbing', urgency: 'high' };
      const userLocation = { lat: 31.5204, lng: 74.3587 }; // Lahore

      const ranked = await matchingAgent.rankProviders(
        providers,
        intent,
        userLocation
      );

      expect(ranked).toBeDefined();
      expect(ranked.length).toBeGreaterThan(0);
      expect(ranked[0]).toHaveProperty('distanceToUser');
      expect(ranked[0].distanceToUser).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Pricing Agent', () => {
    it('should calculate pricing correctly', () => {
      const intent = { urgency: 'high' };
      const distance = 5;
      const baseRate = 1000;

      const pricing = pricingAgent.calculatePrice(
        intent,
        distance,
        baseRate
      );

      expect(pricing).toBeDefined();
      expect(pricing.base).toBe(baseRate);
      expect(pricing.total).toBeGreaterThan(baseRate);
      expect(pricing.isEstimated).toBe(true);
    });

    it('should apply low urgency discount', () => {
      const intent = { urgency: 'low' };
      const distance = 2;
      const baseRate = 1000;

      const pricing = pricingAgent.calculatePrice(
        intent,
        distance,
        baseRate
      );

      expect(pricing.total).toBeLessThan(baseRate);
    });

    it('should apply night surge', () => {
      const intent = { urgency: 'medium' };
      const distance = 3;
      const baseRate = 1000;
      const isNightTime = true;

      const pricing = pricingAgent.calculatePrice(
        intent,
        distance,
        baseRate,
        isNightTime
      );

      expect(pricing.surge).toBeGreaterThan(0);
    });
  });

  describe('Dispute Agent', () => {
    it('should have dispute analysis fallback', async () => {
      const disputeDetails = {
        reason: 'No Show',
        description: 'Provider did not arrive',
      };
      const bookingDetails = {
        serviceType: 'plumbing',
        amount: 2000,
      };
      const providerDetails = {
        rating: 3.5,
        reliabilityScore: 60,
      };

      const analysis = await disputeAgent.analyzeDispute(
        disputeDetails,
        bookingDetails,
        providerDetails
      );

      expect(analysis).toBeDefined();
      expect(['user', 'provider', 'neutral']).toContain(analysis.fault);
      expect(analysis.refundAmount).toBeGreaterThanOrEqual(0);
      expect(typeof analysis.penalizeProvider).toBe('boolean');
      expect(analysis.explanation).toBeDefined();
    }, 25000);
  });
});
