const mongoose = require('mongoose');
const {Schema} = mongoose;

const inventorySchema = new Schema({
    productType:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default:""
    },
    costPrice:{
        type: Number,
        required: true
    },
    retailPrice:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    supplierName:{
        type: String,
        required: true
    },
    supplierPhone: {
        type: String,
        required: true
    },
    supplierAddress: {
        type: String,
        required: true
    },
    img:{
        type: String,
        required: false,
        default: ''    
    }
});

module.exports = mongoose.model('inventory', inventorySchema);