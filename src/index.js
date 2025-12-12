const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { request, response } = require('express');

// Environment variables loading
//require('dotenv').config({ quiet: true });
require('dotenv').config();

// API isntance
const app = express();

// Seciurity middlewares
app.use(helmet());
app.use(cors());
app.disable('x-powered-by');

// Logger middleware
app.use(morgan('dev'));

// Body parser middlewares
app.use(express.json({ limit: '50mb' }));

// CORS configuration
app.use((req = request, res = response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if ( req.method === 'OPTIONS' ) {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

// Route file
app.use(require('./routes/index'));


// Accepting requests
const PORT = process.env.API_PORT || 4095;
app.listen(PORT, () => {
    console.log(`WHODrug API is running on port ${PORT}`);
});