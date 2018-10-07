import React from 'react';
import {Panel, Row, Col} from 'react-bootstrap';
import AddLocale from '../../locales/Context';

const SupplierDetails = (props) =>{
    const {supplierName, supplierAddress, supplierPhone}=props.inventory;
    const {locale} = props;
    return (
        <div>
            <Col>
                <Panel bsStyle="info">
                    <Panel.Heading><b>{locale.inventory.suppDetails}</b></Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <Col md={4}>{locale.inventory.suppName}:</Col>
                            <Col md={8}>{supplierName}</Col>
                        </Row>
                        <Row>
                            <hr/>
                            <Col md={4}>{locale.inventory.suppPhone}:</Col>
                            <Col md={8}>{supplierPhone}</Col>
                        </Row>
                        <Row>
                            <hr/>
                            <Col md={4}>{locale.inventory.suppAdd}:</Col>
                            <Col md={8}>{supplierAddress}</Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            </Col>
        </div>
    )
};

export default AddLocale(SupplierDetails);