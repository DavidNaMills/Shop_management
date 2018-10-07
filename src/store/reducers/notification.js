import {ALERT, RESET_ALERT} from '../actions/action_types/notifications';

const defaultState={msg:''};

export default (state=defaultState, action)=>{
    switch(action.type){
        case ALERT:
            return action.payload;
        case RESET_ALERT:
            return defaultState;
        default:
            return state;
    }
};