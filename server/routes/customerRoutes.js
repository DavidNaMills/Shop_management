const passport = require('passport');
const reqAuth = passport.authenticate('jwt', {session: false});
const {createCustomer, deleteCustomer, updateCustomer, searchCustomer, updateCustomerTTL} = require('../database/functions/customer');



module.exports=(app)=>{


    app.get('/test', (req, res)=>{
        res.status(500).send('hello world!!!');
    });

    app.get('/customer/all', (req, res)=>{
        searchCustomer().then((results)=>{
            res.status(200).send(results);
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    });
    
    app.delete('/customer', (req, res)=>{
        const {id} = req.body;
        deleteCustomer(id)
        .then((results)=>{
            res.status(200).json({id: results._id});
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    });
    
    app.put('/customer', (req, res)=>{
        const {id, data} =  req.body;
        updateCustomer(id, data)
        .then((record)=>{
            res.status(200).json(record);
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    });

    app.put('/customer/total', (req, res)=>{
        const {id, data} =  req.body;
        updateCustomerTTL(id, data)
        .then((record)=>{
            res.status(200).json(record);
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    });


    app.post('/customer', (req, res)=>{
        const data = req.body;
        createCustomer(data)
        .then((record)=>{
            res.status(200).json(record);
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    });
};