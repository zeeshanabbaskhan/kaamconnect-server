"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = require("mongoose");
const logger = new common_1.Logger("Bootstrap");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    try {
        const dbUri = process.env.DATABASE_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kaamconnect";
        const connection = await (0, mongoose_1.connect)(dbUri);
        if (connection.connection.readyState === 1) {
            logger.log(`✅ Database connected: ${connection.connection.host}/${connection.connection.name}`);
        }
    }
    catch (error) {
        logger.warn(`⚠️  Database connection check failed: ${error.message}`);
    }
    app.enableCors();
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 KaamConnect AI Orchestrator running on port ${port}`);
    logger.log(`📱 Server is listening on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map