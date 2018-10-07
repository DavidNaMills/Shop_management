import React from 'react';
import {Panel, Row, Col} from 'react-bootstrap';
import AddLocale from '../../locales/Context';
// FIXME: 
// need seperate component for the product 
// must be able to select the quantity via an increment and decrement button
// show the current quantity on screen, limit the number to this quantity

//only use this component for the customers

const CustomerItem = ({title, phone, wechat, id, setCustomer, selected, locale}) =>(
    <div onClick={(value)=>setCustomer(id)}>
        <Col md={4}>
            <Panel bsStyle={selected?"success":"info"}>
                <Panel.Heading><b>{title}</b></Panel.Heading>
                <Panel.Body>
                    <Row>
                        <Col md={5}>{locale.customer.phone}</Col>
                        <Col md={1}>{phone}</Col>
                    </Row>
                    <Row>
                        <Col md={5}>{locale.customer.wechat}</Col>
                        <Col md={1}>{wechat}</Col>                            
                    </Row>
                </Panel.Body>
            </Panel>
        </Col>
    </div>
);

export default AddLocale(CustomerItem);