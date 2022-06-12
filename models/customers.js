const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold:{type:Boolean,default:false},
    name:{
        type:String,
        default:"customer",
        maxlength:20,
        minlength:3
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        length:10
    }
});

const Customers = mongoose.model('customer',customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().max(20).min(3),
        phone: Joi.string().length(10).required()
    });
    return schema.validate(customer);
}

exports.Customers = Customers;
exports.validate = validateCustomer;