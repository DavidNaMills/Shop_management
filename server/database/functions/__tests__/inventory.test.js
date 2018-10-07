require('./testHelpers/setup');
const moment = require('moment');
const invenModel = require('../../models/inventory');
const {addInventory, deleteInventory, deductQuantity, 
    increaseQuantity, updateInventory, getAllInventory,
    searchInventory
} = require('../../functions/inventory');
const {inven1, inven2, inven3, invenFail} = require('./testHelpers/inventoryTestData');


describe('Inventory Tests', ()=>{
    beforeEach(async ()=>{
        await invenModel.remove({});
    });

    describe('inventory: ADD', ()=>{
        beforeEach(async ()=>{
            await invenModel.remove({});
        });

        test('should add an item', async ()=>{
            expect.assertions(2);
            const result = await addInventory(inven1);
            
            expect(result.name).toEqual(inven1.name);
            expect(result.retailPrice).toEqual(inven1.retailPrice);
        });

        
        test('should add an item without a description', async ()=>{
            const result = await addInventory(inven2);
            
            expect(result.name).toEqual(inven2.name);
            expect(result.retailPrice).toEqual(inven2.retailPrice);
            expect(result.description).toEqual("");
        });

        // test('insertion error', async ()=>{
        //     await expect(addInventory({})).reject.toThrowError('Error_code_1');
        // });
    });

    describe('inventory: DELTETE', ()=>{
        test('should update an inventory', async ()=>{
            const newInven = new invenModel(inven1);
            const newInven2 = new invenModel(inven2);
            const testInven2 = await newInven.save();
            const testInven = await newInven.save()
                .then((inven)=>{
                    if(!inven){return(null);}
                    return(inven);
                })
                .catch(err=>reject(err));
            
            await deleteInventory(testInven._id);

            const result = await invenModel.findOne({_id:testInven._id});
            expect(result).toEqual(null);
        });

        test('throws generic error', async ()=>{
            const newInven = new invenModel(inven1);
            const testInven = await newInven.save()
                .then((inven)=>{
                    if(!inven){return(null);}
                    return(inven);
                })
                .catch(err=>reject(err));
            
            expect(deleteInventory('321312321312')).rejects.toThrowError('inventory_not_deleted');
        });



    });

    describe('inventory: DEDUCT/INCREASE', ()=>{
        test('should deduct an amount from the inventory', async ()=>{
            const ddq = 5;
            const newInven = new invenModel(inven1);
            const testInven = await newInven.save()
                .then((inven)=>{
                    if(!inven){return(null);}
                    return(inven);
                })
                .catch(err=>reject(err));
            expect(testInven.quantity).toEqual(inven1.quantity);

            const result = await deductQuantity(testInven._id, ddq);
            expect(result.quantity).toBe(inven1.quantity-ddq);
        });

        test('should throw error_code_1 error DEDUCT', async ()=>{
            const ddq = 5;
            const newInven = new invenModel(inven1);
            const testInven = await newInven.save()
                .then((inven)=>{
                    if(!inven){return(null);}
                    return(inven);
                })
                .catch(err=>reject(err));
            expect(testInven.quantity).toEqual(inven1.quantity);

            expect(deductQuantity(12345678, ddq)).rejects.toThrowError('error_code_1');
        });



        test('should increase the quantity', async ()=>{
            const ddq = 5;
            const newInven = new invenModel(inven1);
            const testInven = await newInven.save()
                .then((inven)=>{
                    if(!inven){return(null);}
                    return(inven);
                })
                .catch(err=>reject(err));
            expect(testInven.quantity).toEqual(inven1.quantity);

            const result = await increaseQuantity(testInven._id, ddq);
            expect(result.quantity).toBe(inven1.quantity+ddq);
        });

        test('should throw error_code_1 error INCREMENT', async ()=>{
            const ddq = 5;
            const newInven = new invenModel(inven1);
            const testInven = await newInven.save()
                .then((inven)=>{
                    if(!inven){return(null);}
                    return(inven);
                })
                .catch(err=>reject(err));
            expect(testInven.quantity).toEqual(inven1.quantity);

            expect(increaseQuantity(12345678, ddq)).rejects.toThrowError('error_code_1');
        });
    });

    describe('inventory: UPDATE', ()=>{
        test('should update the inventory', async()=>{
            const newInven = new invenModel(inven1);
            const testInven = await newInven.save()
                .then((inven)=>{
                    if(!inven){return(null);}
                    return(inven);
                })
                .catch(err=>reject(err));
            
            const result = await updateInventory(testInven._id, inven2);

            expect(result.name).toEqual(inven2.name);
            expect(result.quantity).toEqual(inven2.quantity);
            expect(result.retailPrice).toEqual(inven2.retailPrice);
            expect(result.supplierName).toEqual(inven2.supplierName);
        });
    });

    describe('inventory:SEARCH', ()=>{
        beforeEach(async()=>{
            const newInven1 = new invenModel(inven1);
            const newInven2 = new invenModel(inven2);
            const newInven3 = new invenModel(inven3);
            
            await newInven1.save();
            await newInven2.save();
            await newInven3.save();
        });

        afterEach(async()=>{
            invenModel.remove({});
        })

        test('should return all items', async ()=>{
            const results  = await getAllInventory();
            expect(results.length).toEqual(3);
        });

        test('should return an array of matching items: productType', async ()=>{
            const criteria={
                productType: "food"
            };

            const results = await searchInventory(criteria);
            expect(results.length).toEqual(2);
        });
        
        test('should return an array of matching items: productType & supplier name', async ()=>{
            const criteria={
                productType: "drink",
                supplierName: inven2.supplierName,
            };

            const results = await searchInventory(criteria);
            expect(results.length).toEqual(1);
            expect(results[0].supplierName).toEqual(inven2.supplierName);
        });
    })
});