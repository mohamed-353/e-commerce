const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const router = require("./routes/router");
const httpStatusText = require("./utils/httpStatusText");


const app = express();
app.use(express.json({ limit: '6mb' })); // Increase as needed
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true // Allows cookies and other credentials to be sent
}));

app.use("/api", router);

connectDb().then(() => {
  console.log("connect to DB");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

// global middleware for not found router

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "error",
    message: "this resource is not available",
  });
});

// global error handler
app.use((error, req, res, next) => {
  return res.json({
    success: false,
    status: error.statusText || httpStatusText.ERROR,
    message: error.message || error,
    code: error.statusCode || 500,
  });
});