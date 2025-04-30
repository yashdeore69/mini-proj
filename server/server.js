import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth/auth-routes.js';

dotenv.config();

const uri = 'mongodb+srv://deoreyash69:deoreyash69@cluster0.yctvb8a.mongodb.net/mydatabase?retryWrites=true&w=majority&tls=true';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas connected successfully"))
  .catch((error) => console.log("MongoDB connection error:", error));

const app = express();
const PORT = process.env.PORT || 5000; 


app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders : [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials: true,
    })
)


app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);


app.listen(PORT, () => (console.log(`Server is running on port ${PORT}`)));