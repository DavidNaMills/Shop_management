import React from 'react';
import {Panel} from 'react-bootstrap';

export default ({name, getStaff, id, iselected}) => (
  <div onClick={val=>getStaff(id)}>
    <Panel bsStyle={iselected?"success":"info"}>
      <Panel.Heading>{name}</Panel.Heading>
    </Panel>
  </div>
);
