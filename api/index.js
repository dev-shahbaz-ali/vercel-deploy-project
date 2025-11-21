const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Root route - shows when someone visits yourdomain.vercel.app/
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Welcome to Vercel Express API!",
    timestamp: new Date().toISOString(),
    endpoints: {
      root: "/",
      api: "/api",
      health: "/health",
    },
  });
});

// Your existing API route
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "🚀 API is working perfectly!",
    timestamp: new Date().toISOString(),
  });
});

// Additional health check route
app.get("/health", (req, res) => {
  res.json({
    status: "✅ Healthy",
    timestamp: new Date().toISOString(),
    service: "Vercel Express API",
  });
});

// Export for Vercel
module.exports = app;

// Local development only
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🏠 Root: http://localhost:${PORT}/`);
    console.log(`🎯 API: http://localhost:${PORT}/api`);
    console.log(`❤️ Health: http://localhost:${PORT}/health`);
  });
}
