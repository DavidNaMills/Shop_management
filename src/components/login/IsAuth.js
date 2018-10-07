import React from 'react';
import {connect} from 'react-redux';

const IsAuth = props =>(
        <div>
        {
            props.token && props.children
        }
        </div>
)

const mapStateToProps=(state)=>({
    token: state.auth.token
});

export default connect(mapStateToProps)(IsAuth);