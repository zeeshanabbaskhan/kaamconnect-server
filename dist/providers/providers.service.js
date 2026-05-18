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
exports.ProvidersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProvidersService = class ProvidersService {
    providerModel;
    reviewModel;
    constructor(providerModel, reviewModel) {
        this.providerModel = providerModel;
        this.reviewModel = reviewModel;
    }
    async getAllProviders(query = {}) {
        const filter = { status: 'active' };
        if (query.skill)
            filter.skills = { $regex: query.skill, $options: 'i' };
        return this.providerModel.find(filter).select('-passwordHash').sort({ rating: -1 });
    }
    async getById(id) {
        const provider = await this.providerModel.findById(id).select('-passwordHash');
        if (!provider)
            throw new common_1.NotFoundException('Provider not found');
        return provider;
    }
    async updateProfile(id, dto) {
        return this.providerModel.findByIdAndUpdate(id, dto, { new: true }).select('-passwordHash');
    }
    async updateLocation(id, lat, lng) {
        return this.providerModel.findByIdAndUpdate(id, { location: { lat, lng } }, { new: true });
    }
    async getProviderStats(id) {
        const provider = await this.providerModel.findById(id).select('-passwordHash');
        const reviews = await this.reviewModel.find({ providerId: id }).sort({ createdAt: -1 }).limit(5);
        return { provider, recentReviews: reviews };
    }
    async searchProviders(serviceType, lat, lng) {
        const providers = await this.providerModel
            .find({
            skills: { $regex: serviceType, $options: 'i' },
            status: 'active',
        })
            .select('-passwordHash')
            .limit(20);
        return providers;
    }
    async updateRating(providerId, newRating) {
        const provider = await this.providerModel.findById(providerId);
        if (!provider)
            return;
        const updatedRating = 0.8 * (provider.rating || 0) + 0.2 * newRating;
        provider.rating = Math.round(updatedRating * 10) / 10;
        provider.reviewCount = (provider.reviewCount || 0) + 1;
        provider.completedJobs = (provider.completedJobs || 0) + 1;
        await provider.save();
        return provider;
    }
};
exports.ProvidersService = ProvidersService;
exports.ProvidersService = ProvidersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Provider')),
    __param(1, (0, mongoose_1.InjectModel)('Review')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProvidersService);
//# sourceMappingURL=providers.service.js.map