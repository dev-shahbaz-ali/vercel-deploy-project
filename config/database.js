import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    console.log(
      "MongoDB URL:",
      process.env.MONGODB_URL ? "Present" : "Missing"
    );

    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error("Error:", error.message);
    console.error("MongoDB URL used:", process.env.MONGODB_URL);
    throw error;
  }
};
