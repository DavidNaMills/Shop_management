import {setAlert} from '../actions/notification';
import {fetchAllCustomers} from '../actions/customers';
import {startLoader, endLoader} from '../actions/spinner';
import { DANGER, SUCCESS } from '../../style/alert';



import dummyCustomer from '../DemoData/customers';

export const fetchCustomers=()=>{
    return (dispatch, getState)=>{
        if(getState().auth.staff.name==='Dummy Account'){
            dispatch(startLoader());

            setTimeout(()=>{
                dispatch(fetchAllCustomers(dummyCustomer));
                dispatch(endLoader());
            }, 3000);


        } else {
            dispatch(fetchCustomers_real());
        }
    };
};


export const fetchCustomers_real=()=>{
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
    return (dispatch, getState)=>{
        if(getState().auth.staff.name==='Dummy Account'){

            const x= Math.random() * (3 - 0) + 0;
            if(x===0){
                const y= Math.random() * (3 - 0) + 0;
                switch(y){
                    case 0:
                        dispatch(setAlert('DEMO_CUSTOMER_EXISTS', DANGER));
                        return;
                    case 1:
                        dispatch(setAlert('DEMO_INVALID_EMAIL', DANGER));
                        return;
                    default:
                        dispatch(setAlert('DEMO_EMAIL_EXISTS', DANGER));
                        return;
                };
            }else{
                dispatch(setAlert('DEMO_CUSTOMER_ADDED',SUCCESS));
            }

            dispatch(endLoader());

        } else {
            dispatch(fetchCustomers_real(values));
        }
    };
};

export const createCustomer_real=(values)=>{
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