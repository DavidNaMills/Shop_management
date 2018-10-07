const jwt = require('jwt-simple');
const Staff = require('../database/models/staff');
const {TOKEN_KEY} = require('../config/keys');

const generateToken = (staff)=>{
    const timeStamp = new Date().getDate();
    return jwt.encode({sub: staff._id, iat: timeStamp}, TOKEN_KEY);
};

exports.signin = (req, res, next)=>{
    const tempUser={
        name: req.user.name,
        level: req.user.level,
        _id: req.user._id
    };
    res.status(200).send({token: generateToken(req.user), staff:tempUser});
};


exports.signup = (req, res, next)=>{
    const tempStaff = req.body;

    Staff.findOne({
        email: tempStaff.email,
        name: tempStaff.name
    })
    .then((user)=>{
        if(user){
            return res.status(403).json({err:'staff_exists'});
        }
        const newStaff = new Staff(tempStaff);
        newStaff.save()
        .then(()=>{
            return res.status(200).json({staff: newStaff, msg: 'staff_saved'});
        })
        .catch((err)=>{
            res.status(500).send({'err': err});
        });
    })
    .catch((err)=>{return next(err);});
}
