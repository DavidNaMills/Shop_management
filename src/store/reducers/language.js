import {CHNG_LANG} from '../actions/action_types/language';



const defaultState = {lan: 'en'};

export default (state=defaultState, action)=>{
    switch(action.type){
        case CHNG_LANG:
            return {lan:action.payload}
        default:
            return state;
    }
}