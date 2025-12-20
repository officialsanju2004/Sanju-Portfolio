let express=require("express");
let path=require("path");
let app=express();
let cors=require('cors');
require('dotenv').config();
let mongoose=require("mongoose");
const { enquiryRoutes } = require("./App/Models/Middleware/Routes/web/EnquiryRoutes");


app.use(express.json());
app.use(cors());

const SECRET_KEY=process.env.JWT_SECRET;
const expiresIn=process.env.TOKEN_EXPIRES_IN;
const localLink="mongodb://127.0.0.1:27017/Portfolio";

app.use("/web/api/enquiry",enquiryRoutes)
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDb");
    app.listen(process.env.PORT||3000,()=>{
        console.log('Server is running...') 
    })
}).catch((err)=>{
    console.log(err)
});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL||localLink);
    console.log("MongoDB connected :",process.env.DBURL);
  } catch (err) {
    console.log("MongoDB not connected. Skipping for now.",err);
  }
};

// Connect DB but **server start hamesha karega**
connectDB().finally(() => {
  app.listen(process.env.PORT||3000, () => {
    console.log(`Server running on port`);
  });
});


//http://localhost:8000/web/api/enquiry/enquiry-view
