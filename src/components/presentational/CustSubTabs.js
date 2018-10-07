import React from 'react';
import {Tab, Tabs} from 'react-bootstrap';

import CustomerForm from '../forms/CustomerForm';
import ViewCustomerDetails from '../forms/ViewCustomerDetails';
import AddLocale from '../../locales/Context';
import Security from '../login/Security';


class CustSubTabs extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
    
        this.state = {
          key: 0
        };
      }
    
      handleSelect(key) {
        this.setState({ key });
      }
    
      render() {
        const {customer, locale}=this.props;

        return (
          <Tabs
            eventKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={1} title={locale.customer.customerDetails}>
              {customer!=null&&<ViewCustomerDetails {...this.props}/>}
            </Tab>


            
              <Tab eventKey={2} title={locale.customer.newCustomer}>
                <Security level={3}>
                  <CustomerForm onSubmit={this.props.onSubmit}/>
                </Security>
              </Tab>
            


          </Tabs>
        );
      }
  }

  export default AddLocale(CustSubTabs);