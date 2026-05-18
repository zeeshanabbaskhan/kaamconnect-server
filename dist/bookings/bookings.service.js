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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const orchestrator_service_1 = require("../ai/orchestrator.service");
let BookingsService = class BookingsService {
    bookingModel;
    providerModel;
    userModel;
    orchestrator;
    constructor(bookingModel, providerModel, userModel, orchestrator) {
        this.bookingModel = bookingModel;
        this.providerModel = providerModel;
        this.userModel = userModel;
        this.orchestrator = orchestrator;
    }
    async createBooking(userId, request, location, scheduledTime) {
        const user = await this.userModel.findById(userId).lean();
        return this.orchestrator.handleBookingFlow(userId, request, location, scheduledTime, user?.preferences);
    }
    async getMyBookings(userId) {
        return this.bookingModel
            .find({ userId })
            .populate('providerId', 'name phone rating')
            .sort({ createdAt: -1 });
    }
    async getProviderBookings(providerId) {
        return this.bookingModel
            .find({ providerId })
            .populate('userId', 'name phone')
            .sort({ createdAt: -1 });
    }
    async updateStatus(id, status, providerId) {
        const update = { status };
        if (providerId)
            update.providerId = providerId;
        const booking = await this.bookingModel.findByIdAndUpdate(id, update, { new: true });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (status === 'completed') {
            if (booking.providerId) {
                await this.providerModel.findByIdAndUpdate(booking.providerId, { status: 'active' });
            }
        }
        else if (status === 'in_progress') {
            if (booking.providerId) {
                await this.providerModel.findByIdAndUpdate(booking.providerId, { status: 'busy' });
            }
        }
        return booking;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Booking')),
    __param(1, (0, mongoose_1.InjectModel)('Provider')),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        orchestrator_service_1.OrchestratorService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map