import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ProvidersModule } from "./providers/providers.module";
import { BookingsModule } from "./bookings/bookings.module";
import { DisputesModule } from "./disputes/disputes.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AiModule } from "./ai/ai.module";
import { SocketsModule } from "./sockets/sockets.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kaamconnect",
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
export class AppModule {}
