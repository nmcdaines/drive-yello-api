
// Practical Test - Drive Yello
// Solution by Nate Daines

// ENVIRONMENT CONFIG - Uses the .env file in the project root
require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Mongoose - Runs and initialises
import mongoose from './lib/init/mongodb';


// Routers
import auth from './routes/auth';
import orders from './routes/orders';


const PORT = process.env.PORT || 8090;
const HOST = process.env.HOSTNAME || '0.0.0.0';

const app = express();


// Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/auth', auth);
app.use('/orders', orders);


app.listen(PORT, HOST, () => {
   console.log(`Order API Server is listening on http://${HOST}:${PORT}`);
});