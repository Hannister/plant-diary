require("dotenv").config();
require("express-async-errors");

//extra security pakages

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
// USE V2
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
// connectDB
const connectDB = require("./db/connect");

// routes

const authRoutes = require("./routes/auth-route");
const PlantsRoutes = require("./routes/plants-route");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");

app.set("trust proxy", 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(helmet());
app.use(cors());
app.use(xss());

// routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/plants", authMiddleware, PlantsRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

connectDB.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

connectDB.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
