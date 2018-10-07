require ('./testHelpers/setup');
const uuid = require('uuid');


const {createPurchase, updatePurchase, deletePurchase, searchPurchases} = require('../purchases');


const staffModel = require('../../models/staff');
const customerModel = require('../../models/customer');
const invenModel = require('../../models/inventory');
const purchaseModel = require('../../models/purchases');

const {cust1, cust2, cust3} = require('./testHelpers/customerTestData');
const {inven1, inven2, inven3} = require('./testHelpers/inventoryTestData');
const {partialPurchase1, partialPurchase2, partialPurchase3, partialPurchase4} = require('./testHelpers/purchasesTestData');
const {ud, ud2, ud3} = require('./testHelpers/staffTestData');


let customer1, customer2, customer3;
let in1, in2, in3;
let staff1, staff2, staff3;
let pur, pur2, pur3, pur4;

beforeAll(async()=>{
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
        ...partialPurchase1,
        __customer: customer1._id,
        __staff: staff1._id,
        __inventory: in1._id
    };
    pur2 = {
        ...partialPurchase2,
        __customer: customer2._id,
        __staff: staff1._id,
        __inventory: in3._id
    };
    pur3 = {
        ...partialPurchase3,
        __customer: customer3._id,
        __staff: staff2._id,
        __inventory: in1._id
    };
    pur4 = {
        ...partialPurchase3,
        __customer: customer2._id,
        __staff: staff2._id,
        __inventory: in3._id
    };
});




describe('Purchases', ()=>{
    
    describe('purchase: MAKE A PURCHASE', ()=>{
        test('should add a new purchase', async ()=>{
            const result = await createPurchase(pur);

            expect(result.salePrice).toEqual(pur.salePrice);
            expect(result.dateOfPurchase).toEqual(pur.dateOfPurchase);
            expect(result.__customer).toEqual(pur.__customer);
            expect(result.__staff).toEqual(pur.__staff);
            expect(result.__inventory).toEqual(pur.__inventory);
        });
    });

    describe('', ()=>{
        let tempPurchase;
        beforeEach(async()=>{
            const newPurchase = new purchaseModel({
                ...partialPurchase1,
                __customer: customer1._id,
                __staff: staff1._id,
                __inventory: in1._id
            });
            tempPurchase = await newPurchase.save()
                .then((item)=>{
                    if(!item){return('no item');}
                    return(item);
                })
                .catch(err=>{return(err)});
    
        })

        describe('purchase: AMEND', ()=>{
            test('should amend a purchase', async ()=>{
                const updates ={
                    totalPrice:999999,
                    __customer: customer3._id
                }
                const result = await updatePurchase(tempPurchase._id, updates);
                expect(result.salePrice).toEqual(updates.salePrice);
                expect(result.__customer).toEqual(updates.__customer);
            });
        });

            test('should delete a purchase', async ()=>{
                const id = tempPurchase._id;
                await deletePurchase(id);

                const result = await purchaseModel.findById(id)
                    .then((item)=>{
                        return item;
                    })
                    .catch((err)=>{
                        return err;
                    });
                
                    expect(result).toEqual(null);
            });

            test('No purchase to delete', async ()=>{
                const id = customer1._id;
                await expect(deletePurchase(id)).rejects.toThrowError('no_record_to_delete');
            });
    });

    describe('purchases: SEARCH', ()=>{
        let purc1, purc2, purc3, purc4;
        beforeEach(async ()=>{
            await purchaseModel.remove({});
            const t1 = new purchaseModel({invoiceNo:uuid(),...pur});
            const t2 = new purchaseModel({invoiceNo:uuid(),...pur2});
            const t3 = new purchaseModel({invoiceNo:uuid(),...pur3});
            const t4 = new purchaseModel({invoiceNo:uuid(),...pur4});
            purc1 = await t1.save().then((item)=>{return(item);})
            purc2 = await t2.save().then((item)=>{return(item);})
            purc3 = await t3.save().then((item)=>{return(item);})
            purc4 = await t4.save().then((item)=>{return(item);})
        });

        test('should return found items (1)', async()=>{
            const criteria={
                __customer: customer1._id
            };
            const results = await searchPurchases(criteria);
            expect(results.length).toEqual(1);
        });

        test('should return found items (2)', async()=>{
            const criteria={
                __customer: customer2._id,
                __inventory: in3._id
            };
            const results = await searchPurchases(criteria);
            expect(results.length).toEqual(2);
        });

        test('should return found items (3)', async()=>{
            const criteria={
                __staff: staff2._id,
                __customer: customer2._id
            };
            const results = await searchPurchases(criteria);
            expect(results.length).toEqual(1);
        });

    })
});