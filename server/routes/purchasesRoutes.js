const passport = require('passport');
const reqAuth = passport.authenticate('jwt', {session: false});

const mongoose = require('mongoose');
const {
    createPurchase,
    updatePurchase,
    deletePurchase,
    searchPurchases
} = require('../database/functions/purchases')

module.exports=(app)=>{
    app.get('/purchases',  (req, res)=>{       //DONE
        searchPurchases()
        .then((record)=>{
            res.status(200).json(record);
        })
        .catch((err)=>{
            res.status(500).json({'err':err.message});
        })
    });

    app.post('/purchases',  (req, res)=>{   //DONE
        createPurchase(req.body)
        .then((records)=>{
            res.status(200).json(records);
        })
        .catch((err)=>{
            res.status(500).json({'err':err.message});
        })
    });

    app.put('/purchases',  (req, res)=>{    //DONE
        const {id, data} = req.body;
        updatePurchase(id, data)
        .then((record)=>{
            res.status(200).json(record);
        })
        .catch((err)=>{
            res.status(500).json({'err':err.message});
        })
    });

    app.delete('/purchases',  (req, res)=>{     //DONE
        const {id} = req.body;
        deletePurchase(id)
        .then((record)=>{
            res.status(200).json({id:record._id});
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        });
    });
};