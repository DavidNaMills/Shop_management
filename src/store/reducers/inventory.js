import {FETCH_INVENTORY} from '../actions/action_types/inventory';

const defaultState= [];

export default (state=defaultState, action)=>{
    switch(action.type){
        case FETCH_INVENTORY:
            return action.payload;
        default:
            return state;
    }
}