import React from 'react';
import {
    HelpBlock, Form, FormControl, FormGroup, Col, Row, ControlLabel, Button, InputGroup, DropdownButton, MenuItem, ButtonToolbar
} from 'react-bootstrap';
import {validateEmail, validateName, validateUsername, validatePassword, confirmPassword} from '../validationFunctions/index';
import AddLocale from '../../locales/Context';

const DEFAULTSTATE= {
    name:'',
    level: 0,
    username:'',
    email:'',
    password:'',
    password2:'',

    nameF:false,
    emailF:false,
    userF:false,
    passF:false,
    passC:false,
    levelF: true
};

class StaffForm extends React.Component{ 
    state={
        name:'',
        level: 0,
        username:'',
        email:'',
        password:'',
        password2:'',

        nameF:false,
        emailF:false,
        userF:false,
        passF:false,
        passC:false,
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const {name, level, username, email, password} = this.state;

        if(this.fullValidation()){
            this.props.onSubmit({name, level, username, email, password});
        } else {
            alert('Fix your mistakes!');
        }

    }

    fullValidation=()=>{
        return validateName(this.state.name) &&
            validateEmail(this.state.email) &&
            validateUsername(this.state.username) &&
            validatePassword(this.state.password)?true:false;
    }

    validateLocalName=()=>{
        if(this.state.nameF){
            const con = validateName(this.state.name);
            return con?"success":"error";
        }else{
            return null;
        }
    }

    validateLocalEmail=()=>{
        if(this.state.emailF){
            const con = validateEmail(this.state.email);
            con&&this.setState({emailF:false});
            return con?"success":"error";
        }else{
            return null;
        }
    }

    validateLocalUsername=()=>{
        if(this.state.userF){
            const con= validateUsername(this.state.username);
            con&&this.setState({userF:false});
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

    confirmLocalPassword=()=>{
        const {password, password2}=this.state;

        if(this.state.passC && password2.length===0){
            return "error";
        }else if(this.state.passC){
            const con = confirmPassword(password, password2);
            con&&this.setState({passC:false});
            return con?"success":"error";
        }else{
            return null;
        }
    }

    clear=()=>{
        this.setState({...DEFAULTSTATE});
    }    

    render(){
        const {locale} = this.props;
        return(
        <div>
            <Form horizontal onSubmit={e=>this.onSubmit(e)}>
                <FormGroup controlId="formHorizontalName" validationState={this.validateLocalName()} onBlur={()=>this.setState({nameF:true})} onFocus={()=>this.setState({nameF:false})}>
                    <Col componentClass={ControlLabel} sm={2}>
                    {locale.staff.name}
                    </Col>
                    <Col sm={4}>
                    <FormControl type="Text" placeholder={locale.staff.name} value={this.state.name} onChange={val=>this.setState({name:val.target.value})}/>
                    {this.state.nameF && <HelpBlock>{locale.HELP.name}</HelpBlock>}
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Row>
                    <Col xs={2} smOffset={2}>
                        <ButtonToolbar>
                            <DropdownButton
                                componentClass={InputGroup.Button}
                                id="input-dropdown-addon"
                                title="Security Level"
                                key={this.state.level}
                                onSelect={(eventKey=>this.setState({level:eventKey}))}
                            >
                                {locale.staff.LEVEL.map((item, val)=><MenuItem eventKey={val} active>{item}</MenuItem>)}

                            </DropdownButton>
                        </ButtonToolbar>
                    </Col>
                    <Col xs={4} xsOffset={2} smOffset={0}>
                        <h5>{`${locale.commonInfo.selected} ${locale.staff.LEVEL[parseInt(this.state.level)]}`}</h5>
                    </Col>
                    </Row>
                </FormGroup>


                <FormGroup controlId="formHorizontalEmail" validationState={this.validateLocalEmail()} onBlur={()=>this.setState({emailF:true})}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {locale.staff.email}
                    </Col>
                    <Col sm={4}>
                    <FormControl type="Email" placeholder={locale.staff.email} value={this.state.email} onChange={val=>this.setState({email:val.target.value})}/>
                    {this.state.emailF && <HelpBlock>{locale.HELP.email}</HelpBlock>}
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalUsername" validationState={this.validateLocalUsername()} onBlur={()=>this.setState({userF:true})}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {locale.staff.username}
                    </Col>
                    <Col sm={4}>
                    <FormControl type="Username" placeholder={locale.staff.username} value={this.state.username} onChange={val=>this.setState({username:val.target.value})}/>
                    {this.state.userF && <HelpBlock>{locale.HELP.username}</HelpBlock>}
                    </Col>
                </FormGroup>
                
                <FormGroup controlId="formHorizontalPassword" validationState={this.validateLocalPassword()} onBlur={()=>this.setState({passF:true})}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {locale.staff.password}
                    </Col>
                    <Col sm={4}>
                    <FormControl type="Password" placeholder={locale.staff.password} value={this.state.password} onChange={val=>this.setState({password:val.target.value})}/>
                    {this.state.passF && <HelpBlock>{locale.HELP.password}</HelpBlock>}
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalConfirmPassword" validationState={this.confirmLocalPassword()} onBlur={()=>this.setState({passC:true})}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {locale.staff.repassword}
                    </Col>
                    <Col sm={4}>
                    <FormControl type="Password" placeholder={locale.staff.repassword} value={this.state.password2} onChange={val=>this.setState({password2:val.target.value})}/>
                    {this.state.passC && <HelpBlock>{locale.HELP.confirmPass}</HelpBlock>}
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Row>
                        <Col smOffset={2} sm={2}>
                            <Button type="submit" bsStyle="success" block>{locale.btns.submit}</Button>
                        </Col>
                        <Col sm={2}>
                            <Button bsStyle="warning" onClick={()=>this.clear()} block>{locale.btns.clear}</Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </div>
);
    }

}

export default AddLocale(StaffForm);