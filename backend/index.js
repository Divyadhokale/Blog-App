import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from "./routes/user.route.js"; 
import blogRoute from "./routes/blog.route.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
const app = express()

dotenv.config()

const port = process.env.PORT;
const MONOGO_URL = process.env.MONOG_URI;
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
  useTempFiles: true,
  tempFileDir:"/tmp/",
}));

// Add CORS middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
//DB Code
try{
   mongoose.connect(MONOGO_URL)
   console.log("Connected to MongoDb")
} catch (error) {
   console.log(error);
   
 }
 //define
app.use("/api/users",userRoute);
app.use("/api/blogs",blogRoute);
// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRETE_KEY ,// Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})