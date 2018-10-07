import React from 'react';
import {connect} from 'react-redux';
import {FormControl, FormGroup, Button, HelpBlock, Col, Row} from 'react-bootstrap';
import {validateUsername, validatePassword} from '../validationFunctions/index';
import {startLogin} from '../../store/actions/auth';
import AddLocale from '../../locales/Context';


const DEFAULTS={
    username: '',
    password: '',
    isUsername: true,

    userF:false,
    passF:false,
    displayBtn:false    
};

class Login extends React.Component{ 
    state={
        username: '',
        password: '',
        isUsername: true,

        userF:false,
        passF:false,
        displayBtn:false
    };

    validateLocalUsername=()=>{
    if(this.state.userF){
            if(this.state.username.length>8){
                this.setState({displayBtn:true});
            }
            const con= validateUsername(this.state.username);
            con&&this.setState({userF:false, displayBtn:true});
            return con?"success":"error";
        }else{
            return null;
        }
    }
    
    validateLocalPassword=()=>{
        /**
         * 1 + lowercase
         * 1 + uppercase
         * 1 + number
         * 1 + !@#$%^&*
         * least 8 characters long
         */
        if(this.state.passF){
            const con = validatePassword(this.state.password);
            con&&this.setState({passF:false});
            return con?"success":"error";
        }else{
            return null;
        }
    }

    userChange=val=>{
        this.setState({
            username:val.target.value
        }, ()=>{
            this.setState({displayBtn: validateUsername(this.state.username)});
        });
    };

    passChange=val=>{
        this.setState({
            password:val.target.value
        }, ()=>{
            this.setState({displayBtn: validatePassword(this.state.password)});
        });
    };

    displayUsername = ()=>(
            <div>
                <h1>ShangNaDavid</h1>
                <h2>{this.props.locale.staff.username}</h2>
                <form>
                    <FormGroup controlId="formHorizontalUsername" validationState={this.validateLocalUsername()} onBlur={()=>this.setState({userF:true})}>
                        <Row>
                            <Col sm={4}>
                                <FormControl type="Username" placeholder={this.props.locale.staff.username} value={this.state.username} onChange={val=>this.userChange(val)}/>
                                {this.state.userF && <HelpBlock>{this.props.locale.HELP.username}</HelpBlock>}
                            </Col>
                        </Row>
                    </FormGroup>
                </form>                
            </div>
        )

    displayPassword = ()=>(
            <div>
                <h2>{this.props.locale.staff.password}</h2>
                <form>
                    <FormGroup controlId="formHorizontalPassword" validationState={this.validateLocalPassword()} onBlur={()=>this.setState({passF:true})}>
                        <Row>
                            <Col sm={4}>
                                <FormControl type="Password" placeholder={this.props.locale.staff.password} value={this.state.password} onChange={val=>this.passChange(val)}/>
                                {this.state.passF && <HelpBlock>{this.props.locale.HELP.password}</HelpBlock>}
                            </Col>
                        </Row>
                    </FormGroup>
                </form>                
            </div>
        )


    btnOnClick=()=>{
        if(this.state.isUsername){
            this.setState({isUsername:false, displayBtn:false, userF:false, passF:false,});
        }else{
            this.props.startLogin(this.state.username, this.state.password);
        }
    }

    cancel=()=>{
        this.setState({
            ...DEFAULTS
        })
    }

    render(){
        return(
            <div className="container"><Row>
                {this.state.isUsername? this.displayUsername() : this.displayPassword()}
                {this.state.displayBtn &&
                    <div>
                        <Row>
                            <Col sm={4}>
                                <Button bsStyle="info" onClick={()=>{this.btnOnClick()}} block>
                                    Next
                                </Button>
                            </Col>
                        </Row>
                    </div>
                }
                </Row>
                <Row>
                <Col sm={4}>
                    <br/>
                    <Button bsStyle="warning" onClick={()=>{this.cancel()}} block>
                        Cancel
                    </Button>
                </Col>
                </Row>
            </div>
        );
    }
};

const mapDispatchToProps=(dispatch)=>({
    startLogin : (username, password)=>dispatch(startLogin(username, password))
});

// export default Login;
export default connect(undefined, mapDispatchToProps)(AddLocale(Login));