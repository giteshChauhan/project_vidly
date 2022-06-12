const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('joi');
const {Users} = require('../models/users');
const router = express.Router();

router.post('/',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
    
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');
    
    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user){
    const schema = Joi.object({
        email: Joi.string().required().min(11).max(255).email(),
        password: Joi.string().min(8).max(50).required()
    });
    return schema.validate(user);
}

module.exports = router;