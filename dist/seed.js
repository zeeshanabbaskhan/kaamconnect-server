"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = __importStar(require("bcryptjs"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get((0, mongoose_1.getModelToken)('User'));
    const providerModel = app.get((0, mongoose_1.getModelToken)('Provider'));
    console.log('Clearing existing data...');
    await userModel.deleteMany({});
    await providerModel.deleteMany({});
    console.log('Seeding Users...');
    const passwordHash = await bcrypt.hash('password123', 10);
    const user1 = await userModel.create({
        name: 'Ali Khan',
        phone: '03001234567',
        passwordHash,
        location: { lat: 31.5204, lng: 74.3587, address: 'Gulberg, Lahore' },
        loyaltyPoints: 100,
    });
    console.log('Seeding Providers...');
    await providerModel.create([
        {
            name: 'Ahmed Plumber',
            phone: '03009876543',
            passwordHash,
            skills: ['plumbing', 'pipe repair', 'water heater'],
            cnic: '35201-1234567-1',
            location: { lat: 31.5204, lng: 74.3587 },
            rating: 4.8,
            reviewCount: 120,
            completedJobs: 150,
            reliabilityScore: 98,
            status: 'active',
            baseRatePerHour: 800,
        },
        {
            name: 'Bilal Electrician',
            phone: '03119876543',
            passwordHash,
            skills: ['electrical', 'wiring', 'ups installation'],
            cnic: '35201-7654321-1',
            location: { lat: 31.5820, lng: 74.3294 },
            rating: 4.5,
            reviewCount: 85,
            completedJobs: 100,
            reliabilityScore: 90,
            status: 'active',
            baseRatePerHour: 1000,
        },
        {
            name: 'Kamran Cleaning Services',
            phone: '03229876543',
            passwordHash,
            skills: ['cleaning', 'deep cleaning', 'sofa cleaning'],
            cnic: '35201-1111111-1',
            location: { lat: 31.5590, lng: 74.3360 },
            rating: 4.9,
            reviewCount: 200,
            completedJobs: 250,
            reliabilityScore: 99,
            status: 'active',
            baseRatePerHour: 1500,
        },
        {
            name: 'Usman Plumber (Offline)',
            phone: '03339876543',
            passwordHash,
            skills: ['plumbing'],
            cnic: '35201-2222222-1',
            location: { lat: 31.5204, lng: 74.3587 },
            rating: 4.2,
            reviewCount: 30,
            completedJobs: 40,
            reliabilityScore: 85,
            status: 'offline',
            baseRatePerHour: 700,
        }
    ]);
    console.log('Seeding complete! You can now log in with phone: 03001234567 and password: password123');
    await app.close();
    process.exit(0);
}
bootstrap();
//# sourceMappingURL=seed.js.map