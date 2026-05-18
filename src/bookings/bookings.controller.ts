import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("bookings")
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post("create")
  create(@Body() body: any, @Request() req: any) {
    return this.bookingsService.createBooking(
      req.user.sub,
      body.request,
      body.location,
      body.scheduledTime,
    );
  }

  @Get("my")
  getMyBookings(@Request() req: any) {
    return this.bookingsService.getMyBookings(req.user.sub);
  }

  @Get("provider/my")
  getProviderBookings(@Request() req: any) {
    return this.bookingsService.getProviderBookings(req.user.sub);
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() body: any,
    @Request() req: any,
  ) {
    let providerId = req.user.role === "provider" ? req.user.sub : undefined;
    if (body.providerId) providerId = body.providerId;
    return this.bookingsService.updateStatus(id, body.status, providerId);
  }
}
