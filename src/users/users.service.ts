import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private userModel: Model<UserDocument>) {}

  async getProfile(id: string) {
    const user = await this.userModel.findById(id).select("-passwordHash");
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async updateProfile(id: string, dto: any) {
    const { password, ...safe } = dto;
    return this.userModel
      .findByIdAndUpdate(id, safe, { new: true })
      .select("-passwordHash");
  }

  async addLoyaltyPoints(id: string, points: number) {
    return this.userModel.findByIdAndUpdate(
      id,
      { $inc: { loyaltyPoints: points } },
      { new: true },
    );
  }

  async saveLocation(id: string, location: any) {
    return this.userModel.findByIdAndUpdate(
      id,
      { $push: { savedLocations: location } },
      { new: true },
    );
  }
}
