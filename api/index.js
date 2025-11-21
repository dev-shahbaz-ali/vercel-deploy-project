import express from "express";
import serverless from "serverless-http";
import ContactRoutes from "../routes/contacts.routes.js";
import { connectDB } from "../config/database.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware - Fix paths for Vercel
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Routes
app.use("/", ContactRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "✅ Healthy",
    message: "Contact App is running on Vercel",
    timestamp: new Date().toISOString(),
  });
});

// Export for Vercel
export default serverless(app);

// Local development
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
