import mongoose, { Schema } from "mongoose";
import user from "./user.js";

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cities: {
        type: [String],
        default: [],
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    photos: {
        type: [String],
        default: [],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
 {timestamps: true}
);

const tour = mongoose.model("tour", tourSchema);

export default tour;