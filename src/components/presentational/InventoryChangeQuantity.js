import React from 'react';
import {Panel, Row, Col, FormControl, FormGroup, Button} from 'react-bootstrap';
import AddLocale from '../../locales/Context';

const requireStyle=(quantity)=>{
    if(quantity===0){
        return "danger"
    } else if(quantity < 10){
        return "warning"
    } else {
        return "success";
    }
}

class InventoryChangeQuantity extends React.Component{
    state={
        newQty:1
    }

    render(){
        const {inventory, changeQuantity, locale} = this.props;
        const {quantity}=inventory;
        return (
            <Col>
                <Panel bsStyle={requireStyle(quantity)}>
                    <Panel.Heading><b>{locale.inventory.changeQuantity}:</b></Panel.Heading>
                        <Panel.Body>
                            <Row>
                                <Col md={4}>{locale.inventory.currentQuantity}:</Col>
                                <Col md={4}>{quantity}</Col>
                                <Col md={4}>
                                    <FormGroup controlId="formHorizontalQty">
                                        <FormControl type="Number" placeholder={this.state.newQty} onChange={val=>this.setState({newQty: val.target.value})}/>
                                        <Button type="submit" bsStyle="success" disabled={this.props.disabled} block onClick={()=>changeQuantity(this.state.newQty)}>{locale.btns.updateQty}</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Panel.Body>
                </Panel>
            </Col>
        )
    };
};

export default AddLocale(InventoryChangeQuantity);