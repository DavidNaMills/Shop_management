require('../../../connection');
const mongoose = require('mongoose');

afterAll(async ()=>{
    mongoose.connection.close();
});