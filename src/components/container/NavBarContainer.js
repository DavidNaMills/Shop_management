import React from 'react';
import {connect} from 'react-redux';

import NavBar from '../NavBar';

import {startLogout} from '../../store/actions/auth';
import {changeLanguage} from '../../store/actions/language';

class NavBarContainer extends React.Component{ 

    changeLocale=(lan)=>{
        console.log(lan);
        this.props.locale(lan);
    }

    render(){
        return(
            <div style={{marginBottom:'2vh'}}>
                <NavBar changeLanguage={this.changeLocale} logout={this.props.logout} user={this.props.user}/>
            </div>
        );
    }

}

const mapDispatchToProps=(dispatch, props)=>({
    logout: ()=>dispatch(startLogout()),
    locale: (lan)=>dispatch(changeLanguage(lan))
})

const mapStateToProps=(state)=>({
    user: state.auth.staff,
    token: state.auth.token
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer);