import {fetchAllStaff} from '../actions/staff';
import {setAlert} from '../actions/notification';
import {DANGER, SUCCESS} from '../../style/alert';

export const fetchStaff=()=>{
    return (dispatch, getState)=>{
        return fetch(`/staff/all`,{
            headers:{
                'authorization': getState().auth.token
            }
        })
        .then(res=>{
            const test = JSON.parse(res);
            console.log(test); return test;
        })
        // .then(response=>response.json())
        .then(response=>{
            if(response.err){
                console.log(response.err);
                if(response.err.errmsg){
                    dispatch(setAlert(response.err.errmsg, DANGER));
                } else{
                    dispatch(setAlert(response.err, DANGER));
                }
            } else{

                dispatch(fetchAllStaff(response));
            }
        })
        .catch((err)=>{
            console.log(err);
            dispatch(setAlert(err, DANGER))
        });
    }
}

export const createStaff=(values)=>{
    console.log('in createStaff');
    return (dispatch, getState)=>{
        console.log('just before signup');
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
        .then(response=>console.log(response.json()))
        .then(response=>response.json())
        .then(response=>{
            if(response.err){
                if(response.err.errmsg){
                    dispatch(setAlert(response.err.errmsg, DANGER));
                } else{
                    dispatch(setAlert(response.err, DANGER));
                }
            } else{
                dispatch(setAlert('staff_created', SUCCESS));
                dispatch(fetchStaff());
            }
        })
        .catch((err)=>{
            dispatch(setAlert(err.errmsg, DANGER))
        });
    }
}

export const updateLevel=(id, level)=>{
    return (dispatch, getState)=>{
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
                dispatch(setAlert(response.err, DANGER));
            } else{
                dispatch(setAlert('level_updated', SUCCESS));
                dispatch(fetchStaff());
            }
        })
        .catch(err=>dispatch(setAlert(err.errmsg, DANGER)));
    }
}

export const deleteStaffMember=(id)=>{
    return (dispatch, getState)=>{
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
                dispatch(setAlert(response.err, DANGER));
            } else{
                dispatch(setAlert('staff_deleted',SUCCESS));
                dispatch(fetchStaff());
            }
        })
        .catch(err=>dispatch(setAlert(err.errmsg, DANGER)));
    }
}