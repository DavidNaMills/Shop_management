const passport = require('passport');
const Authentication = require('../passport/authentication');



const reqAuth = passport.authenticate('jwt', {session: false});
const reqSignin = passport.authenticate('local', {session: false});


const {deleteStaff, updateStaff, findStaff} = require('../database/functions/staff');

module.exports=(app)=>{

    app.post('/login',  reqSignin, Authentication.signin);  //DONE 
    app.post('/signup',  Authentication.signup); //DONE

    app.get('/staff', (req, res)=>{     //DONE
        findStaff()
        .then((allStaff)=>{
            console.log(allStaff);
            res.status(234).send({allStaff});
            // res.status(404).send({
            //     level: 3,
            //     active: true,
            //     _id: "5bb7198fe6e904002061d4a7",
            //     name: "David",
            //     username: "thedrunkingpig",
            //     password: "$2a$10$YetGNQ7h00Xrp3g5fRwlQOy8l2w.tVIxhs5mJ1h6.t.WZBI1O1EIe",
            //     email: "mullerlight73@hotmail.com"
            // });
        }).catch((err)=>{
            res.status(500).send({'err': err.message});
        });
    });   

    app.delete('/staff', (req, res)=>{
        const {id} = req.body;
        deleteStaff(id)
        .then((staff)=>{
            res.status(200).send({id:staff._id});
        })
        .catch((err)=>{
            res.status(500).send({err: err.message});
        })
    });
    

    app.put('/staff', (req, res)=>{
        const {id, data}= req.body;
        updateStaff(id, data)
        .then((record)=>{
            res.status(200).send(record);
        })
        .catch((err)=>{
            res.status(500).send({err:err.message});
        })
    });
};