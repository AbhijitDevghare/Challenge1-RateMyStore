import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';


// Initialization of express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Setting up CORS
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));

// Logger
app.use(morgan('dev'));

// Database Connection
import connectToDb from './src/config/db.js';
connectToDb();

// Routes 
import routes from "./src/routers/v1/index.js";
app.use('/api/v1', routes);

// Error handling middleware 
import errorMiddleware from './src/middlewares/error.middleware.js';
app.use(errorMiddleware);

export default app;
