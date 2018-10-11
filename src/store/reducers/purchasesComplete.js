import {COMPLETED, RESET} from '../actions/action_types/purchases';

const defaultState={completed:false};

export default (state=defaultState, action)=>{
    switch(action.type){
        case COMPLETED:
            return {completed:true};
        case RESET:
            return defaultState;
        default:
            return state;
    }
}