const express = require('express');
const routes = require('./routes');
const { accessValidation } = require('./handler');

const app = express();
const port = 3000;
const host = 'localhost';

app.use(express.json());
app.use('/', routes);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})