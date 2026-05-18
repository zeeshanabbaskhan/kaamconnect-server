import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { getModelToken } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";

async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(AppModule);

    const userModel = app.get(getModelToken("User"));
    const providerModel = app.get(getModelToken("Provider"));

    console.log("Clearing existing data...");
    await userModel.deleteMany({});
    await providerModel.deleteMany({});

    console.log("Seeding Users...");
    const passwordHash = await bcrypt.hash("password123", 10);

    await userModel.create({
      name: "Ali Khan",
      phone: "03001234567",
      passwordHash,
      location: { lat: 31.5204, lng: 74.3587, address: "Gulberg, Lahore" },
      loyaltyPoints: 100,
    });

    console.log("Seeding Providers...");

    await providerModel.create([
      {
        name: "Ahmed Plumber",
        phone: "03009876543",
        passwordHash,
        skills: ["plumbing", "pipe repair", "water heater"],
        cnic: "35201-1234567-1",
        location: { lat: 31.5204, lng: 74.3587 }, // Very close
        rating: 4.8,
        reviewCount: 120,
        completedJobs: 150,
        reliabilityScore: 98,
        status: "active",
        baseRatePerHour: 800,
      },
      {
        name: "Bilal Electrician",
        phone: "03119876543",
        passwordHash,
        skills: ["electrical", "wiring", "ups installation"],
        cnic: "35201-7654321-1",
        location: { lat: 31.582, lng: 74.3294 }, // A bit far
        rating: 4.5,
        reviewCount: 85,
        completedJobs: 100,
        reliabilityScore: 90,
        status: "active",
        baseRatePerHour: 1000,
      },
      {
        name: "Kamran Cleaning Services",
        phone: "03229876543",
        passwordHash,
        skills: ["cleaning", "deep cleaning", "sofa cleaning"],
        cnic: "35201-1111111-1",
        location: { lat: 31.559, lng: 74.336 }, // Moderate distance
        rating: 4.9,
        reviewCount: 200,
        completedJobs: 250,
        reliabilityScore: 99,
        status: "active",
        baseRatePerHour: 1500,
      },
      {
        name: "Usman Plumber (Offline)",
        phone: "03339876543",
        passwordHash,
        skills: ["plumbing"],
        cnic: "35201-2222222-1",
        location: { lat: 31.5204, lng: 74.3587 }, // Close but offline
        rating: 4.2,
        reviewCount: 30,
        completedJobs: 40,
        reliabilityScore: 85,
        status: "offline",
        baseRatePerHour: 700,
      },
    ]);

    console.log(
      "✅ Seeding complete! You can now log in with phone: 03001234567 and password: password123",
    );

    await app.close();
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

bootstrap();
