const invenModel = require('../models/inventory');

const addInventory = (details)=>{
    return new Promise((resolve, reject)=>{
        const newInven = new invenModel(details);
        newInven.save()
            .then((inven)=>{
                if(!inven){reject(new Error('inven_add_fail'));}
                resolve(inven);
            })
            .catch(err=>reject(err));
    });
};

const deleteInventory = (_id)=>{
    return new Promise((resolve, reject)=>{
        invenModel.findOneAndRemove({_id})
            .then((item)=>{
                if(!item){reject(new Error('inventory_not_deleted'));}
                resolve(item);
            })
            .catch(err=>reject(err));
    })
}

const deductQuantity = (id, deduct)=>{
    return new Promise((resolve, reject)=>{
        invenModel.findByIdAndUpdate({_id:id}, {$inc: {quantity: (deduct*-1)}}, {new: true }, (err, item)=>{
            if(err){reject(err);}
            if(!item){reject(new Error('inven_not_found'));}
            resolve(item);
        })
    })
};

const increaseQuantity = (_id, increment)=>{
    return new Promise((resolve, reject)=>{
        invenModel.findByIdAndUpdate({_id}, {$inc: {quantity: increment}}, {new: true }, (err, item)=>{
            if(err){reject(err);}
            if(!item){reject(new Error('inven_not_found'));}
            resolve(item);
        })
    })
};

const updateInventory = (id, details)=>{
    return new Promise((resolve, reject)=>{
        invenModel.findByIdAndUpdate({_id: id}, {...details}, {'new':true}, (err, item)=>{
            if(err){reject(err);}
            if(!item){reject(new Error('inven_not_found'));}
            resolve(item);            
        })
    })
}

const getAllInventory = () =>{
    return new Promise((resolve, reject)=>{
        invenModel.find()
            .then(items=>{ 
                resolve(items);
            })
            .catch(err=>reject(new Error('error_code_1')));
    })    
}

const searchInventory = (criteria) =>{
    return new Promise((resolve, reject)=>{
        invenModel.find(criteria)
            .then(items=>{
                resolve(items);
            })
            .catch(err=>reject(new Error('error_code_1')));
    })
}

module.exports={
    addInventory,
    deleteInventory,
    deductQuantity,
    increaseQuantity,
    updateInventory,
    getAllInventory,
    searchInventory
}