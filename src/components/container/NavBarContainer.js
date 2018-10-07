import React from 'react';
import {connect} from 'react-redux';

import NavBar from '../NavBar';

import {startLogout} from '../../store/actions/auth';

class NavBarContainer extends React.Component{ 

    render(){
        const {name, level} = this.props.user;
        return(
            <div>
                <NavBar logout={this.props.logout} name={name} level={level}/>
            </div>
        );
    }

}

const mapDispatchToProps=(dispatch)=>({
    logout: ()=>dispatch(startLogout())
})

const mapStateToProps=(state)=>({
    user: state.auth.staff,
    token: state.auth.token
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer);