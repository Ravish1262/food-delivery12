import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

const adminEmail = process.argv[2] || "admin@fooddelivery.com";
const adminPassword = process.argv[3] || "admin12345";
const adminName = "Admin User";

async function createAdmin() {
  try {
    const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/food-delivery";
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB:", mongoUrl);

    const saltRounds = Number(process.env.SALT) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
      existingUser.role = "admin";
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log(`\n✅ Updated existing user "${adminEmail}" to admin!`);
    } else {
      const newAdmin = new User({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      await newAdmin.save();
      console.log(`\n✅ Created new Admin account successfully!`);
    }

    console.log(`\n=============================`);
    console.log(`  Admin Email:    ${adminEmail}`);
    console.log(`  Admin Password: ${adminPassword}`);
    console.log(`  Role:           admin`);
    console.log(`=============================\n`);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();
