import { ConfigService } from '@nestjs/config';
export declare class MatchingAgentService {
    private configService;
    private logger;
    private mapsClient;
    constructor(configService: ConfigService);
    private calculateHaversineDistance;
    private getActualDrivingDistance;
    rankProviders(providers: any[], intent: any, userLocation: any): Promise<any[]>;
}
