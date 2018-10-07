import React from 'react';
import {Panel, FormControl, FormGroup, Button, Col, Row} from 'react-bootstrap';
import AddLocale from '../../locales/Context';


class InventoryItem extends React.Component{ 

    state= {
        cost: this.props.price,
        quantity:this.props.quantity,
        requiredQuantity: 0,
    };

    increment=()=>{
        const newReq = this.state.requiredQuantity+1;
        const newQuantity = this.state.quantity-1

        this.setState({
            requiredQuantity: newReq,
            total:parseFloat(this.props.price)*parseFloat(newReq),
            quantity: newQuantity
        }, ()=>{
            this.props.selectItem(this.props.id, this.state.requiredQuantity, this.state.cost, this.props.title);
        });
    };

    decrement=()=>{
        const newReq = this.state.requiredQuantity-1;
        const newQuantity = this.state.quantity+1

        this.setState({
            requiredQuantity: newReq,
            total:parseFloat(this.props.price)*parseFloat(newReq),
            quantity: newQuantity
        }, ()=>{
            this.props.selectItem(this.props.id, this.state.requiredQuantity, this.state.cost, this.props.title);
        });
    };

    changePrice=(e)=>{
        const newPrice = e.target.value;
        this.setState({cost:newPrice}, ()=>{
            this.props.selectItem(this.props.id, this.state.requiredQuantity, this.state.cost, this.props.title);
        })
    }
    
    requireStyle=()=>{
        const {quantity}=this.props;
        if(quantity===0){
            return "danger"
        } else if(quantity < 10){
            return "warning"
        } else {
            return "success";
        }
    }

    render(){
        const {title, description, price, quantity, locale} = this.props;
        return(
            <div>
                <Col md={6}>
                <Panel bsStyle={this.requireStyle()}>
                    <Panel.Heading>{title}</Panel.Heading>
                    <Panel.Body>
                        {description}<br/><br/>
                        <Row><Col xs={8}><b>{locale.purchase.ppUnit}:</b></Col>{price}</Row>
                        <Row><Col xs={8}><b>{locale.purchase.qtyAvail}:</b></Col> {this.state.quantity}</Row>
                        <Row><Col xs={8}><b>{locale.purchase.required}:</b></Col> {this.state.requiredQuantity}</Row>
                        <Row><Col xs={8}><b>{locale.purchase.ttlPrice}:</b></Col> {this.state.cost*this.state.requiredQuantity} {locale.commonInfo.rmb}</Row>
                        <Row>{
                            quantity>0&&
                            <div>
                                <Col xs={1} md={2}>
                                    {this.state.requiredQuantity<quantity&&<Button bsStyle="info" onClick={this.increment}>+</Button>}
                                </Col>
                                <Col xs={1} md={2}>
                                    {this.state.requiredQuantity>0&&<Button bsStyle="warning" onClick={this.decrement}>-</Button>}
                                </Col>
                            </div>
                        }</Row>
                        {quantity>0&&<FormGroup controlId="formHorizontalName">
                            <FormControl type="Number" placeholder={this.state.cost} onChange={this.changePrice}/>
                        </FormGroup>
                        }
                        
                    </Panel.Body>
                </Panel>
                </Col>
            </div>
        );
    }

}

export default AddLocale(InventoryItem);