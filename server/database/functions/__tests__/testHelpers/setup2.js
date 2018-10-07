const staffModel = require('../../../models/staff');
const customerModel = require('../../../models/customer');
const invenModel = require('../../../models/inventory');
const purchaseModel = require('../../../models/purchases');

const {cust1, cust2, cust3} = require('./customerTestData');
const {inven1, inven2, inven3} = require('./inventoryTestData');
const {partialPurchase1, partialPurchase2, partialPurchase3, partialPurchase4} = require('./purchasesTestData');
const {ud, ud2, ud3} = require('./staffTestData');


let customer1, customer2, customer3;
let in1, in2, in3;
let staff1, staff2, staff3;
let pur, pur2, pur3, pur4;

const beforeAll = (async()=>{
    await customerModel.remove({});
    await invenModel.remove({});
    await staffModel.remove({});

    const t1 = new customerModel(cust1);
    const t2 = new customerModel(cust2);
    const t3 = new customerModel(cust3);
    
    customer1 = await t1.save().then((doc)=>{return(doc);});
    customer2 = await t2.save().then((doc)=>{return(doc);});
    customer3 = await t3.save().then((doc)=>{return(doc);});
    
    const t12 = new invenModel(inven1);
    const t22 = new invenModel(inven2);
    const t32 = new invenModel(inven3);
    
    in1 = await t12.save().then((doc)=>{return(doc);});
    in2 = await t22.save().then((doc)=>{return(doc);});
    in3 = await t32.save().then((doc)=>{return(doc);});

    const t123 = new staffModel(ud);
    const t223 = new staffModel(ud2);
    const t323 = new staffModel(ud3);
    
    staff1 = await t123.save().then((doc)=>{return(doc);});
    staff2 = await t223.save().then((doc)=>{return(doc);});
    staff3 = await t323.save().then((doc)=>{return(doc);});

    pur = {
        salePrice: partialPurchase1.salePrice,
        dateOfPurchase: partialPurchase1.dateOfPurchase,
        __customer: customer1._id,
        __staff: staff1._id,
        __inventory: in1._id
    };
    pur2 = {
        salePrice: partialPurchase2.salePrice,
        dateOfPurchase: partialPurchase2.dateOfPurchase,
        __customer: customer2._id,
        __staff: staff1._id,
        __inventory: in3._id
    };
    pur3 = {
        salePrice: partialPurchase3.salePrice,
        dateOfPurchase: partialPurchase3.dateOfPurchase,
        __customer: customer3._id,
        __staff: staff2._id,
        __inventory: in1._id
    };
    pur4 = {
        salePrice: partialPurchase3.salePrice,
        dateOfPurchase: partialPurchase3.dateOfPurchase,
        __customer: customer2._id,
        __staff: staff2._id,
        __inventory: in3._id
    };
});

module.exports={
    beforeAll,
    customer1, customer2, customer3,
    in1, in2, in3,
    staff1, staff2, staff3,
    pur, pur2, pur3, pur4,
}