import React from 'react';
import {Panel, Row, Col, FormControl, FormGroup, Button} from 'react-bootstrap';
import AddLocale from '../../locales/Context';
import Security from '../login/Security';

class RestrictedInventoryDetails extends React.Component{
    state={
        newPrice: 0
    }

    render(){
        const {inventory, changePrice, locale} = this.props;
        const {costPrice, retailPrice}=inventory;
        return (
            <div>
                <Col>
                    <Panel bsStyle="info">
                        <Panel.Heading><b>{locale.inventory.pricing}</b></Panel.Heading>
                        <Panel.Body>
                        <Security level={3}>
                            <Row>
                                <Col md={4}>{locale.inventory.costPrice}:</Col>
                                <Col md={8}>{costPrice} rmb</Col>
                                <hr/>
                            </Row>
                        </Security>

                            <Row>
                                <Col md={4}>{locale.inventory.retailPrice}:</Col>
                                <Col md={4}>{retailPrice} {locale.commonInfo.rmb}</Col>
                                <Col md={4}>
                                    <FormGroup controlId="formHorizontalName">
                                        <FormControl type="Number" placeholder={this.state.newPrice} onChange={event=>this.setState({newPrice: event.target.value})}/>
                                        <Button type="submit" bsStyle="success" block disabled={this.props.disabled} onClick={()=>changePrice(this.state.newPrice)}>{locale.btns.updatePrc}</Button>
                                    </FormGroup>
                                </Col>
                                <hr/>
                            </Row>
                        
                        <Security level={3}>
                            <Row>
                                <Col md={4}>{locale.inventory.profit}:</Col>
                                <Col md={8}>{retailPrice-costPrice} {locale.commonInfo.rmb}</Col>
                            </Row>
                        </Security>
                        </Panel.Body>
                    </Panel>
                </Col>
            </div>
        );
    }
}

export default AddLocale(RestrictedInventoryDetails);