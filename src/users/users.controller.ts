import { Controller, Get, Put, Body, UseGuards, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.sub);
  }

  @Put("profile")
  updateProfile(@Body() body: any, @Request() req: any) {
    return this.usersService.updateProfile(req.user.sub, body);
  }

  @Put("location")
  saveLocation(@Body() body: any, @Request() req: any) {
    return this.usersService.saveLocation(req.user.sub, body);
  }
}
