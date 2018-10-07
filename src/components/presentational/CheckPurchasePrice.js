import React from 'react';
import {Table, Button, Col, Row} from 'react-bootstrap';
import AddLocale from '../../locales/Context';

const CheckPurchasePrice = ({customer, staff, selectedItems, confirmOrder, cancel, locale})=>{
    let totalCost=0;
    let totalItems=0;

    return(
        <div>
            <Row>
                <Col xs={8} xsOffset={2}>
            <Table bordered condensed hover>

                <tbody>
                    <tr>
                        <td><b>{locale.customer.name}</b></td>
                        <td>{customer.name}</td>
                        <td><b>{locale.staff.name}</b></td>
                        <td>{staff.name}</td>
                    </tr>
                    <tr>
                        <td><b>{locale.customer.phone}</b></td>
                        <td>{customer.phone}</td>
                        <td><b>{locale.commonInfo.date}</b></td>
                        <td>12-09-2018</td>
                    </tr>
                    <tr>
                        <td><b>{locale.customer.wechat}</b></td>
                        <td>{customer.wechat}</td>
                        <td><b>{locale.commonInfo.time}</b></td>
                        <td>12:52</td>
                    </tr>
                </tbody>
            </Table>

            <Table striped bordered hover>
                <thead>
                    <tr>
                    <td>#</td>
                        <td>{locale.purchase.item}</td>
                        <td>{locale.purchase.qtyS}</td>
                        <td>{locale.purchase.price}</td>
                        <td>{locale.purchase.total}</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedItems.map((item, val)=>{
                            totalCost = totalCost+(item.quantity*item.price);
                            totalItems = totalItems+item.quantity;
                            return (
                                <tr key={val}>
                                    <td>{val+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity*item.price}</td>
                                </tr>
                        )})
                    }
                </tbody>
            </Table>

            <Table bordered>
                <thead>
                    <tr>
                        <td>{locale.purchase.qtyQuan}</td>
                        <td>{locale.purchase.total}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalItems}</td>
                        <td>{`${totalCost} ${locale.commonInfo.rmb}`}</td>
                    </tr>
                </tbody>
            </Table>
            <Col md={2} smOffset={3}>
                <Button bsStyle="success" block onClick={()=>confirmOrder()}>{locale.btns.confirm}</Button>
            </Col>
            <Col md={2} smOffset={2}>
                <Button bsStyle="danger" block onClick={()=>cancel()}>{locale.btns.cancel}</Button>
            </Col>
            </Col>
            </Row>
        </div>
    );
}

export default AddLocale(CheckPurchasePrice);