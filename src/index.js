
// Practical Test - Drive Yello
// Solution by Nate Daines

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 8090;
const HOST = process.env.HOSTNAME || '0.0.0.0';

const app = express();

// Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes


app.listen(PORT, HOST, () => {
   console.log(`Order API Server is listening on http://${HOST}:${PORT}`);
});