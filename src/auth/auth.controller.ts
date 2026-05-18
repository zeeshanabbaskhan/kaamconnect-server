import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signupUser(@Body() body: any) {
    return this.authService.signupUser(body);
  }

  @Post("login")
  loginUser(@Body() body: any) {
    return this.authService.loginUser(body);
  }

  @Post("provider/signup")
  signupProvider(@Body() body: any) {
    return this.authService.signupProvider(body);
  }

  @Post("provider/login")
  loginProvider(@Body() body: any) {
    return this.authService.loginProvider(body);
  }
}
