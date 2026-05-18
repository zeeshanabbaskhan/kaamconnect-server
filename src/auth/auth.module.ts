import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { UserSchema } from "../schemas/user.schema";
import { ProviderSchema } from "../schemas/provider.schema";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(
          "JWT_SECRET",
          "kaamconnect_super_secret_jwt_key_2024",
        ),
        signOptions: { expiresIn: "7d" },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Provider", schema: ProviderSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
