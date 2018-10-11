import {fetchAllStaff} from '../actions/staff';
import {setAlert} from '../actions/notification';
import {DANGER, SUCCESS} from '../../style/alert';
import {startLoader, endLoader} from '../actions/spinner';

export const fetchStaff=()=>{
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