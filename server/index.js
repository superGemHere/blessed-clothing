require('dotenv').config();
const express = require('express');
const { constants } = require('./constants');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cookieParser());

mongoose.connect(isProduction ? process.env.MONGO_DB_URL : process.env.MONGO_DB_LOCAL_URL)
    .then(() => console.log('Database connected successfuly.'))
    .catch((err) => console.log(err));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({
    origin: [process.env.CLIENT_URL, process.env.LOCAL_CLIENT_URL],  // Allow specific origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow specific HTTP methods, including OPTIONS
    credentials: true,  // Allow credentials (cookies, etc.)
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  // Allowed headers
  }));
app.use(auth);


// app.use((req, res, next) => {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Allow-Headers', '*');


//     next();
// })

app.get('/', (req, res) => {
    res.send('Hello World.')
})

app.use(routes);

app.listen(process.env.LOCAL_SERVER_PORT, () => console.log(`RESTful server is listening on port ${process.env.LOCAL_SERVER_PORT}..`))