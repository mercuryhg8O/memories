const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const accountRoutes = require('./api/routes/account');
const memoryRoutes = require('./api/routes/memory');

mongoose.connect('mongodb+srv://memory-db:' + process.env.MONGO_ATLAS_PW + '@memories.ykoxmda.mongodb.net/?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//PREVENTS CORS ERRORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Allow-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE")
    }
    next()
});
    
//ROUTES THAT HANDLE REQUEST
app.use('/account', accountRoutes);
app.use('/memory', memoryRoutes);
app.use((req, res, nest) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;