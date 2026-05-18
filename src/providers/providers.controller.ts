import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  getAll(@Query() query: any) {
    return this.providersService.getAllProviders(query);
  }

  @Post("search")
  search(@Body() body: any) {
    return this.providersService.searchProviders(
      body.serviceType,
      body.lat,
      body.lng,
    );
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.providersService.getById(id);
  }

  @Get(":id/stats")
  @UseGuards(JwtAuthGuard)
  getStats(@Param("id") id: string) {
    return this.providersService.getProviderStats(id);
  }

  @Put("profile")
  @UseGuards(JwtAuthGuard)
  updateProfile(@Body() body: any, @Request() req: any) {
    return this.providersService.updateProfile(req.user.sub, body);
  }

  @Put("location")
  @UseGuards(JwtAuthGuard)
  updateLocation(@Body() body: any, @Request() req: any) {
    return this.providersService.updateLocation(
      req.user.sub,
      body.lat,
      body.lng,
    );
  }
}
