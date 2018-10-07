import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';


const AuthRoute = ({Component, path, auth}) =>{
    return (
        <Route path={path} render={()=>
                auth.token ?
                <Component /> :
                <Redirect to={{pathname:'/'}} />
        } />
    )
};

const mapStateToProps=(state)=>({
    auth: state.auth
});

export default connect(mapStateToProps)(AuthRoute);