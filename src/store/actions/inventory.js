import {FETCH_INVENTORY} from './action_types/inventory';

export const fetchAllInventory = (payload)=>({
    type: FETCH_INVENTORY,
    payload
});