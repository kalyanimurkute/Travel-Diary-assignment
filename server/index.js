import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;


app.get('/', (req, res) => {
    res.json({ message: 'welcome to travel Diary !' });
});


  app.get('/health', (req, res) => {
    res.json({ message: 'Server is healthy!' });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});