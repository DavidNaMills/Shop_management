import {ALERT, RESET_ALERT} from './action_types/notifications';

export const setAlert=(msg, typ)=>{
    return (dispatch)=>{
        dispatch(SetTheAlert({msg, typ}));
        setTimeout(()=>{
            dispatch(resetAlert());
        }, 10000);
    }
};

const SetTheAlert=(msg)=>({
    type: ALERT,
    payload: {...msg}
});


const resetAlert=()=>({
    type: RESET_ALERT
});