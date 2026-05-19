import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, Logger } from "@nestjs/common";
import helmet from "helmet";
import { connect } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";

const logger = new Logger("Bootstrap");

async function runSeed(app: any) {
  try {
    logger.log("🌱 Running database seed...");
    const userModel = app.get(getModelToken("User"));
    const providerModel = app.get(getModelToken("Provider"));

    await userModel.deleteMany({});
    await providerModel.deleteMany({});

    const passwordHash = await bcrypt.hash("password123", 10);

    // Seed test user
    await userModel.create({
      name: "Ali Khan",
      phone: "03001234567",
      passwordHash,
      location: { lat: 33.7298, lng: 73.1896, address: "Islamabad" },
      loyaltyPoints: 100,
    });

    const providers = [
      // Islamabad Providers
      {
        name: "Ahmed Plumber",
        phone: "03001234568",
        passwordHash,
        skills: ["plumbing", "pipe repair", "water heater"],
        cnic: "35201-1234567-1",
        location: { lat: 33.7298, lng: 73.1896 },
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
        location: { lat: 33.7250, lng: 73.1850 },
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
        location: { lat: 33.7350, lng: 73.1920 },
        rating: 4.9,
        reviewCount: 200,
        completedJobs: 250,
        reliabilityScore: 99,
        status: "active",
        baseRatePerHour: 1500,
      },
      {
        name: "Hassan Carpenter",
        phone: "03331234567",
        passwordHash,
        skills: ["carpentry", "furniture repair", "wood work"],
        cnic: "35201-2222222-1",
        location: { lat: 33.7200, lng: 73.1950 },
        rating: 4.7,
        reviewCount: 95,
        completedJobs: 110,
        reliabilityScore: 96,
        status: "active",
        baseRatePerHour: 900,
      },
      {
        name: "Rashid Painter",
        phone: "03441234567",
        passwordHash,
        skills: ["painting", "wall painting", "interior design"],
        cnic: "35201-3333333-1",
        location: { lat: 33.7320, lng: 73.1880 },
        rating: 4.6,
        reviewCount: 78,
        completedJobs: 95,
        reliabilityScore: 94,
        status: "active",
        baseRatePerHour: 750,
      },
      {
        name: "Faisal AC Technician",
        phone: "03551234567",
        passwordHash,
        skills: ["ac repair", "ac maintenance", "cooling system"],
        cnic: "35201-4444444-1",
        location: { lat: 33.7280, lng: 73.1910 },
        rating: 4.8,
        reviewCount: 110,
        completedJobs: 130,
        reliabilityScore: 97,
        status: "active",
        baseRatePerHour: 1200,
      },
      {
        name: "Samir Locksmith",
        phone: "03661234567",
        passwordHash,
        skills: ["locksmith", "key making", "security locks"],
        cnic: "35201-5555555-1",
        location: { lat: 33.7240, lng: 73.1870 },
        rating: 4.4,
        reviewCount: 65,
        completedJobs: 80,
        reliabilityScore: 92,
        status: "active",
        baseRatePerHour: 600,
      },
      {
        name: "Tariq Plumber",
        phone: "03771234567",
        passwordHash,
        skills: ["plumbing", "drainage", "bathroom fitting"],
        cnic: "35201-6666666-1",
        location: { lat: 33.7310, lng: 73.1905 },
        rating: 4.7,
        reviewCount: 105,
        completedJobs: 125,
        reliabilityScore: 95,
        status: "active",
        baseRatePerHour: 850,
      },
      {
        name: "Wahab Electrician",
        phone: "03881234567",
        passwordHash,
        skills: ["electrical wiring", "solar installation", "inverter setup"],
        cnic: "35201-7777777-1",
        location: { lat: 33.7270, lng: 73.1880 },
        rating: 4.6,
        reviewCount: 88,
        completedJobs: 105,
        reliabilityScore: 93,
        status: "active",
        baseRatePerHour: 1100,
      },
      {
        name: "Yousaf Cleaning",
        phone: "03991234567",
        passwordHash,
        skills: ["cleaning", "housekeeping", "office cleaning"],
        cnic: "35201-8888888-1",
        location: { lat: 33.7290, lng: 73.1930 },
        rating: 4.8,
        reviewCount: 155,
        completedJobs: 180,
        reliabilityScore: 98,
        status: "active",
        baseRatePerHour: 1400,
      },
      // Rawalpindi Providers
      {
        name: "Ali Plumber RWP",
        phone: "03001111111",
        passwordHash,
        skills: ["plumbing", "gas fitting", "water supply"],
        cnic: "35201-9999999-1",
        location: { lat: 33.5731, lng: 73.2794 },
        rating: 4.7,
        reviewCount: 112,
        completedJobs: 140,
        reliabilityScore: 96,
        status: "active",
        baseRatePerHour: 800,
      },
      {
        name: "Babar Electrician RWP",
        phone: "03112222222",
        passwordHash,
        skills: ["electrical", "wiring installation", "solar panels"],
        cnic: "35201-1010101-1",
        location: { lat: 33.5780, lng: 73.2750 },
        rating: 4.5,
        reviewCount: 80,
        completedJobs: 98,
        reliabilityScore: 91,
        status: "active",
        baseRatePerHour: 1000,
      },
      {
        name: "Chaudhry Carpenter RWP",
        phone: "03223333333",
        passwordHash,
        skills: ["carpentry", "door fitting", "cabinet making"],
        cnic: "35201-1111110-1",
        location: { lat: 33.5750, lng: 73.2800 },
        rating: 4.6,
        reviewCount: 92,
        completedJobs: 110,
        reliabilityScore: 94,
        status: "active",
        baseRatePerHour: 900,
      },
      {
        name: "Dawood Painter RWP",
        phone: "03334444444",
        passwordHash,
        skills: ["painting", "waterproofing", "wall putty"],
        cnic: "35201-1212121-1",
        location: { lat: 33.5760, lng: 73.2770 },
        rating: 4.7,
        reviewCount: 100,
        completedJobs: 120,
        reliabilityScore: 95,
        status: "active",
        baseRatePerHour: 700,
      },
      {
        name: "Ezzat Cleaner RWP",
        phone: "03445555555",
        passwordHash,
        skills: ["cleaning", "laundry", "carpet cleaning"],
        cnic: "35201-1313131-1",
        location: { lat: 33.5710, lng: 73.2820 },
        rating: 4.9,
        reviewCount: 180,
        completedJobs: 210,
        reliabilityScore: 99,
        status: "active",
        baseRatePerHour: 1300,
      },
      {
        name: "Farah AC Tech RWP",
        phone: "03556666666",
        passwordHash,
        skills: ["ac repair", "maintenance", "gas refilling"],
        cnic: "35201-1414141-1",
        location: { lat: 33.5740, lng: 73.2810 },
        rating: 4.8,
        reviewCount: 125,
        completedJobs: 145,
        reliabilityScore: 97,
        status: "active",
        baseRatePerHour: 1200,
      },
      {
        name: "Gulfam Locksmith RWP",
        phone: "03667777777",
        passwordHash,
        skills: ["locksmith", "safe installation", "alarm systems"],
        cnic: "35201-1515151-1",
        location: { lat: 33.5770, lng: 73.2780 },
        rating: 4.5,
        reviewCount: 70,
        completedJobs: 85,
        reliabilityScore: 92,
        status: "active",
        baseRatePerHour: 650,
      },
      {
        name: "Hamid Plumber RWP",
        phone: "03778888888",
        passwordHash,
        skills: ["plumbing", "underground pipeline", "sewerage"],
        cnic: "35201-1616161-1",
        location: { lat: 33.5720, lng: 73.2760 },
        rating: 4.6,
        reviewCount: 95,
        completedJobs: 115,
        reliabilityScore: 93,
        status: "active",
        baseRatePerHour: 900,
      },
      {
        name: "Imran Electrician RWP",
        phone: "03889999999",
        passwordHash,
        skills: ["electrical wiring", "voltage stabilizer", "generator setup"],
        cnic: "35201-1717171-1",
        location: { lat: 33.5750, lng: 73.2830 },
        rating: 4.7,
        reviewCount: 110,
        completedJobs: 135,
        reliabilityScore: 96,
        status: "active",
        baseRatePerHour: 1050,
      },
      {
        name: "Javed Services RWP",
        phone: "03990000000",
        passwordHash,
        skills: ["general services", "maintenance", "installation"],
        cnic: "35201-1818181-1",
        location: { lat: 33.5780, lng: 73.2805 },
        rating: 4.6,
        reviewCount: 102,
        completedJobs: 125,
        reliabilityScore: 94,
        status: "active",
        baseRatePerHour: 750,
      },
    ];

    await providerModel.create(providers);
    logger.log(`✅ Seeded 1 user and ${providers.length} providers successfully!`);
  } catch (error: any) {
    logger.error(`❌ Seeding failed: ${error.message}`);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Check database connection
  try {
    const dbUri = process.env.DATABASE_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kaamconnect";
    const connection = await connect(dbUri);

    if (connection.connection.readyState === 1) {
      logger.log(`✅ Database connected: ${connection.connection.host}/${connection.connection.name}`);
    }
  } catch (error) {
    logger.warn(`⚠️  Database connection check failed: ${error.message}`);
  }

  // Run seed if RUN_SEED environment variable is set
  if (process.env.RUN_SEED === "true") {
    await runSeed(app);
  }

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 KaamConnect AI Orchestrator running on port ${port}`);
  logger.log(`📱 Server is listening on http://localhost:${port}`);
}
bootstrap();
