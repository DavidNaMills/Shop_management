import {LOGIN, LOGOUT} from './action_types/auth';
import {setAlert} from './notification';
import history from '../../components/history';
import { DANGER } from '../../style/alert';

// const URL = 'http://localhost:5000';

const login=(data)=>({
    type: LOGIN,
    payload: data
});

export const startLogin=(username, password)=>{
    return (dispatch)=>{
        fetch(`/login`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                crossdomain: true,
                body: JSON.stringify({username, password})
            }
        ).then(response=>{
            if(response.status===401){
                dispatch(setAlert('unauthorised', DANGER));
                history.replace('/');
            }else{
                return response;
            }
        })
        .then(response=>response.json())
        .then(response=>{
            dispatch(login(response));
        })
        .then(()=>history.replace('/dashboard'))
        .catch((err)=>{});
    }
};


const logout=()=>({
    type:LOGOUT
});

export const startLogout=()=>{
    return(dispatch)=>{
        dispatch(logout());
    };
}

// 401 unauthorised