import {setAlert} from '../actions/notification';
import {fetchAllInventory} from '../actions/inventory';
import {startLoader, endLoader} from '../actions/spinner';
import { DANGER, SUCCESS } from '../../style/alert';


import dummyInventory from '../DemoData/inventory';
export const fetchInventory=()=>{
    return (dispatch, getState)=>{
        if(getState().auth.staff.name==='Dummy Account'){
            dispatch(startLoader());

            setTimeout(()=>{
                dispatch(fetchAllInventory(dummyInventory));
                dispatch(endLoader());
            }, 3000);
        }else{
            dispatch(fetchInventory_real());
        }
    }
};

export const fetchInventory_real=()=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/inventory`,{
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
            }else {
                const temp = response.sort((a, b)=>{
                    const x = a.quantity;
                    const y = b.quantity;
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
                dispatch(fetchAllInventory(temp));
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch((err)=>{
            dispatch(endLoader());
            dispatch(setAlert(err.errmsg, DANGER))
        });
    }
}




export const updateInventory=(data, id)=>{
    return (dispatch, getState)=>{
        if(getState().auth.staff.name==='Dummy Account'){
            dispatch(startLoader());

            setTimeout(()=>{
                dispatch(setAlert('DEMO_INVENTORY_UPDATED', SUCCESS));
                dispatch(endLoader());
            }, 3000);
        }else{
            dispatch(updateInventory_real(data, id));
        }  
    }
}

export const updateInventory_real=(data, id)=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/inventory`,{
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().auth.token
            },
            body: JSON.stringify({id, data: {...data}})
        }
        )
        .then(res=>res.json())
        .then(response=>{
            if(response.err){
                if(response.err.errmsg){
                    dispatch(setAlert(response.err.errmsg, DANGER));
                } else{
                    dispatch(setAlert(response.err, DANGER));
                }
                dispatch(endLoader());
            } else{
                dispatch(fetchInventory());
                dispatch(setAlert('inventory_updated', SUCCESS));
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch((err)=>{
            dispatch(endLoader());
            dispatch(setAlert(err.errmsg, DANGER));
        });
    }
}



export const addInventory=(values)=>{
    return (dispatch, getState)=>{
        if(getState().auth.staff.name==='Dummy Account'){
            dispatch(startLoader());

            setTimeout(()=>{
                dispatch(setAlert('DEMO_INVENTORY_ADDED', SUCCESS));
                dispatch(endLoader());
            }, 3000);
        }else{
            dispatch(addInventory_real(values));
        }        
    }
}

export const addInventory_real=(values)=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/inventory`,{
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().auth.token
            },
            body: JSON.stringify(values)
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.err){
                if(response.err.errmsg){
                    dispatch(setAlert(response.err.errmsg, DANGER));
                } else{
                    dispatch(setAlert(response.err, DANGER));
                }
                dispatch(endLoader());
            } else{
                dispatch(fetchInventory());
                dispatch(setAlert('inventory_added', SUCCESS));
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch(err=>{dispatch(endLoader());});
    }
}


export const deductInventory=(values)=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/inventory/decrease`,{
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().auth.token
            },
            body: JSON.stringify(values)
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.err){
                if(response.err.errmsg){
                    dispatch(setAlert(response.err.errmsg, DANGER));
                } else{
                    dispatch(setAlert(response.err, DANGER));
                }
                dispatch(endLoader());
            } else{
                dispatch(fetchInventory());
                dispatch(setAlert('inventory_added', SUCCESS));
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch(err=>{dispatch(endLoader());});
    }
}