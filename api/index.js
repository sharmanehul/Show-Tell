// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const authRoute = require("./routes/auth");
// const userRoute = require("./routes/users");
// const postRoute = require("./routes/posts");
// const categoryRoute = require("./routes/categories");
// const multer = require("multer");
// const path = require("path");

// dotenv.config();
// app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: true
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log(err));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });

// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/categories", categoryRoute);

// //============================Deployment===================//


// const __dirname1 = path.resolve();
// // if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "../client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "../client/build", "index.html"));
//   });


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Backend is running on port ${PORT}`);
// });


const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// Configure CORS middleware
const allowedOrigins = ["http://localhost:3000"]; // Add other allowed origins if needed
app.use(cors({
  origin: allowedOrigins,
  credentials: true // Allow cookies to be sent with requests
}));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => console.log("Connected to MongoDB"))
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
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

//============================Deployment===================//

const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
