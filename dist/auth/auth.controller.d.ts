import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signupUser(body: any): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            phone: string;
        };
    }>;
    loginUser(body: any): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            phone: string;
        };
    }>;
    signupProvider(body: any): Promise<{
        access_token: string;
        provider: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            phone: string;
        };
    }>;
    loginProvider(body: any): Promise<{
        access_token: string;
        provider: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            phone: string;
        };
    }>;
}
