const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { enquiryRoutes } = require("./App/Models/Middleware/Routes/web/EnquiryRoutes");

app.use(express.json());
app.use(cors());

// Root test route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// API routes
app.use("/web/api/enquiry", enquiryRoutes);

const DBURL = process.env.DBURL || "mongodb://127.0.0.1:27017/Portfolio";

// Connect MongoDB
mongoose.connect(DBURL)
  .then(() => {
    console.log("MongoDB connected:", DBURL);
  })
  .catch(err => {
    console.log("MongoDB connection failed:", err);
  });

module.exports = app;
