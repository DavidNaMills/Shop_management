const mongoose = require('mongoose');
const uuid = require('uuid');
const purchaseModel = require('../models/purchases');


const createPurchase = (data) =>{
    let criteria = data;
    Object.entries(criteria).forEach(function([key, value]) {
        if(key[0]==="_" && mongoose.Types.ObjectId.isValid(key)){
            criteria[key] = mongoose.Types.ObjectId(value);
        }
     });
    return new Promise((resolve, reject)=>{
        const newPurchase = new purchaseModel({
            invoiceNo:uuid(),
            ...criteria
        });
        newPurchase.save()
            .then((item)=>{
                if(!item){reject(new Error('pur_not_saved'));}
                resolve(item);
            })
            .catch(err=>reject(err)) ;
    });
}

const updatePurchase =(_id, data)=>{
    let updates = data;
    Object.entries(updates).forEach(function([key, value]) {
        if(key[0]==="_" && mongoose.Types.ObjectId.isValid(key)){
            updates[key] = mongoose.Types.ObjectId(value);
        }
     });
    return new Promise((resolve, reject)=>{
        purchaseModel.findByIdAndUpdate({_id}, updates, {'new':true}, (err, item)=>{
            if(err){reject(err);}
            if(!item){reject(new Error('error_code_1'));}
            resolve(item);
        })
    })
}

const deletePurchase = (_id)=>{
    return new Promise((resolve, reject)=>{
        purchaseModel.findOneAndDelete({_id})
            .then((item)=>{
                if(!item)reject(new Error('no_record_to_delete'));
                resolve(item);
            })
            .catch(err=>reject(err));
    });
}

const searchPurchases = (data={})=>{
    let criteria = data;
    Object.entries(criteria).forEach(function([key, value]) {
        if(key[0]==="_" && mongoose.Types.ObjectId.isValid(key)){
            criteria[key] = mongoose.Types.ObjectId(value);
        }
     });
    return new Promise((resolve, reject)=>{
        purchaseModel.find(criteria)
            .then(items=>{
                resolve(items);
            })
            .catch(err=>reject(err));
    })
}

module.exports = {
    createPurchase,
    updatePurchase,
    deletePurchase,
    searchPurchases
}
