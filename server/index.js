require('dotenv').config();
const express = require('express');
const { constants } = require('./constants');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/footGear')
    .then(() => console.log('Database connected successfuly.'))
    .catch((err) => console.log(err));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
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

app.listen(constants.SERVER_PORT, () => console.log(`RESTful server is listening on port ${constants.SERVER_PORT}..`))