"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const providers_module_1 = require("./providers/providers.module");
const bookings_module_1 = require("./bookings/bookings.module");
const disputes_module_1 = require("./disputes/disputes.module");
const reviews_module_1 = require("./reviews/reviews.module");
const ai_module_1 = require("./ai/ai.module");
const sockets_module_1 = require("./sockets/sockets.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kaamconnect'),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            providers_module_1.ProvidersModule,
            bookings_module_1.BookingsModule,
            disputes_module_1.DisputesModule,
            reviews_module_1.ReviewsModule,
            ai_module_1.AiModule,
            sockets_module_1.SocketsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map