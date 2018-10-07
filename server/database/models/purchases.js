
const mongoose = require('mongoose');
const {Schema} = mongoose;

const purchaseSchema = new Schema({
    invoiceNo: String,
    totalPrice:{
        type: Number,
        required: true
    },
    unitPrice:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    dateOfPurchase:{
        type: Object,
        required: true
    },
    __customer:{
        type: Schema.Types.ObjectId,
        ref:'customer',
        required: true
    },
    __staff:{
        type: Schema.Types.ObjectId,
        ref:'staff',
        required: true
    },
    __inventory:{
        type: Schema.Types.ObjectId,
        ref:'inventory',
        required: true
    }
});

module.exports = mongoose.model('purchases', purchaseSchema);