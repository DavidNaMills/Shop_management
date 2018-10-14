import React from 'react';
import {
    Form, FormControl, FormGroup, Col,ControlLabel, Button, HelpBlock, Row, Radio
} from 'react-bootstrap';

import {validateEmail, validateName, validatePhone, validateUsername} from '../validationFunctions/index';
import AddLocale from '../../locales/Context';

import {MONTHS} from '../defaultStates';

const DEFAULTSTATE ={
    name: '',
    email: '',
    phone: '',
    wechat:'',
    dob:'',
    sex: true,     //true=male, false=female
    address:'',
    type: 0,

    day:1,
    month:0,
    year:1945,

    nameF: false,
    emailF: false,
    phoneF: false,
    wechatF: false,
    addF: false
    
}

class CustomerForm extends React.Component{ 
    state={
        name: '',
        email: '',
        phone: '',
        wechat:'',
        dob:'',
        sex: true,     //true=male, false=female
        address:'',
        type: 0,

        day:1,
        month:0,
        year:1945,
    
        nameF: false,
        emailF: false,
        phoneF: false,
        wechatF: false,
        addF: false
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const {name, email, phone, wechat, type, sex, address, day, month, year} = this.state;

        if(this.fullValidation()){
            const dob = new Date(year, month, day);
            this.props.onSubmit({name, email, phone, wechat, type, dob, sex, address});
        } else {
            alert('Fix your mistakes!');
        }
    }

    fullValidation=()=>{
        return validateName(this.state.name)&&
        validateName(this.state.wechat)&&
        validateEmail(this.state.email)&&
        validatePhone(this.state.phone)? true:false;
    }

    validateLocalName=()=>{
        if(this.state.nameF){
            const con = validateName(this.state.name);
            con&&this.setState({nameF:false});
            return con?"success":"error";
        }else{
            return null;
        }
    }

    validateLocalWechat=()=>{
        if(this.state.wechatF){
            const con = validateName(this.state.wechat);
            con&&this.setState({wechatF:false});
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

    validateLocalAddress=()=>{
        if(this.state.addF){
            const con = validateUsername(this.state.address);
            con&&this.setState({addF:false});
            return con?"success":"error";
        }else{
            return null;
        }      
    }
    validateLocalPhone=()=>{
        if(this.state.phoneF){
            const con = validatePhone(this.state.phone);
            con&&this.setState({phoneF:false});
            return con?"success":"error";
        }else{
            return null;
        }      
    }

    clear=()=>{
        this.setState({...DEFAULTSTATE});
    }  

    calculateDays=()=>{
        const {month}=this.state;
        const thirty = [3, 5, 8, 10];
        const thirty1= [0, 2, 4, 6, 7, 9, 11];
        let limit=0;

        if(thirty.includes(month)){
            limit=30;
        } else if(thirty1.includes(month)){
            limit=31;
        } else{
            limit=28;
        }

        let temp=[];
        
        for (let i = 0; i < limit; i++) { 
            temp.push(i);
        }

        return temp;
    }

    createYears=()=>{
        let temp=[];
        const limit=new Date().getFullYear();
        for (let i = 1945; i < limit+1; i++) { 
            temp.push(i);
        }
        return temp;
    }


    render(){
        const DAYS = this.calculateDays();
        const YEARS = this.createYears();
        const {locale} = this.props;
        
        return(
            <div style={{paddingTop:'3vh'}}>
                <Form horizontal onSubmit={e=>this.onSubmit(e)}>

    <Row>
        <Col xs={6}>
                    <FormGroup controlId="formHorizontalName" validationState={this.validateLocalName()} onBlur={()=>this.setState({nameF:true})} onFocus={()=>this.setState({nameF:false})}>
                        <Col componentClass={ControlLabel} sm={2}>
                            {locale.customer.name}
                        </Col>
                        <Col sm={6}>
                        <FormControl type="Text" placeholder={locale.customer.name} value={this.state.name} onChange={val=>this.setState({name:val.target.value})}/>
                        {this.state.nameF && <HelpBlock>{locale.HELP.name}</HelpBlock>}
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail" validationState={this.validateLocalEmail()} onBlur={()=>this.setState({emailF:true})}>
                        <Col componentClass={ControlLabel} sm={2}>
                            {locale.customer.email}
                        </Col>
                        <Col sm={6}>
                        <FormControl type="Email" placeholder={locale.customer.email} value={this.state.email} onChange={val=>this.setState({email:val.target.value})}/>
                        {this.state.emailF && <HelpBlock>{locale.HELP.email}</HelpBlock>}
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPhone" validationState={this.validateLocalPhone()} onBlur={()=>this.setState({phoneF:true})} onFocus={()=>this.setState({phoneF:false})}>
                        <Col componentClass={ControlLabel} sm={2}>
                            {locale.customer.phone}
                        </Col>
                        <Col sm={6}>
                        <FormControl type="Number" placeholder={locale.customer.phone} value={this.state.phone} onChange={val=>this.setState({phone:val.target.value})}/>
                        {this.state.phoneF && <HelpBlock>{locale.HELP.phone}</HelpBlock>}
                        </Col>
                    </FormGroup>
                    
                    <FormGroup controlId="formHorizontalWechat" validationState={this.validateLocalWechat()} onBlur={()=>this.setState({wechatF:true})} onFocus={()=>this.setState({wechatF:false})}>
                        <Col componentClass={ControlLabel} sm={2}>
                        {locale.customer.wechat}
                        </Col>
                        <Col sm={6}>
                        <FormControl type="Text" placeholder={locale.customer.wechat} value={this.state.wechat} onChange={val=>this.setState({wechat:val.target.value})}/>
                        {this.state.wechatF && <HelpBlock>{locale.HELP.wechat}</HelpBlock>}
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col xs={4} smOffset={1}>
                                <FormControl componentClass="select" placeholder="select" onChange={(val=>this.setState({type:val.target.value}))}>
                                    {locale.customer.CUSTOMERTYPES.map((item, val)=><option value={val} key={val}>{item}</option>)}
                                </FormControl>
                            </Col>
                            <Col xs={4} xsOffset={1} smOffset={1}>
                                <h5>{`${locale.customer.selected} ${locale.customer.CUSTOMERTYPES[parseInt(this.state.type)]}`}</h5>
                            </Col>
                        </Row>
                    </FormGroup>
            </Col>

            <Col xs={6}>
                <FormGroup controlId="formHorizontalAddress" validationState={this.validateLocalAddress()} onBlur={()=>this.setState({addF:true})} onFocus={()=>this.setState({addF:false})}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {locale.customer.address}
                    </Col>
                    <Col sm={6}>
                        <FormControl type="Text" placeholder={locale.customer.address} value={this.state.address} onChange={val=>this.setState({address:val.target.value})}/>
                        {this.state.addF && <HelpBlock>{locale.HELP.username}</HelpBlock>}
                    </Col>
                </FormGroup>


                <FormGroup controlId="formHorizontalSex">
                    <Col componentClass={ControlLabel} sm={2}>
                        {locale.customer.sex}
                    </Col>
                    <Col sm={6}>
                        <Radio name="radioGroup" defaultChecked inline onChange={val=>this.setState({sex:true})}>
                            {locale.customer.male}
                        </Radio>{' '}
                        <Radio name="radioGroup" inline onChange={val=>this.setState({sex:false})}>
                            {locale.customer.female}
                        </Radio>{' '}
                    </Col>
                </FormGroup>


                <FormGroup>
                    <Row>
                    <Col componentClass={ControlLabel} sm={2}>
                        DoB
                    </Col>
                        <Col xs={3}>
                            <FormControl componentClass="select" placeholder="select" onChange={val=>this.setState({month:val.target.value})}> 
                                {MONTHS.map((item, val)=><option value={val} key={val}>{item}</option>)}
                            </FormControl>
                        </Col>


                        <Col xs={3}>
                            <FormControl componentClass="select" placeholder="select" onChange={val=>this.setState({day:val.target.value+1})}>
                                {DAYS.map((item, val)=><option value={val} key={val}>{item+1}</option>)}
                            </FormControl>
                        </Col>


                        <Col xs={3}>
                            <FormControl componentClass="select" placeholder="select" onChange={val=>this.setState({year:val.target.value})}>
                                {YEARS.map((item, val)=><option value={item} key={val}>{item}</option>)}
                            </FormControl>                            
                        </Col>

                    </Row>
                </FormGroup>

            </Col>
        </Row>

        <Row>
            <Col xs={12}>
                <hr/>
                    <FormGroup>
                        <Row>
                            <Col smOffset={2} sm={4}>
                                <Button type="submit" bsStyle="success" block disabled={this.props.disabled}>{locale.btns.submit}</Button>
                            </Col>
                            <Col sm={4}>
                                <Button bsStyle="warning" onClick={()=>this.clear()} block disabled={this.props.disabled}>{locale.btns.clear}</Button>
                            </Col>
                        </Row>
                    </FormGroup>

            </Col>
        </Row>

                </Form>
            </div>
        );
    }

}

export default AddLocale(CustomerForm);