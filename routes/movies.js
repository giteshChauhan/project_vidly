const express = require('express');
const mongoose = require('mongoose');
const {Movies, validate} = require('../models/movies');
const {Genre} = require('../models/genres');
const router = express.Router();


router.get('/:id',async (req,res) => {
    if(! mongoose.isValidObjectId(req.params.id))
        return res.status(400).send('Invalid Id');
    const movie = await Movies.findById(req.params.id).select('title numberInStock dailyRentalRate genre.name -_id');
    if(!movie) return res.send('No such ID exists');
    res.send(movie);
});

router.post('/',async (req,res) =>{
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre');
    
    const movie = new Movies({
        title: req.body.title,
        genre:{
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
});

router.put('/:id',async (req,res) => {
    if(! mongoose.isValidObjectId(req.params.id))
        return res.status(400).send('Invalid Id');
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const genre = Genre.findById(req.param.genreId);
    if(!genre) res.status(400).send('Invalid genre ID');

    const movie = Movies.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),{
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate        
    },{new: true});
    if(!movie) res.status(400).send('Invalid movie ID');
    res.send(movie);
});

router.delete(':id',async (req,res) => {
    if(! mongoose.isValidObjectId(req.params.id))
        return res.status(400).send('Invalid Id');
    const movie = await Movies.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(400).send('Invalid movie ID');
    res.send(movie);
});


module.exports = router;