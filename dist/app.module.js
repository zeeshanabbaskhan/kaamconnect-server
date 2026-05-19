"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const mongoose = __importStar(require("mongoose"));
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const providers_module_1 = require("./providers/providers.module");
const bookings_module_1 = require("./bookings/bookings.module");
const disputes_module_1 = require("./disputes/disputes.module");
const reviews_module_1 = require("./reviews/reviews.module");
const ai_module_1 = require("./ai/ai.module");
const sockets_module_1 = require("./sockets/sockets.module");
const logger = new common_1.Logger("AppModule");
let AppModule = class AppModule {
    constructor() {
        if (mongoose.connection) {
            mongoose.connection.on("open", () => {
                logger.log(`📦 MongoDB Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
            });
            mongoose.connection.on("error", (error) => {
                logger.error(`❌ MongoDB Connection Error: ${error.message}`);
            });
            mongoose.connection.on("disconnected", () => {
                logger.warn("⚠️  MongoDB Disconnected");
            });
            mongoose.connection.on("reconnected", () => {
                logger.log("🔄 MongoDB Reconnected");
            });
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.DATABASE_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kaamconnect"),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            providers_module_1.ProvidersModule,
            bookings_module_1.BookingsModule,
            disputes_module_1.DisputesModule,
            reviews_module_1.ReviewsModule,
            ai_module_1.AiModule,
            sockets_module_1.SocketsModule,
        ],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map