import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { ProviderDocument } from '../schemas/provider.schema';
export declare class AuthService {
    private userModel;
    private providerModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, providerModel: Model<ProviderDocument>, jwtService: JwtService);
    signupUser(dto: any): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            phone: string;
        };
    }>;
    loginUser(dto: any): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            phone: string;
        };
    }>;
    signupProvider(dto: any): Promise<{
        access_token: string;
        provider: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            phone: string;
        };
    }>;
    loginProvider(dto: any): Promise<{
        access_token: string;
        provider: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            phone: string;
        };
    }>;
}
