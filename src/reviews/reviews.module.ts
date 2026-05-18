import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { ReviewSchema } from "../schemas/review.schema";
import { ProviderSchema } from "../schemas/provider.schema";
import { BookingSchema } from "../schemas/booking.schema";
import { AiModule } from "../ai/ai.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Review", schema: ReviewSchema },
      { name: "Provider", schema: ProviderSchema },
      { name: "Booking", schema: BookingSchema },
    ]),
    AiModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
