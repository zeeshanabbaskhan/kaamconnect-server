import { Module, Logger } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import * as mongoose from "mongoose";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ProvidersModule } from "./providers/providers.module";
import { BookingsModule } from "./bookings/bookings.module";
import { DisputesModule } from "./disputes/disputes.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AiModule } from "./ai/ai.module";
import { SocketsModule } from "./sockets/sockets.module";

const logger = new Logger("AppModule");

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kaamconnect",
    ),
    AuthModule,
    UsersModule,
    ProvidersModule,
    BookingsModule,
    DisputesModule,
    ReviewsModule,
    AiModule,
    SocketsModule,
  ],
})
export class AppModule {
  constructor() {
    // Log database connection events
    if (mongoose.connection) {
      mongoose.connection.on("open", () => {
        logger.log(
          `📦 MongoDB Connected: ${mongoose.connection.host}/${mongoose.connection.name}`,
        );
      });

      mongoose.connection.on("error", (error: Error) => {
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
}
