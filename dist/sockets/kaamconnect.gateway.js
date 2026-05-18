"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var KaamConnectGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KaamConnectGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let KaamConnectGateway = KaamConnectGateway_1 = class KaamConnectGateway {
    server;
    logger = new common_1.Logger(KaamConnectGateway_1.name);
    afterInit(server) {
        this.logger.log('🔌 WebSocket Gateway initialized');
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinBooking(client, payload) {
        client.join(`booking:${payload.bookingId}`);
        return { event: 'joinedBooking', data: payload.bookingId };
    }
    handleJoinProvider(client, payload) {
        client.join(`provider:${payload.providerId}`);
        return { event: 'joinedProvider', data: payload.providerId };
    }
    emitBookingConfirmed(bookingId, data) {
        this.server.to(`booking:${bookingId}`).emit('bookingConfirmed', data);
    }
    emitProviderAssigned(bookingId, data) {
        this.server.to(`booking:${bookingId}`).emit('providerAssigned', data);
    }
    emitProviderEnRoute(bookingId, data) {
        this.server.to(`booking:${bookingId}`).emit('providerEnRoute', data);
    }
    emitServiceStarted(bookingId, data) {
        this.server.to(`booking:${bookingId}`).emit('serviceStarted', data);
    }
    emitServiceCompleted(bookingId, data) {
        this.server.to(`booking:${bookingId}`).emit('serviceCompleted', data);
    }
    emitDisputeRaised(bookingId, data) {
        this.server.to(`booking:${bookingId}`).emit('disputeRaised', data);
    }
    emitNewBookingToProvider(providerId, data) {
        this.server.to(`provider:${providerId}`).emit('newBooking', data);
    }
};
exports.KaamConnectGateway = KaamConnectGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], KaamConnectGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinBooking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], KaamConnectGateway.prototype, "handleJoinBooking", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinProvider'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], KaamConnectGateway.prototype, "handleJoinProvider", null);
exports.KaamConnectGateway = KaamConnectGateway = KaamConnectGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
        namespace: '/kaamconnect',
    })
], KaamConnectGateway);
//# sourceMappingURL=kaamconnect.gateway.js.map