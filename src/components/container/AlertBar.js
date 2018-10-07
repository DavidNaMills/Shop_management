import React from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import AddLocale from '../../locales/Context';


class AlertBar extends React.Component{ 

    findMsg=(msg)=>{
        return this.props.locale.ALERTS.filter(x=>x===msg);
    }

    render(){
        const {msg, typ}=this.props.alert;
        const {locale} = this.props;
        return(
            <div>
            {msg&&
                <Alert bsStyle={typ}>
                    <p>
                        {locale.ALERTS[msg]}
                    </p>
                </Alert>
            }
            </div>
        );
    }

}

const mapStateToProps=(state)=>({
    alert : state.alert
});

export default connect(mapStateToProps)(AddLocale(AlertBar));