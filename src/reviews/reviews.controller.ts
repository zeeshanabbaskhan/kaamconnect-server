import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any, @Request() req: any) {
    return this.reviewsService.createReview(req.user.sub, body);
  }

  @Get("provider/:providerId")
  getProviderReviews(@Param("providerId") providerId: string) {
    return this.reviewsService.getProviderReviews(providerId);
  }
}
