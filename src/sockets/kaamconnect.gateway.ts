import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: { origin: "*" },
  namespace: "/kaamconnect",
})
export class KaamConnectGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger = new Logger(KaamConnectGateway.name);

  afterInit(server: Server) {
    this.logger.log("🔌 WebSocket Gateway initialized");
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("joinBooking")
  handleJoinBooking(client: Socket, payload: { bookingId: string }) {
    client.join(`booking:${payload.bookingId}`);
    return { event: "joinedBooking", data: payload.bookingId };
  }

  @SubscribeMessage("joinProvider")
  handleJoinProvider(client: Socket, payload: { providerId: string }) {
    client.join(`provider:${payload.providerId}`);
    return { event: "joinedProvider", data: payload.providerId };
  }

  emitBookingConfirmed(bookingId: string, data: any) {
    this.server.to(`booking:${bookingId}`).emit("bookingConfirmed", data);
  }

  emitProviderAssigned(bookingId: string, data: any) {
    this.server.to(`booking:${bookingId}`).emit("providerAssigned", data);
  }

  emitProviderEnRoute(bookingId: string, data: any) {
    this.server.to(`booking:${bookingId}`).emit("providerEnRoute", data);
  }

  emitServiceStarted(bookingId: string, data: any) {
    this.server.to(`booking:${bookingId}`).emit("serviceStarted", data);
  }

  emitServiceCompleted(bookingId: string, data: any) {
    this.server.to(`booking:${bookingId}`).emit("serviceCompleted", data);
  }

  emitDisputeRaised(bookingId: string, data: any) {
    this.server.to(`booking:${bookingId}`).emit("disputeRaised", data);
  }

  emitNewBookingToProvider(providerId: string, data: any) {
    this.server.to(`provider:${providerId}`).emit("newBooking", data);
  }
}
