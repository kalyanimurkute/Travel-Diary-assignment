import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import { checkJWT } from './middlewares/jwt.js';
import { getHome, getHealth } from './controllers/health.js';
import { postSignup, postLogin } from './controllers/auth.js';
import { getTours, postTour, putTours, getTourById, deleteTour, addToWishlist, removeFromWishlist, getWishlist } from './controllers/tours.js';
import ImageKit from "@imagekit/nodejs";
import { getUser, updateUser } from './controllers/user.js';


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});



app.get('/', getHome);
app.get('/auth', function (req, res) {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});
app.get('/health', getHealth);

app.post('/signup', postSignup);
app.post('/login', postLogin);

app.post('/tours', checkJWT, postTour);
app.get('/tours', checkJWT, getTours);
app.put('/tours/:id', checkJWT, putTours);
app.get('/tours/:id', checkJWT, getTourById);
app.delete('/tours/:id', checkJWT, deleteTour);

app.post("/wishlist/:id", checkJWT, addToWishlist);
app.delete("/wishlist/:id", checkJWT, removeFromWishlist);
app.get("/wishlist", checkJWT, getWishlist);

app.get('/user', checkJWT, getUser);
app.put('/user', checkJWT, updateUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();

});