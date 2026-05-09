import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./db.js";

import { checkJWT } from "./middlewares/jwt.js";

import { getHome, getHealth } from "./controllers/health.js";

import { postSignup, postLogin } from "./controllers/auth.js";

import {
  getTours,
  postTour,
  putTours,
  getTourById,
  deleteTour,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "./controllers/tours.js";

import ImageKit from "@imagekit/nodejs";

import { getUser, updateUser } from "./controllers/user.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

const PORT = process.env.PORT || 8080;

// ================= IMAGEKIT =================

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// ================= ROUTES =================

app.get("/", getHome);

app.get("/auth", (req, res) => {
  try {
    const authParams = client.getAuthenticationParameters();

    res.json({
      token: authParams.token,
      expire: authParams.expire,
      signature: authParams.signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });

  } catch (error) {
    console.log("Auth Error:", error);
    res.status(500).json({ message: "Auth failed" });
  }
});

app.get("/health", getHealth);

// ================= AUTH =================

app.post("/signup", postSignup);

app.post("/login", postLogin);

// ================= TOURS =================

app.post("/tours", checkJWT, postTour);

app.get("/tours", checkJWT, getTours);

app.put("/tours/:id", checkJWT, putTours);

app.get("/tours/:id", checkJWT, getTourById);

app.delete("/tours/:id", checkJWT, deleteTour);

// ================= WISHLIST =================

app.post("/wishlist/:id", checkJWT, addToWishlist);

app.delete("/wishlist/:id", checkJWT, removeFromWishlist);

app.get("/wishlist", checkJWT, getWishlist);

// ================= USER =================

app.get("/user", checkJWT, getUser);

app.put("/user", checkJWT, updateUser);

// ================= SERVER =================

app.listen(PORT, async () => {

  console.log(`Server running on port ${PORT}`);

  await connectDB();

});