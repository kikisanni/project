import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import cookieSession from 'cookie-session';
import authRoutes from './routes/auth.js';
import './passport.js';
import cors from 'cors';

const app = express();

// const port = process.env.PORT || 8000;
mongoose.connect(
    'mongodb+srv://admin:34gX6N81c3jQtJwG@cluster0.frgmexc.mongodb.net/GestoLearn?retryWrites=true&w=majority'
    ).then(()=>app.listen(8000)).then(()=>console.log("App is now listening for request on port 8000. You have been connected to the database succesfully")
    ).catch((err)=>console.log(err));


app.use(session({
        secret: 'e3a8b53f6f28340e79badd2c505d5f91c7c89ccea03579ea6ea7527c5f5e75f1',
        resave: false,
        saveUninitialized: true
    }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.get('/', (req, res) =>{
    res.send('http://localhost:5173');
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.error('Error handling middleware called');
    console.error('Path:', req.path);
    console.error('Error:', error.message);
  
    if (res.headersSent) {
      return next(error);
    }
  
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  });