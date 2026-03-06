const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { enquiryRoutes } = require("./App/Models/Middleware/Routes/web/EnquiryRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Root test route
app.get("/", (req, res) => {
  res.send("API is working on Vercel!");
});

// Health check for Vercel
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// API routes
app.use("/api/enquiry", enquiryRoutes);  // Note: "/web" हटा दिया

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// MongoDB connection (optimized for serverless)
let isConnected = false; // Track connection status

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DBURL || "mongodb://127.0.0.1:27017/Portfolio", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds timeout
    });
    
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw error; // Throw error to handle it in the route
  }
};

// Vercel के लिए serverless function export
module.exports = async (req, res) => {
  try {
    // हर request से पहले MongoDB connect करें (अगर जरूरत हो)
    await connectToDatabase();
    
    // Express app चलाएं
    return app(req, res);
  } catch (error) {
    console.error("Serverless function error:", error);
    return res.status(500).json({ 
      error: "Database connection failed",
      message: error.message 
    });
  }
};

// Local development के लिए (ये सिर्फ तब चलेगा जब सीधे node server.js चलाएं)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Local server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
}
