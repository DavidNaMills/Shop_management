import {fetchAllStaff} from '../actions/staff';
import {setAlert} from '../actions/notification';
import {DANGER, SUCCESS} from '../../style/alert';
import {startLoader, endLoader} from '../actions/spinner';



import dummyStaff from '../DemoData/staff';
export const fetchStaff=()=>{
    return (dispatch, getState)=>{
        if(getState().auth.staff.name==='Dummy Account'){
            dispatch(startLoader());

            setTimeout(()=>{
                dispatch(fetchAllStaff(dummyStaff));
                dispatch(endLoader());
            }, 3000);
        }else{
            dispatch(fetchStaff_real());
        }
    }
}


export const fetchStaff_real=()=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/staff`,{
            headers: {
                'authorization': getState().auth.token
            }
        })
        .then(response=>response.json())
        .then((response)=>{
            if(response.err){
                if(response.err.errmsg){
                    dispatch(setAlert(response.err.errmsg, DANGER));
                } else{
                    dispatch(setAlert(response.err, DANGER));
                }
            } else{
                dispatch(fetchAllStaff(response));
            }

        })
        .then(()=>{dispatch(endLoader());})
        .catch(err=>dispatch(setAlert(err.errmsg, DANGER)));
    }
}


export const createStaff=(values)=>{
    return (dispatch, getState)=>{
        if(getState().auth.staff.name==='Dummy Account'){

            const x= Math.random() * (3 - 0) + 0;
            if(x===0){
                const y= Math.random() * (3 - 0) + 0;
                switch(y){
                    case 0:
                        dispatch(setAlert('DEMO_STAFF_EXISTS', DANGER));
                        return;
                    case 1:
                        dispatch(setAlert('DEMO_STAFF_INVALID_EMAIL', DANGER));
                        return;
                    default:
                        dispatch(setAlert('DEMO_STAFF_EMAIL_EXISTS', DANGER));
                        return;
                };
            }else{
                dispatch(setAlert('DEMO_STAFF_CREATED',SUCCESS));
            }

            dispatch(endLoader());


        }else{
            dispatch(createStaff_real(values));
        }
    }
}


export const createStaff_real=(values)=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/signup`,{
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().auth.token
            },
            body: JSON.stringify(values)
        }
        )
        .then(response=>response.json())
        .then(response=>{
            if(response.err){
                if(response.err.errmsg){
                    dispatch(setAlert(response.err.errmsg, DANGER));
                } else{
                    dispatch(setAlert(response.err, DANGER));
                }
                dispatch(endLoader());
            } else{
                dispatch(setAlert('staff_created', SUCCESS));
                dispatch(fetchStaff());
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch((err)=>{
            dispatch(endLoader());
            dispatch(setAlert(err.errmsg, DANGER))
        });
    }
}


export const updateLevel=(id, level)=>{
    return (dispatch, getState)=>{
        if(getState().auth.staff.name==='Dummy Account'){

            dispatch(startLoader());
            setTimeout(()=>{
                dispatch(setAlert('DEMO_STAFF_LEVEL', SUCCESS));
                dispatch(endLoader());
            }, 3000);

        }else{
            dispatch(createStaff_real(id, level));
        }
    }
}


export const updateLevel_real=(id, level)=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/staff`,{
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().auth.token,
            },
            body: JSON.stringify({id, data: {level}})
        }
        )
        .then(res=>res.json())
        .then(response=>{
            if(response.err){
                dispatch(endLoader());
                dispatch(setAlert(response.err, DANGER));
            } else{
                dispatch(setAlert('level_updated', SUCCESS));
                dispatch(fetchStaff());
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch((err)=>{
            dispatch(endLoader());
            dispatch(setAlert(err.errmsg, DANGER))
        });
    }
}


export const deleteStaffMember=(id)=>{
    return (dispatch, getState)=>{
        if(getState().auth.staff.name==='Dummy Account'){

            dispatch(startLoader());
            setTimeout(()=>{
                dispatch(setAlert('DEMO_STAFF_DELETED', SUCCESS));
                dispatch(endLoader());
            }, 3000);

        }else{
            dispatch(deleteStaffMember_real(id));
        }        
    }
}


export const deleteStaffMember_real=(id)=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/staff`,{
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().auth.token,
            },
            body: JSON.stringify({id})
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.err){
                dispatch(endLoader());
                dispatch(setAlert(response.err, DANGER));
            } else{
                dispatch(setAlert('staff_deleted',SUCCESS));
                dispatch(fetchStaff());
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch((err)=>{
            dispatch(endLoader());
            dispatch(setAlert(err.errmsg, DANGER))
        });
    }
}