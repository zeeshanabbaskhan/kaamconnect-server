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
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const orchestrator_service_1 = require("./orchestrator.service");
const intent_agent_service_1 = require("./intent-agent.service");
let AiController = class AiController {
    orchestrator;
    intentAgent;
    constructor(orchestrator, intentAgent) {
        this.orchestrator = orchestrator;
        this.intentAgent = intentAgent;
    }
    async orchestrateBooking(body) {
        return this.orchestrator.handleBookingFlow(body.userId, body.request, body.location, body.scheduledTime, body.preferences);
    }
    async parseIntent(body) {
        return this.intentAgent.extractIntent(body.request);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)("orchestrate"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "orchestrateBooking", null);
__decorate([
    (0, common_1.Post)("parse-intent"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "parseIntent", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)("ai"),
    __metadata("design:paramtypes", [orchestrator_service_1.OrchestratorService,
        intent_agent_service_1.IntentAgentService])
], AiController);
//# sourceMappingURL=ai.controller.js.map