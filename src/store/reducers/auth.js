import {LOGIN, LOGOUT} from '../actions/action_types/auth';

const defaultState = {};

export default (state=defaultState, action)=>{
    switch(action.type){
        case LOGIN:
            const newState=action.payload;
            return newState;
        case LOGOUT:
            return defaultState;
        default:
            return state;
    }
}