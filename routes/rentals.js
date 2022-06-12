const {Rentals, validate} = require('../models/rentals');
const {Movies} = require('../models/movies');
const {Customers} = require('../models/customers');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/:id',async (req,res) => {
    if(! mongoose.isValidObjectId(req.params.id))
        return res.status(400).send('Invalid Id');
    const rentals = await Rentals.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');

    const movie = await Movies.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    const rental = new Rentals({
        customer:{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie:{
            _id: movie.id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    
    await rental.save();
    movie.numberInStock--;
    movie.save();

    res.send(rental);
});

module.exports = router;