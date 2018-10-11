import {START_LOADER, STOP_LOADER} from '../actions/action_types/spinner';

const defaultState = {isLoading: false};

export default (state=defaultState, action)=>{
    switch(action.type){
        case START_LOADER:
            const x={isLoading:true}
            return x;
        case STOP_LOADER:
            return {isLoading:false};
        default:
            return state;
    }
}