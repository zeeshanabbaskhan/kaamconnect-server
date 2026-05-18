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
import { DisputesService } from "./disputes.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("disputes")
@UseGuards(JwtAuthGuard)
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Post("create")
  create(@Body() body: any, @Request() req: any) {
    return this.disputesService.createDispute(req.user.sub, body);
  }

  @Get("my")
  getMyDisputes(@Request() req: any) {
    return this.disputesService.getMyDisputes(req.user.sub);
  }

  @Patch(":id/resolve")
  resolve(@Param("id") id: string) {
    return this.disputesService.resolveDispute(id);
  }
}
