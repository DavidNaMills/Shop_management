const passport = require('passport');
const reqAuth = passport.authenticate('jwt', {session: false});

const {addInventory,
deleteInventory,
deductQuantity,
increaseQuantity,
updateInventory,
getAllInventory
} = require('../database/functions/inventory');

module.exports = (app)=>{
    app.get('/inventory', (req, res)=>{     //DONE
        getAllInventory()
        .then((results)=>{
            res.status(200).send(results);
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    });

    app.post('/inventory', (req, res)=>{   //DONE
        const data = req.body;
        addInventory(data)
        .then((record)=>{
            res.status(200).json(record);
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    });


    app.post('/inventory/increase', (req, res)=>{   //increaseQuantity
        const {id, data} = req.body;
        increaseQuantity(id, data)
        .then((record)=>{
            res.status(200).json(record);
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    });


    app.post('/inventory/decrease', (req, res)=>{   //decreaseQuantity
        const {id, data} = req.body;
        deductQuantity(id, data)
        .then((record)=>{
            res.status(200).json(record);
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    });



    app.put('/inventory', (req, res)=>{ //DONE
        const {id, data} = req.body;
        updateInventory(id, data)
        .then((record)=>{
            res.status(200).json(record);
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    })
    
    app.delete('/inventory', (req, res)=>{      //DONE
        const {id} = req.body;
        deleteInventory(id)
        .then((result)=>{
            res.status(200).json({id:result._id});
        })
        .catch((err)=>{
            res.status(500).send({'err':err.message});
        })
    })
}