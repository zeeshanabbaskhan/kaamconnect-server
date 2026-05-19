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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BookingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const orchestrator_service_1 = require("../ai/orchestrator.service");
const kaamconnect_gateway_1 = require("../sockets/kaamconnect.gateway");
let BookingsService = BookingsService_1 = class BookingsService {
    bookingModel;
    providerModel;
    userModel;
    orchestrator;
    gateway;
    logger = new common_1.Logger(BookingsService_1.name);
    constructor(bookingModel, providerModel, userModel, orchestrator, gateway) {
        this.bookingModel = bookingModel;
        this.providerModel = providerModel;
        this.userModel = userModel;
        this.orchestrator = orchestrator;
        this.gateway = gateway;
    }
    async createBooking(userId, request, location, scheduledTime) {
        const user = await this.userModel.findById(userId).lean();
        const result = await this.orchestrator.handleBookingFlow(userId, request, location, scheduledTime, user?.preferences);
        if (result.provider?.id) {
            try {
                this.gateway.emitNewBookingToProvider(String(result.provider.id), {
                    bookingId: result.bookingId,
                    serviceType: request,
                    location,
                    pricing: result.pricing,
                    intent: result.intent,
                });
            }
            catch (error) {
                this.logger.error(`Failed to emit newBooking event: ${error.message}`);
            }
        }
        return result;
    }
    async getMyBookings(userId) {
        return this.bookingModel
            .find({ userId })
            .populate("providerId", "name phone rating")
            .sort({ createdAt: -1 });
    }
    async getProviderBookings(providerId) {
        return this.bookingModel
            .find({ providerId })
            .populate("userId", "name phone")
            .sort({ createdAt: -1 });
    }
    async updateStatus(id, status, providerId) {
        const update = { status };
        if (providerId)
            update.providerId = providerId;
        const booking = await this.bookingModel.findByIdAndUpdate(id, update, {
            new: true,
        });
        if (!booking)
            throw new common_1.NotFoundException("Booking not found");
        const bookingId = String(booking._id);
        const pId = String(booking.providerId);
        if (status === "completed") {
            if (booking.providerId) {
                await this.providerModel.findByIdAndUpdate(booking.providerId, {
                    status: "active",
                });
                await this.providerModel.findByIdAndUpdate(booking.providerId, {
                    $inc: { completedJobs: 1 },
                });
            }
            try {
                this.gateway.emitServiceCompleted(bookingId, {
                    bookingId,
                    completedAt: new Date().toISOString(),
                });
            }
            catch (error) {
                this.logger.error(`Failed to emit serviceCompleted event: ${error.message}`);
            }
        }
        else if (status === "in_progress") {
            if (booking.providerId) {
                await this.providerModel.findByIdAndUpdate(booking.providerId, {
                    status: "busy",
                });
            }
            try {
                this.gateway.emitServiceStarted(bookingId, {
                    bookingId,
                    startedAt: new Date().toISOString(),
                });
            }
            catch (error) {
                this.logger.error(`Failed to emit serviceStarted event: ${error.message}`);
            }
        }
        else if (status === "provider_en_route") {
            try {
                this.gateway.emitProviderEnRoute(bookingId, {
                    bookingId,
                    providerId: pId,
                    eta: null,
                });
            }
            catch (error) {
                this.logger.error(`Failed to emit providerEnRoute event: ${error.message}`);
            }
        }
        else if (status === "matched") {
            try {
                this.gateway.emitProviderAssigned(bookingId, {
                    bookingId,
                    provider: { id: pId },
                });
            }
            catch (error) {
                this.logger.error(`Failed to emit providerAssigned event: ${error.message}`);
            }
        }
        else if (status === "disputed") {
            try {
                this.gateway.emitDisputeRaised(bookingId, { bookingId });
            }
            catch (error) {
                this.logger.error(`Failed to emit disputeRaised event: ${error.message}`);
            }
        }
        return booking;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = BookingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Booking")),
    __param(1, (0, mongoose_1.InjectModel)("Provider")),
    __param(2, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        orchestrator_service_1.OrchestratorService,
        kaamconnect_gateway_1.KaamConnectGateway])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map