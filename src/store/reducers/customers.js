import {FETCH_CUSTOMERS} from '../actions/action_types/customers';

const defaultState= [];

export default (state=defaultState, action)=>{
    switch(action.type){
        case FETCH_CUSTOMERS:
            return action.payload;
        default:
            return state;
    }
}