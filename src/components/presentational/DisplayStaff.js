import React from 'react';
import {Panel} from 'react-bootstrap';
import AddLocale from '../../locales/Context';


const DisplayStaff = ({staff, locale})=>(
    <div>
         <Panel bsStyle="primary">
            <Panel.Heading>{staff.name}</Panel.Heading>
            <Panel.Body>{`${locale.staff.level}: ${locale.staff.LEVEL[staff.level]}`}</Panel.Body>
            <Panel.Body>{`${locale.staff.email}: ${staff.email}`}</Panel.Body>
        </Panel> 
    </div>
);

export default AddLocale(DisplayStaff);