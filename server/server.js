const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect('mongodb+srv://deoreyash69:deoreyash69@cluster0.yctvb8a.mongodb.net/mydatabase?retryWrites=true&w=majority&ssl=true')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error', err));

const app = express();
const PORT = process.env.PORT || 5000; 


app.use(
    cors({
        origin: 'http://localhost:5000',
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
app.listen(PORT, () => (console.log(`Server is running on port ${PORT}`)));