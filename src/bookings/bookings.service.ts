import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookingDocument } from "../schemas/booking.schema";
import { ProviderDocument } from "../schemas/provider.schema";
import { UserDocument } from "../schemas/user.schema";
import { OrchestratorService } from "../ai/orchestrator.service";
import { KaamConnectGateway } from "../sockets/kaamconnect.gateway";

@Injectable()
export class BookingsService {
  private logger = new Logger(BookingsService.name);

  constructor(
    @InjectModel("Booking") private bookingModel: Model<BookingDocument>,
    @InjectModel("Provider") private providerModel: Model<ProviderDocument>,
    @InjectModel("User") private userModel: Model<UserDocument>,
    private orchestrator: OrchestratorService,
    private gateway: KaamConnectGateway,
  ) {}

  async createBooking(
    userId: string,
    request: string,
    location: any,
    scheduledTime?: Date,
  ) {
    const user = await this.userModel.findById(userId).lean();
    const result = await this.orchestrator.handleBookingFlow(
      userId,
      request,
      location,
      scheduledTime,
      user?.preferences,
    );

    // Emit socket event to provider room when a new booking is matched
    if (result.provider?.id) {
      try {
        this.gateway.emitNewBookingToProvider(String(result.provider.id), {
          bookingId: result.bookingId,
          serviceType: request,
          location,
          pricing: result.pricing,
          intent: result.intent,
        });
      } catch (error: any) {
        this.logger.error(`Failed to emit newBooking event: ${error.message}`);
      }
    }

    return result;
  }

  async getMyBookings(userId: string) {
    return this.bookingModel
      .find({ userId })
      .populate("providerId", "name phone rating")
      .sort({ createdAt: -1 });
  }

  async getProviderBookings(providerId: string) {
    return this.bookingModel
      .find({ providerId })
      .populate("userId", "name phone")
      .sort({ createdAt: -1 });
  }

  async updateStatus(id: string, status: string, providerId?: string) {
    const update: any = { status };
    if (providerId) update.providerId = providerId;

    const booking = await this.bookingModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!booking) throw new NotFoundException("Booking not found");

    const bookingId = String(booking._id);
    const pId = String(booking.providerId);

    if (status === "completed") {
      if (booking.providerId) {
        // Reset provider to active
        await this.providerModel.findByIdAndUpdate(booking.providerId, {
          status: "active",
        });
        // Increment completedJobs — FIX: was never being called before
        await this.providerModel.findByIdAndUpdate(booking.providerId, {
          $inc: { completedJobs: 1 },
        });
      }
      try {
        this.gateway.emitServiceCompleted(bookingId, {
          bookingId,
          completedAt: new Date().toISOString(),
        });
      } catch (error: any) {
        this.logger.error(`Failed to emit serviceCompleted event: ${error.message}`);
      }
    } else if (status === "in_progress") {
      if (booking.providerId) {
        await this.providerModel.findByIdAndUpdate(booking.providerId, {
          status: "busy",
        });
      }
      try {
        this.gateway.emitServiceStarted(bookingId, {
          bookingId,
          startedAt: new Date().toISOString(),
        });
      } catch (error: any) {
        this.logger.error(`Failed to emit serviceStarted event: ${error.message}`);
      }
    } else if (status === "provider_en_route") {
      try {
        this.gateway.emitProviderEnRoute(bookingId, {
          bookingId,
          providerId: pId,
          eta: null, // Can be filled with real ETA in future
        });
      } catch (error: any) {
        this.logger.error(`Failed to emit providerEnRoute event: ${error.message}`);
      }
    } else if (status === "matched") {
      try {
        this.gateway.emitProviderAssigned(bookingId, {
          bookingId,
          provider: { id: pId },
        });
      } catch (error: any) {
        this.logger.error(`Failed to emit providerAssigned event: ${error.message}`);
      }
    } else if (status === "disputed") {
      try {
        this.gateway.emitDisputeRaised(bookingId, { bookingId });
      } catch (error: any) {
        this.logger.error(`Failed to emit disputeRaised event: ${error.message}`);
      }
    }

    return booking;
  }
}
