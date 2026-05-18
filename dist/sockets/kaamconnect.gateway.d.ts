import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class KaamConnectGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinBooking(client: Socket, payload: {
        bookingId: string;
    }): {
        event: string;
        data: string;
    };
    handleJoinProvider(client: Socket, payload: {
        providerId: string;
    }): {
        event: string;
        data: string;
    };
    emitBookingConfirmed(bookingId: string, data: any): void;
    emitProviderAssigned(bookingId: string, data: any): void;
    emitProviderEnRoute(bookingId: string, data: any): void;
    emitServiceStarted(bookingId: string, data: any): void;
    emitServiceCompleted(bookingId: string, data: any): void;
    emitDisputeRaised(bookingId: string, data: any): void;
    emitNewBookingToProvider(providerId: string, data: any): void;
}
