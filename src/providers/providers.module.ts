import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProvidersController } from "./providers.controller";
import { ProvidersService } from "./providers.service";
import { ProviderSchema } from "../schemas/provider.schema";
import { ReviewSchema } from "../schemas/review.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Provider", schema: ProviderSchema },
      { name: "Review", schema: ReviewSchema },
    ]),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
