"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisputesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const disputes_controller_1 = require("./disputes.controller");
const disputes_service_1 = require("./disputes.service");
const dispute_schema_1 = require("../schemas/dispute.schema");
const booking_schema_1 = require("../schemas/booking.schema");
const provider_schema_1 = require("../schemas/provider.schema");
const ai_module_1 = require("../ai/ai.module");
let DisputesModule = class DisputesModule {
};
exports.DisputesModule = DisputesModule;
exports.DisputesModule = DisputesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Dispute', schema: dispute_schema_1.DisputeSchema },
                { name: 'Booking', schema: booking_schema_1.BookingSchema },
                { name: 'Provider', schema: provider_schema_1.ProviderSchema },
            ]),
            ai_module_1.AiModule,
        ],
        controllers: [disputes_controller_1.DisputesController],
        providers: [disputes_service_1.DisputesService],
    })
], DisputesModule);
//# sourceMappingURL=disputes.module.js.map