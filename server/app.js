require('dotenv').config()

const express = require('express');
const app = express();
const router = require('./routers');
const mongoose = require('mongoose');
const port = 3000;

mongoose.connect('mongodb://localhost/gettingstarted', { useNewUrlParser: true });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);



app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})