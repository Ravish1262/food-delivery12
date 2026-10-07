import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.error("MONGO_URL environment variable is missing!");
      return;
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
  }
};
