import React from 'react';
import {
    Form, FormControl, FormGroup, Col, Row,ControlLabel, Button, HelpBlock
} from 'react-bootstrap';
import AddLocale from '../../locales/Context';

import {validateName, validatePhone} from '../validationFunctions/index';


const DEFAULT={
    name:'',
    type:'',
    description: '',
    supplierName: '',
    supplierPhone:'',
    supplierAddress:'',
    quantity: 1,
    costPrice: 1,
    retailPrice: 2,

    nameF:false,
    typeF:false,
    descF: false,
    supNF: false,
    supPF: false,
    supAF: false
};

class InventoryForm extends React.Component{ 
    state={
        name:'',
        productType:'',
        description: '',
        supplierName: '',
        supplierPhone:'',
        supplierAddress:'',
        quantity: 1,
        costPrice: 1,
        retailPrice: 2,

        nameF:false,
        typeF:false,
        descF: false,
        supNF: false,
        supPF: false,
        supAF: false
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

    validateLocalType=()=>{
        if(this.state.typeF){
            const con = validateName(this.state.productType);
            con&&this.setState({typeF:false});
            return con?"success":"error";
        }else{
            return null;
        }
    }

    validateLocalSName=()=>{
        if(this.state.supNF){
            const con = validateName(this.state.supplierName);
            con&&this.setState({supNF:false});
            return con?"success":"error";
        }else{
            return null;
        }
    }

    validateLocalSNumber=()=>{
        if(this.state.supPF){
            const con = validatePhone(this.state.supplierPhone);
            con&&this.setState({supPF:false});
            return con?"success":"error";
        }else{
            return null;
        }
    }

    validateLocalSAddress=()=>{
        if(this.state.supAF){
            const con = validateName(this.state.supplierAddress);
            con&&this.setState({supAF:false});
            return con?"success":"error";
        }else{
            return null;
        }
    }

    clear=()=>this.setState({...DEFAULT});

    onSubmit=(e)=>{
        e.preventDefault();
        const {
            name, productType, description, supplierName, supplierPhone, supplierAddress,
            quantity, costPrice, retailPrice
        } = this.state;

        if(this.fullValidation()){
            this.props.onSubmit({
                name, productType, description, supplierName, supplierPhone, supplierAddress,
                quantity, costPrice, retailPrice
            });
        } else {
            alert('Fix your mistakes!');
        }
    }

    fullValidation=()=>{
        return validateName(this.state.name) &&
        validateName(this.state.productType)&&
        validateName(this.state.supplierName)&&
        validatePhone(this.state.supplierPhone)&&
        validateName(this.state.supplierAddress)?true:false;
    }

    render(){
        const {locale} = this.props;
        return(
            <div>
                <hr/>
                <Form horizontal onSubmit={e=>this.onSubmit(e)}>
                    <Row>
                        <Col xs={4}>
                        <FormGroup controlId="formHorizontalName" validationState={this.validateLocalName()} onBlur={()=>this.setState({nameF:true})} onFocus={()=>this.setState({nameF:false})}>
                            <Col componentClass={ControlLabel} xs={4}>
                                {locale.inventory.name}
                            </Col>
                            <Col xs={8}>
                            <FormControl type="Text" placeholder={locale.inventory.name} value={this.state.name} onChange={val=>this.setState({name:val.target.value})}/>
                                {this.state.nameF && <HelpBlock>{locale.HELP.name}</HelpBlock>}
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalType" validationState={this.validateLocalType()} onBlur={()=>this.setState({typeF:true})} onFocus={()=>this.setState({typeF:false})}>
                            <Col componentClass={ControlLabel} xs={4}>
                                {locale.inventory.type}
                            </Col>
                            <Col xs={8}>
                            <FormControl type="Text" placeholder={locale.inventory.type} value={this.state.productType} onChange={val=>this.setState({productType:val.target.value})}/>
                                {this.state.typeF && <HelpBlock>{locale.HELP.name}</HelpBlock>}
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalDescription">
                            <Col componentClass={ControlLabel} xs={4}>
                                {locale.inventory.description}
                            </Col>
                            <Col xs={8}>
                                <FormControl type="Text" placeholder={locale.inventory.description} value={this.state.description} onChange={val=>this.setState({description:val.target.value})}/>
                            </Col>
                        </FormGroup>

                        </Col>
                        <Col xs={8}>
                            <FormGroup controlId="formHorizontalSName" validationState={this.validateLocalSName()} onBlur={()=>this.setState({supNF:true})} onFocus={()=>this.setState({supNF:false})}>
                                <Col componentClass={ControlLabel} xs={3}>
                                    {locale.inventory.suppName}
                                </Col>
                                <Col xs={6}>
                                <FormControl type="Text" placeholder={locale.inventory.supName} value={this.state.supplierName} onChange={val=>this.setState({supplierName:val.target.value})}/>
                                    {this.state.supNF && <HelpBlock>{locale.HELP.name}</HelpBlock>}
                                </Col>
                            </FormGroup>                        
                        </Col>
                        <Col xs={8}>
                            <FormGroup controlId="formHorizontalSPhone" validationState={this.validateLocalSNumber()} onBlur={()=>this.setState({supPF:true})} onFocus={()=>this.setState({supPF:false})}>
                                <Col componentClass={ControlLabel} xs={3}>
                                    {locale.inventory.suppPhone}
                                </Col>
                                <Col xs={6}>
                                <FormControl type="Number" placeholder={locale.inventory.suppPhone} value={this.state.supplierPhone} onChange={val=>this.setState({supplierPhone:val.target.value})}/>
                                    {this.state.supPF && <HelpBlock>{locale.HELP.phone}</HelpBlock>}
                                </Col>
                            </FormGroup>                        
                        </Col>
                        <Col xs={8}>
                            <FormGroup controlId="formHorizontalSAddress" validationState={this.validateLocalSAddress()} onBlur={()=>this.setState({supAF:true})} onFocus={()=>this.setState({supAF:false})}>
                                <Col componentClass={ControlLabel} xs={3}>
                                    {locale.inventory.suppAdd}
                                </Col>
                                <Col xs={6}>
                                <FormControl type="Text" placeholder={locale.inventory.suppAdd} value={this.state.spplierA} onChange={val=>this.setState({supplierAddress:val.target.value})}/>
                                    {this.state.supAF && <HelpBlock>{locale.HELP.name}</HelpBlock>}
                                </Col>
                            </FormGroup>                        
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={6}>
                            <FormGroup controlId="formHorizontalQuantity">
                                <Col componentClass={ControlLabel} xs={3}>
                                {locale.inventory.quantity}
                                </Col>
                                <Col xs={6}>
                                    <FormControl type="Number" placeholder={locale.inventory.quantity} value={this.state.quantity} onChange={val=>this.setState({quantity:val.target.value})}/>
                                </Col>
                            </FormGroup>                        
                        </Col>
                        <Col xs={6}>
                            <FormGroup controlId="formHorizontalCost" >
                                <Col componentClass={ControlLabel} xs={3}>
                                    {locale.inventory.costPrice}
                                </Col>
                                <Col xs={4}>
                                    <FormControl type="Number" placeholder={this.state.costPrice} value={this.state.costPrice} onChange={val=>this.setState({costPrice:val.target.value})}/>
                                </Col>
                            </FormGroup>                        
 
                            <FormGroup controlId="formHorizontalRetail" >
                                <Col componentClass={ControlLabel} xs={3}>
                                    {locale.inventory.retailPrice}
                                </Col>
                                <Col xs={4}>
                                    <FormControl type="Number" placeholder={locale.inventory.retailPrice} value={this.state.retailPrice} onChange={val=>this.setState({retailPrice:val.target.value})}/>
                                </Col>
                            </FormGroup>
                            <Row>
                                <Col componentClass={ControlLabel} xs={6} smPull={2}>
                                    {locale.inventory.profit} {+this.state.retailPrice-+this.state.costPrice} {locale.commonInfo.rmb}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Row>
                            <hr/>
                            <Col xsOffset={3} xs={2}>
                                <Button type="submit" bsStyle="success" block disabled={this.props.disabled}>{locale.btns.submit}</Button>
                            </Col>
                            <Col xs={2}>
                                <Button bsStyle="warning" onClick={()=>this.clear()} block disabled={this.props.disabled}>{locale.btns.clear}</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>            
            </div>
        );
    }
}


export default AddLocale(InventoryForm);


