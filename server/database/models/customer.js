//sex: true:male, false:female

const mongoose = require('mongoose');
const {Schema} = mongoose;

const customerSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    name:{
        type: String,
        required: true,
        unique: false
    },
    dob:{
        type: String,
        required: true
    },
    sex: {
        type: Boolean,
        default: true
    },
    phone:{
        type: String,
        required: true,
        unique:true
    },
    address:{
        type: String,
        required: true
    },
    wechat:{
        type: String,
        required: true,
        unique:true
    },
    customerType:{
        type: Number,
        default: 0
    },
    purchaseTtl:{
        type: Number,
        default: 0
    }
});

const customer = mongoose.model('customer', customerSchema);

module.exports = customer;