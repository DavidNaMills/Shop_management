import {setAlert} from '../actions/notification';
import {fetchAllCustomers} from '../actions/customers';
import { DANGER, SUCCESS } from '../../style/alert';

export const fetchCustomers=()=>{
    return (dispatch, getState)=>{
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
            } else{
                dispatch(fetchAllCustomers(response));
            }

        })
        .catch(err=>dispatch(setAlert(err.errmsg, DANGER)));
    }
}

export const createCustomer=(values)=>{
    return (dispatch,getState)=>{
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
        .catch(err=>{}); 
    }
};