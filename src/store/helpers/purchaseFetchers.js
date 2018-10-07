import {setAlert} from '../actions/notification';
import {DANGER, SUCCESS} from '../../style/alert';


const purchaseCall=(data)=>{
    return (dispatch, getState)=>{
        return fetch(`/purchases`,{
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getState().auth.token,
            },
            body: JSON.stringify(data)
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
            }
        })
        .catch(err=>dispatch(setAlert(err.errmsg, DANGER)));
    }
}

export const createPurchases=(inven, customer, staff, refNo)=>{
    return (dispatch)=>{
        let result=true;
        return new Promise((resolve, reject)=>{
            inven.forEach((item)=>{
                const data= {
                    invoiceNo: refNo,
                    totalPrice: (+item.quantity*+item.price),
                    unitPrice: item.price,
                    quantity: item.quantity,
                    dateOfPurchase: new Date(),
                    __customer: customer._id,
                    __staff: staff._id,
                    __inventory: item._id
                };
                
                purchaseCall(data);
            });
            
            if(result){
                dispatch(setAlert('purchase_placed', SUCCESS));
                resolve();
            }else{
                dispatch(setAlert('Purchase_not_placed', DANGER));
                reject();
            }
        })
    }
}