const express = require('express');

const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const login = require('../routes/login');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const error = require('../middleware/error');


module.exports = function (app){
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/api/genres',[auth, admin],genres);
    app.use('/api/customers',customers);
    app.use('/api/movies',[auth, admin],movies);
    app.use('/api/rentals',auth,rentals);
    app.use('/api/users',users);
    app.use('/api/login',login);
app.use(error);
}