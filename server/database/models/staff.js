const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;

const staffSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    level:{
        type: Number,
        default: 0
    },
    username:{
        type: String,
        minlength: 2,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minlength: 8,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    active:{
        type: Boolean,
        default: true
    }
});

staffSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        if(err)next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err)next(err);
            this.password = hash;
            next();
        });
    });
})

staffSchema.methods.comparePassword = function(candidatePassword, callback){
        bcrypt.compare(candidatePassword, this.password, (err, res) => {
          if (err) {
            return callback(err)
          } else {
            if (res) {
              return callback(null, res)
            } else {
              return callback(err)
            }
          }
        });
    // console.log(candidatePassword);
    // console.log(this.password);
    // bcrypt.compare(candidatePassword, this.password, (err, res)=>{
    //     if(err)return callback(err);
    //     callback(null, res)
    // });
};

const staff = mongoose.model('staff', staffSchema);
module.exports = staff;