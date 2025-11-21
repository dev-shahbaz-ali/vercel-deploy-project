const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Single test route
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "🚀 API is working perfectly!",
    timestamp: new Date().toISOString(),
  });
});

// Export for Vercel
module.exports = app;

// Local development only
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/api`);
  });
}
