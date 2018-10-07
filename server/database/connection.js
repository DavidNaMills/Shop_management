const mongoose = require('mongoose');

console.log(process.env.URL);

mongoose.connect(process.env.URL, { useNewUrlParser: true });
mongoose.promise = global.Promise;

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));