import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DisputesController } from "./disputes.controller";
import { DisputesService } from "./disputes.service";
import { DisputeSchema } from "../schemas/dispute.schema";
import { BookingSchema } from "../schemas/booking.schema";
import { ProviderSchema } from "../schemas/provider.schema";
import { AiModule } from "../ai/ai.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Dispute", schema: DisputeSchema },
      { name: "Booking", schema: BookingSchema },
      { name: "Provider", schema: ProviderSchema },
    ]),
    AiModule,
  ],
  controllers: [DisputesController],
  providers: [DisputesService],
})
export class DisputesModule {}
