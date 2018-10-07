import React from 'react';
import {Panel} from 'react-bootstrap';
import AddLocale from '../../locales/Context';

const DisplayCustomer = ({customer, locale})=>(
    <div>
         <Panel bsStyle="primary">
            <Panel.Heading>{customer.name}</Panel.Heading>
            <Panel.Body>{`${locale.customer.phone}: ${customer.phone}`}</Panel.Body>
            <Panel.Body>{`${locale.customer.wechat}: ${customer.wechat}`}</Panel.Body>
            <Panel.Body>{`${locale.customer.email}: ${customer.email}`}</Panel.Body>
            <Panel.Body>{`${locale.customer.type}: ${locale.customer.CUSTOMERTYPES[customer.customerType]}`}</Panel.Body>
        </Panel> 
    </div>
);

export default AddLocale(DisplayCustomer);