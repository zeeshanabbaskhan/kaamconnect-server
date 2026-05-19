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

    const providers = [
      // Islamabad Providers
      {
        name: "Ahmed Plumber",
        phone: "03001234567",
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

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ Seeding complete!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n📱 Test User Login:");
    console.log("   Phone: 03001234567");
    console.log("   Password: password123");
    console.log("\n🔧 Sample Provider Logins (Islamabad):");
    console.log("   Ahmed Plumber: 03001234568 / password123");
    console.log("   Bilal Electrician: 03119876543 / password123");
    console.log("   Kamran Cleaning: 03229876543 / password123");
    console.log("\n🔧 Sample Provider Logins (Rawalpindi):");
    console.log("   Ali Plumber RWP: 03001111111 / password123");
    console.log("   Babar Electrician RWP: 03112222222 / password123");
    console.log("   Ezzat Cleaner RWP: 03445555555 / password123");
    console.log("\n📍 Total: 1 user + 20 providers in ISB & RWP");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    await app.close();
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

bootstrap();
