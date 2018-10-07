import {FETCH_STAFF} from '../actions/action_types/staff';

const defaultState= [];

export default (state=defaultState, action)=>{
    switch(action.type){
        case FETCH_STAFF:
            return action.payload;
        default:
            return state;
    }
}