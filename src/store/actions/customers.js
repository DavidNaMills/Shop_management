import {FETCH_CUSTOMERS} from './action_types/customers';

export const fetchAllCustomers=(payload)=>({
    type: FETCH_CUSTOMERS,
    payload
})