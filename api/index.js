const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config();
const port = 5000;
app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.26zhx4l.mongodb.net/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

const checkHeadersSent = (req, res, next) => {
  if (res.headersSent) {
    return res.end();
  }
  next();
};

app.post("/api/upload", checkHeadersSent, upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", checkHeadersSent, authRoute);
app.use("/api/users", checkHeadersSent, userRoute);
app.use("/api/posts", checkHeadersSent, postRoute);
app.use("/api/categories", checkHeadersSent, categoryRoute);

app.listen(port, () => {
  console.log("Backend is running.");
});
