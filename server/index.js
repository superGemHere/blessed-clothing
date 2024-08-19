const express = require('express');
const { constants } = require('./constants');

const routes = require('./routes');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World.')
})

app.use(routes);

app.listen(constants.SERVER_PORT, () => console.log(`RESTful server is listening on port ${constants.SERVER_PORT}..`))