const express = require('express');
const bcrypt = require('bcrypt');
const {Users, validate} = require('../models/users');
const auth = require('../middleware/auth');
const _ = require('lodash');
const router = express.Router();

router.get('/me', auth,async (req,res) =>{
    const user = await Users.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered');

    user = new Users(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});

module.exports = router;