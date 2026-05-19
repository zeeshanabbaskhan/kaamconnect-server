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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderSchema = exports.Provider = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Provider = class Provider {
    name;
    phone;
    passwordHash;
    skills;
    cnic;
    location;
    rating;
    reviewCount;
    completedJobs;
    reliabilityScore;
    status;
    baseRatePerHour;
};
exports.Provider = Provider;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Provider.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Provider.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Provider.prototype, "passwordHash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Provider.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Provider.prototype, "cnic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Provider.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 5.0 }),
    __metadata("design:type", Number)
], Provider.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Provider.prototype, "reviewCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Provider.prototype, "completedJobs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 100 }),
    __metadata("design:type", Number)
], Provider.prototype, "reliabilityScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "active", enum: ["active", "busy", "offline", "suspended"] }),
    __metadata("design:type", String)
], Provider.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Provider.prototype, "baseRatePerHour", void 0);
exports.Provider = Provider = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Provider);
exports.ProviderSchema = mongoose_1.SchemaFactory.createForClass(Provider);
//# sourceMappingURL=provider.schema.js.map