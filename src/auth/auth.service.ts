import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { UserDocument } from "../schemas/user.schema";
import { ProviderDocument } from "../schemas/provider.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private userModel: Model<UserDocument>,
    @InjectModel("Provider") private providerModel: Model<ProviderDocument>,
    private jwtService: JwtService,
  ) {}

  async signupUser(dto: any) {
    const existing = await this.userModel.findOne({ phone: dto.phone });
    if (existing)
      throw new BadRequestException("User with phone already exists");

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      name: dto.name,
      phone: dto.phone,
      passwordHash,
    });

    return this.loginUser(dto);
  }

  async loginUser(dto: any) {
    const user = await this.userModel.findOne({ phone: dto.phone });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user._id, role: "user" };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user._id, name: user.name, phone: user.phone },
    };
  }

  async signupProvider(dto: any) {
    const existing = await this.providerModel.findOne({ phone: dto.phone });
    if (existing)
      throw new BadRequestException("Provider with phone already exists");

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const provider = await this.providerModel.create({
      name: dto.name,
      phone: dto.phone,
      passwordHash,
      skills: dto.skills || [],
      cnic: dto.cnic,
    });

    return this.loginProvider(dto);
  }

  async loginProvider(dto: any) {
    const provider = await this.providerModel.findOne({ phone: dto.phone });
    if (
      !provider ||
      !(await bcrypt.compare(dto.password, provider.passwordHash))
    ) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: provider._id, role: "provider" };
    return {
      access_token: this.jwtService.sign(payload),
      provider: {
        id: provider._id,
        name: provider.name,
        phone: provider.phone,
      },
    };
  }
}
