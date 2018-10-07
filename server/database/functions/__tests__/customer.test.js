require('./testHelpers/setup');
const customer = require('../../models/customer');
const {createCustomer, deleteCustomer, updateCustomer, searchCustomer} = require('../customer');
const {cust1, cust2} = require('./testHelpers/customerTestData');


beforeEach(async ()=>{
    await customer.remove({});
});


const fail={
    name: "david",
    dob: "13/02/1983",
    sex: false,
    phone: "1321321321321",
    address: "123 elsewhere street",
    email: "rewqrewqrewq@fdsa.com",
    wechat: "mini_einstein",
    customerType: 3
}

describe('customer database functions', ()=>{
    describe('customer: CREATE',  ()=>{
        test('creates a new customer', async()=>{
           const result = await createCustomer(cust1);
           
           expect(result.name).toEqual(cust1.name);
           expect(result.sex).toEqual(cust1.sex);
           expect(result.email).toEqual(cust1.email);
           expect(result.customerType).toEqual(cust1.customerType);
        });

        test('Validation error: fails to add a new customer', async()=>{
           const result = await expect(createCustomer({
                name: "david",
                dob: "13/02/1983",
                sex: false
            })).rejects.toThrowError();
        });
    });
    
    describe('customer: DELETE', ()=>{
        let newCust;

        beforeEach(async ()=>{
            newCust = new customer(cust1);
            await newCust.save().catch(err=>console.log(err));
        });

        test('should delete a customer', async ()=>{
            const temp = await customer.findOne({name:cust1.name})
            .then((doc)=>{return doc;});
            
            expect(temp.name).toEqual(cust1.name);
            
            const del = await deleteCustomer(temp._id).then((doc)=>{return doc;});
            const noFind = await customer.findOne({name:cust1.name})
                .then((result)=>{return result;});

            expect(del.name).toEqual(cust1.name);
            expect(noFind).toEqual(null);
        });

        test('customer not present', async ()=>{
            const temp = await customer.findOne({name:cust1.name})
            .then((doc)=>{return doc;});
            
            expect(temp.name).toEqual(cust1.name);
            await expect(deleteCustomer(cust2._id)).rejects.toThrowError('customer_not_found');
        });

        test('invalid id', async ()=>{
            const temp = await customer.findOne({name:cust1.name})
            .then((doc)=>{return doc;});
            
            expect(temp.name).toEqual(cust1.name);
            await expect(deleteCustomer('dsadsa')).rejects.toThrowError('');
        });
    });
    
    describe('customer: UPDATE', ()=>{
        beforeEach(async()=>{
            const newCust = new customer(cust1);
            await newCust.save().catch(err=>console.log(err));
        })
        test('should update a customer', async ()=>{
            const temp = await customer.findOne({name:cust1.name})
                .then((doc)=>{return doc;});
            expect(temp.name).toEqual(cust1.name);

            const result = await updateCustomer(temp._id, cust2);

            expect(result.name).toEqual(cust2.name);
            expect(result.phone).toEqual(cust2.phone);
            expect(result.address).toEqual(cust2.address);
            expect(result.email).toEqual(cust2.email);
            expect(result.wechat).toEqual(cust2.wechat);
            expect(result.customerType).toEqual(cust2.customerType);
        });


        test('should not update the record as ID is invalid', async ()=>{
            const id = '5b207201fef43';
            await expect(updateCustomer(id, cust2)).rejects.toThrowError('');
        });

        test('should not update the record as ID is invalid', async ()=>{
            const id = cust2._id;
            await expect(updateCustomer(id, cust2)).rejects.toThrowError('customer_not_found');
        });


    });
    
    describe('customers: SEARCH', ()=>{
        beforeEach(async()=>{
            const newCust = new customer(cust1);
            const newCust2 = new customer(cust2);
            await newCust.save().catch(err=>console.log(err));
            await newCust2.save().catch(err=>console.log(err));
        })

        test('should return the correct ', async ()=>{
            const searchCriteria={
                name:cust1.name
            };

            const results = await searchCustomer(searchCriteria);
            expect(results.length).toEqual(2);
        });

        test('should throw error invalid criteria', async ()=>{
            const searchCriteria={
                test:cust1.name,
            };
            const result = await searchCustomer(searchCriteria).then((res)=>{return res});
            await expect(result.length).toEqual(0);
        });
    });
});


