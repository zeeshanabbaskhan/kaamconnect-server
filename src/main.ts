import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, Logger } from "@nestjs/common";
import helmet from "helmet";
import { connect } from "mongoose";

const logger = new Logger("Bootstrap");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Check database connection
  try {
    const dbUri = process.env.DATABASE_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kaamconnect";
    const connection = await connect(dbUri);

    if (connection.connection.readyState === 1) {
      logger.log(`✅ Database connected: ${connection.connection.host}/${connection.connection.name}`);
    }
  } catch (error) {
    logger.warn(`⚠️  Database connection check failed: ${error.message}`);
  }

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 KaamConnect AI Orchestrator running on port ${port}`);
  logger.log(`📱 Server is listening on http://localhost:${port}`);
}
bootstrap();
