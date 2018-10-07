import React from 'react';
import {Panel, Button, Row, Col} from 'react-bootstrap';
import AddLocale from '../../locales/Context';

const TEMP=false;

const CompletedOrder = ({locale, completed, refNo})=>(
    <div>
          <Panel bsStyle="success">
            <Panel.Heading>
            <Panel.Title componentClass="h2">{locale.purchase.success}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>{locale.purchase.purMsg}</Panel.Body>
            <Panel.Body>{locale.purchase.purRefNo} {refNo}</Panel.Body>
            
            <Row>
                <Col md={2} smOffset={3}>
                    {TEMP&&<Button bsStyle="success" block>{locale.btns.emailInvoice}</Button>}
                </Col>
                <Col md={2} smOffset={2}>
                    {TEMP&&<Button bsStyle="warning" block>{locale.btns.printInvoice}</Button>}<br/>
                </Col>
            </Row>
            <Button block bsStyle="success" onClick={completed}>{locale.btns.continue}</Button>
        </Panel>
    </div>
)

export default AddLocale(CompletedOrder);