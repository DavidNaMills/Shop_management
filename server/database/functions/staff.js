const staffModel = require('../models/staff');
const mongoose = require('mongoose');

const addStaff = (details)=>{
    return new Promise((resolve, reject)=>{
        const newStaff = new staffModel(details);
        newStaff.save()
        .then((staff)=>{
            if(!staff){reject()}
            resolve(staff);
        })
        .catch((err)=>{
            reject(new Error('staff_validation'));
        })
    });
};


const loginStaff = (username, password)=>{
    return new Promise ((resolve, reject)=>{
        const user = staffModel.findOne({username:username})
            .then((user)=>{
                if(!user)reject(new Error('no_user'));
                if(!user.active)reject(new Error('not_active'), false);

                user.comparePassword(password, (err, isMatch)=>{
                    
                    if(!isMatch)reject(new Error('password_mismatch'));
                    resolve(user);
                });
            })
            .catch(err=>reject(err));
    });
};


const deleteStaff = (_id)=>{
    return new Promise((resolve, reject)=>{
        staffModel.findOneAndDelete({_id})
        .then((staff)=>{
            if(!staff){
                reject(new Error ('staff_not_found'));
            };
            resolve(staff);
        })
        .catch((err)=>{
            reject(err);
        });
    });
};


const findStaff = (criteria)=>{
    return new Promise((resolve, reject)=>{
        staffModel.find(criteria)
        .then((staff)=>{
            resolve(staff);
        })
        .catch(err=>reject(err));
    });
};

const updateStaff = (id, details)=>{
    return new Promise((resolve, reject)=>{
        staffModel.findOneAndUpdate({_id:id},{...details}, {'new':true}, (err, staff)=>{
            if(err){reject(new Error('error_code_1'));}
            if(!staff){reject(new Error('staff_not_found'));}
            resolve(staff);
        });
    });
}

module.exports={
    addStaff,
    loginStaff,
    deleteStaff,
    updateStaff,
    findStaff,
    addStaff
};