const customerModel = require('../models/customer');

const createCustomer = (details)=>{
    return new Promise((resolve, reject)=>{
        const newCust = new customerModel(details);
        newCust.save()
        .then((cust)=>{
            if(!cust){reject(new Error('customer_not_created'));}
            resolve(cust);
        })
        .catch(err=>reject(err));
    });
};

const deleteCustomer = (_id)=>{
    return new Promise((resolve, reject)=>{
        customerModel.findOneAndDelete({_id})
            .then((cust)=>{
                if(!cust){reject(new Error('customer_not_found'));}
                resolve(cust);
            })
            .catch(err=>reject(err));
    });
}

const updateCustomer = (_id, details)=>{
    return new Promise((resolve, reject)=>{
        customerModel.findOneAndUpdate({_id},{...details}, {'new':true}, (err, cust)=>{
            if(err){reject(err);}
            if(!cust){reject(new Error('customer_not_found'));}
            resolve(cust);
        });        
    });
};

const updateCustomerTTL = (_id, value)=>{
    return new Promise((resolve, reject)=>{
        customerModel.findOneAndUpdate({_id},{$inc: {purchaseTtl: value}}, {'new':true}, (err, cust)=>{
            if(err){reject(err);}
            if(!cust){reject(new Error('customer_not_found'));}
            resolve(cust);
        });        
    });
};

const searchCustomer = ()=>{
    return new Promise((resolve, reject)=>{
        customerModel.find({})
            .then((results)=>{
                resolve(results);
            })
            .catch(err=>reject(new Error('invalid_search_criteria')));
    })
}

module.exports={
    createCustomer,
    deleteCustomer,
    updateCustomer,
    searchCustomer,
    updateCustomerTTL
}