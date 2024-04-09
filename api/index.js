import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import doctorRoutes from "./routes/doctor.js";
import cookieParser from "cookie-parser";
import ChatMessage from "./models/ChatMessage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 5001;

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected");
});

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mentaluser:d123123@cluster0.pgejbz9.mongodb.net/MentalHealthDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } 
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Failed to connect to MongoDB:", err);
  }
};

// Routes
app.get("/messages", async (req, res) => {
  try {
      const messages = await ChatMessage.find();
      res.json(messages);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/messages", async (req, res) => {
  try {
      const { user, message } = req.body;

      if (!user || !message) {
          return res
              .status(400)
              .json({ error: "User and message are required" });
      }

      const chatMessage = new ChatMessage({
          user,
          message,
      });

      await chatMessage.save();

      res.status(201).json(chatMessage);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});



app.use(cookieParser());
dotenv.config();
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("doctors"));
app.use(fileUpload());
app.use("/", doctorRoutes);
app.get("/", (req, res) => {
  res.send("hello it/s running");
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong";
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: err.stack,
  });
});
app.listen(process.env.PORT || port, () => {
  connect();
  console.log("Started");
});


