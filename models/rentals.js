const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name:{type:String,required:true,minlength:5,maxlength:50},
            isGold:{type:Boolean,default:false},
            phone:{type:String,required:true,length:10}
        }),
        required:true
    },
    movie:{
        type: new mongoose.Schema({
            title:{type:String,required:true,trim:true,minlength:5,maxlength:50},
            dailyRentalRate:{type:Number,required:true,min:0,max:255}
        }),
        required:true
    },
    dateOut:{ type:Date, required:true, default: Date.now},
    dateReturned: {type: Date},
    rentalFee: {type:Number,min:0}
});

const Rentals = mongoose.model('rental',rentalSchema);

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(rental);
}


exports.Rentals = Rentals;
exports.validate = validateRental;