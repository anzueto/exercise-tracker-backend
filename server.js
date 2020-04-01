const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //connect to database mongodb atlas
const path = require('path');

require('dotenv').config();

const app = express(); // create express server
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json()); // allow us to parse json

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDb database connection established successfully');
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter); // loads excersices router
app.use('/users', usersRouter); // loads user router

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html')); // relative path
    });
}

// starting the server
app.listen(port, () => {
    console.log(`server is runnin on port: ${port}`);
})
