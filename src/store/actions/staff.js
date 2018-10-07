import {FETCH_STAFF} from './action_types/staff';

export const fetchAllStaff=(payload)=>({
    type: FETCH_STAFF,
    payload
});