import React from 'react';
import {Tab, Tabs} from 'react-bootstrap';

import StaffForm from '../forms/StaffForm';
import UpdateStaffLevelForm from '../forms/UpdateStaffLevelForm';
import AddLocale from '../../locales/Context';


class StaffSubTabs extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleSelect = this.handleSelect.bind(this);
    
        this.state = {
          key: 1
        };
      }
    
      handleSelect(key) {
        this.setState({ key });
      }
    
      render() {
        const {staff, locale}=this.props;
        return (
          <Tabs
            eventKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={1} title={locale.staff.staffDetails}>
              {staff!=null&&<UpdateStaffLevelForm {...this.props}/>}
            </Tab>
            <Tab eventKey={2} title={locale.staff.newStaff}>
              {<StaffForm onSubmit={this.props.onSubmit}/>}
            </Tab>
          </Tabs>
        );
      }
  }

  export default AddLocale(StaffSubTabs);