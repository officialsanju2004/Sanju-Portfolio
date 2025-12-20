let express = require("express");
let app = express();
let cors = require("cors");
let mongoose = require("mongoose");
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

// Connect MongoDB and start server
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected:", DBURL);
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}).catch(err => {
  console.log("MongoDB connection failed:", err);
  // Still start server
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000} (DB not connected)`);
  });
});
