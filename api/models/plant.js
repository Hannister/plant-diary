const mongoose = require("mongoose");

// Define the User Schema
const PlantSchema = new mongoose.Schema(
    {
        plantName: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true,
            maxlength: 50,
        },
        plantNickName: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        plantFamily: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        light: {
            type: String,
            enum: ["direct sunlight", "indoor light", "shadow"],
            message: "{VALUE} is not supported",
            default: "direct sunlight",
            required: [true, "Please provide a light preference"],
        },
        water: {
            type: String,
            lowercase: true,
            trim: true,
            maxlength: 50,
            required: [true, "Please provide a water preference"],
        },
        image: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide user"],
        },
    },
    { timestamps: true }
);

// Create the User Model

const Plant = mongoose.model("Plant", PlantSchema);
module.exports = Plant;
