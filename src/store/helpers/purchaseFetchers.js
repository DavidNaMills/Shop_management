import {setAlert} from '../actions/notification';
import {DANGER, SUCCESS} from '../../style/alert';
import {completedPurchase} from '../actions/purchases';
import {startLoader, endLoader} from '../actions/spinner';
import {deductInventory, fetchInventory} from './inventoryFetchers';
import {updateCustomerTTL} from './customerFetchers';


export const createPurchases=({inven, customer, refNo})=>{
    return (dispatch)=>{
        dispatch(makePurchase(inven, customer, refNo));
        let ttl=0;
        inven.forEach((item)=>{
            dispatch(deductInventory({id:item._id, data: item.quantity}));
            ttl+=(item.quantity*item.price)
        });

        dispatch(updateCustomerTTL({id:customer._id, data: ttl}));
        dispatch(fetchInventory());
    }
}

const makePurchase=(inven, customer, refNo)=>{
    return (dispatch, getState)=>{
        dispatch(startLoader());
        return fetch(`/purchases`,{
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().staff.token,
            },
            body: JSON.stringify({
                inven,
                customer,
                refNo,
                __staff: getState().auth.staff._id,
            })
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
            } else {
                dispatch(completedPurchase());
                dispatch(setAlert('purchase_placed', SUCCESS));
            }
        })
        .then(()=>{dispatch(endLoader());})
        .catch((err)=>{
            dispatch(endLoader());
            dispatch(setAlert(err.errmsg, DANGER));
        });
    }
}