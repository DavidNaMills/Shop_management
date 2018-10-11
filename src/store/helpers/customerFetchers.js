import {setAlert} from '../actions/notification';
import {fetchAllCustomers} from '../actions/customers';
import {startLoader, endLoader} from '../actions/spinner';
import { DANGER, SUCCESS } from '../../style/alert';

export const fetchCustomers=()=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/customer/all`,{
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
                dispatch(endLoader());
            } else{
                dispatch(fetchAllCustomers(response));
            }

        })
        .then(()=>{dispatch(endLoader());})
        .catch((err)=>{
            dispatch(setAlert(err.errmsg, DANGER));
            dispatch(endLoader());
        });
    }
}

export const createCustomer=(values)=>{
    return (dispatch,getState)=>{
        dispatch(startLoader());
        return fetch(`/customer`,{
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().auth.token,
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
            } else{
                dispatch(fetchCustomers());
                dispatch(setAlert('customer_added',SUCCESS));
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch(err=>{dispatch(endLoader());}); 
    }
};


export const updateCustomerTTL=(values)=>{
    return (dispatch,getState)=>{
        dispatch(startLoader());
        return fetch(`/customer/total`,{
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().auth.token,
            },
            body: JSON.stringify(values)
        }
        )
        .then(response=>response.json())
        .then(response=>{
            if(response.err){
                dispatch(endLoader());
                if(response.err.errmsg){
                    dispatch(setAlert(response.err.errmsg, DANGER));
                } else{
                    dispatch(setAlert(response.err, DANGER));
                }
            } else{
                dispatch(fetchCustomers());
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch(err=>{dispatch(endLoader());}); 
    }
};