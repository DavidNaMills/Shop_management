import React from 'react';
import {Panel, Row, Col} from 'react-bootstrap';
import AddLocale from '../../locales/Context';

// FIXME: 
// need seperate component for the product 
// must be able to select the quantity via an increment and decrement button
// show the current quantity on screen, limit the number to this quantity

//only use this component for the customers

const BasicInventoryDetails = (props) =>{
    const {productType, name, description, quantity, retailPrice}=props.inventory;
    const {locale} = props;
    return (
        <div>
            <Col>
                <Panel bsStyle="info">
                    <Panel.Heading><b>{name}</b></Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <Col md={4}>{locale.inventory.type}</Col>
                            <Col md={8}>{productType}</Col>
                        </Row>
                        <Row>
                            <hr/>
                            <Col md={4}>{locale.inventory.description}</Col>
                            <Col md={8}>{description}</Col>
                        </Row>
                        <Row>
                            <hr/>
                            <Col md={4}>{locale.inventory.quantity}</Col>
                            <Col md={8}>{quantity}</Col>
                        </Row>
                        <Row>
                            <hr/>
                            <Col md={4}>{locale.inventory.retailPrice}</Col>
                            <Col md={8}>{retailPrice} {locale.commonInfo.rmb}</Col>
                        </Row>                        
                    </Panel.Body>
                </Panel>
            </Col>
        </div>
    )
};

export default AddLocale(BasicInventoryDetails);