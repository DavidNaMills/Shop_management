import mongoose from 'mongoose';
import { rejects } from 'assert';

require('./testHelpers/setup');
const staff = require('../../models/staff');
const {findStaff, addStaff, loginStaff, deleteStaff, updateStaff} = require('../staff');
const {ud, ud2} = require('./testHelpers/staffTestData');


beforeAll(() => {
    mongoose.connect("mongodb://localhost:27017/developDb", { useNewUrlParser: true });
});

afterAll((done) => {
    mongoose.disconnect(done);
});

describe('staff database functions', ()=>{

    beforeEach(async()=>{
            await staff.remove({});
    })

    test('canary test', ()=>{
        expect(true).toEqual(true);
    });


    describe('staff: CREATION', ()=>{

        test('new member of staff is created with all values', async ()=>{
            expect.assertions(4);
              const result = await addStaff(ud);
              expect(result.name).toBe(ud.name);
              expect(result.username).toBe(ud.username);
              expect(typeof(result.password)).toBe('string');

              const x =await staff.find({name: ud.name});
              expect(x.length).toEqual(1);
            // });

        });

        test('default settings are set', async ()=>{
            const result = await addStaff(ud2);
            expect(result.level).toBe(0);
        });
    });

    describe('staff: SEARCHING', ()=>{
        beforeEach(async ()=>{
            await staff.remove({});
            await addStaff(ud);
        });

        test('returns the correct user based on username and password', async ()=>{
            const result = await loginStaff(ud.username, ud.password);
             expect(result.username).toEqual(ud.username);
             expect(result.email).toEqual(ud.email);
        });
    });

    describe('staff: DELETING', ()=>{
        let tempStaff;
        beforeEach(async ()=>{
            tempStaff = await addStaff(ud);
        });
        test('deletes a staff member', async ()=>{
            const result = await deleteStaff(tempStaff._id);
            
            const allRecords = await staff.find({_id: tempStaff._id});
            expect(allRecords.length).toBe(0);
        });
    });

    describe('staff: UPDATING', ()=>{
        let temp;
        beforeEach(async ()=>{
            temp = await addStaff(ud);
        });

        const toUpdate1 = {
            name:'michaela',
            language: 'russian',
            level: 33,         
        }

        const toUpdate3 = {
            name:'michaela',
            level: 33,
            username: "nonfu_spring",
            password:"fgds123456789",
            email: '123456789@fsdafcasd.com'           
        }

        test('updates staff details', async ()=>{
            const result = await updateStaff(temp._id, toUpdate1);
            expect(result.name).toEqual(toUpdate1.name);
            expect(result.level).toEqual(toUpdate1.level);
        });

        test('updates all staff details', async ()=>{
            const result = await updateStaff(temp._id, toUpdate3);
            expect(result.name).toEqual(toUpdate3.name);
            expect(result.level).toEqual(toUpdate3.level);
            expect(result.username).toEqual(toUpdate3.username);
            expect(result.password).toEqual(toUpdate3.password);
            expect(result.email).toEqual(toUpdate3.email);
        });
    });

    describe('LOGIN staff', ()=>{
        beforeEach(async()=>{
            await staff.remove({});
        });
        
        test('should log user in successfully', async ()=>{
            const temp = await addStaff(ud);
            const result = await loginStaff(ud.username, ud.password);
            expect(result.name).toEqual(ud.name);
            expect(result.email).toEqual(ud.email);
        });
        
        test('should not log user in', async()=>{
            await addStaff(ud);
            await expect(loginStaff(ud.username, 'fdsafdsa'))
            .rejects.toThrowError('password_mismatch');
        });

        test('should fail as no user is found', async()=>{
            await addStaff(ud);
            await expect(loginStaff('ud.username', 'fdsafdsa'))
            .rejects.toThrowError('no_user');
        });
        
        test('user is inactive', async()=>{
            await addStaff(ud2);
            await expect(loginStaff(ud2.username, ud2.password)).rejects.toThrow("not_active");
        });

        test('should return all staff', async ()=>{
            await addStaff(ud);
            await addStaff(ud2);

            const criteria={};
            const result = await findStaff(criteria);
            expect(result.length).toBe(2);
        });

        test('should return all inactive staff', async ()=>{
            await addStaff(ud);
            await addStaff(ud2);

            const criteria={'active':false};
            const result = await findStaff(criteria);
            expect(result.length).toBe(1);
            expect(result[0].username).toEqual(ud2.username);
        });
    });

});