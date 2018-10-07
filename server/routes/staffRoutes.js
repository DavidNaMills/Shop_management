const passport = require('passport');
const Authentication = require('../passport/authentication');



const reqAuth = passport.authenticate('jwt', {session: false});
const reqSignin = passport.authenticate('local', {session: false});


const {deleteStaff, updateStaff, findStaff} = require('../database/functions/staff');

module.exports=(app)=>{

    app.post('/login',  reqSignin, Authentication.signin);  //DONE 
    app.post('/signup',  Authentication.signup); //DONE

    app.get('/staff/all', reqAuth, (req, res)=>{     //DONE
        findStaff()
        .then((allStaff)=>{
            res.status(200).json(allStaff);
        }).catch((err)=>{
            res.status(500).json({'err': err.message});
        });
    });   

    app.delete('/staff', reqAuth, (req, res)=>{
        const {id} = req.body;
        deleteStaff(id)
        .then((staff)=>{
            res.status(200).send({id:staff._id});
        })
        .catch((err)=>{
            res.status(500).json({err: err.message});
        })
    });
    

    app.put('/staff', reqAuth, (req, res)=>{
        const {id, data}= req.body;
        updateStaff(id, data)
        .then((record)=>{
            res.status(200).send(record);
        })
        .catch((err)=>{
            res.status(500).json({err:err.message});
        })
    });
};