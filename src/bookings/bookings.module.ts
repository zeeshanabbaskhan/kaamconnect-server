import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookingsController } from "./bookings.controller";
import { BookingsService } from "./bookings.service";
import { BookingSchema } from "../schemas/booking.schema";
import { ProviderSchema } from "../schemas/provider.schema";
import { UserSchema } from "../schemas/user.schema";
import { AiModule } from "../ai/ai.module";
import { SocketsModule } from "../sockets/sockets.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Booking", schema: BookingSchema },
      { name: "Provider", schema: ProviderSchema },
      { name: "User", schema: UserSchema },
    ]),
    AiModule,
    SocketsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
