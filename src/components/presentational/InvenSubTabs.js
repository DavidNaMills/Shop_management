import React from 'react';
import {Tab, Tabs, Row, Col} from 'react-bootstrap';

import BasicInventoryDetails from './BasicInventoryDetails';
import RestrictedInventoryDetails from './RestrictedInventoryDetails';
import InventoryChangeQuantity from './InventoryChangeQuantity';
import SuppliersDetails from './SuppliersDetails';

import InventoryForm from '../forms/InventoryForm';
import AddLocale from '../../locales/Context';
import Security from '../login/Security';

class InvenSubTabs extends React.Component {
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
        const {inventory, locale}=this.props;

        return (
          <Tabs
            eventKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={1} title={locale.inventory.inventoryDetails}>
              <Row>
                  <Col sm={6}>
                    {inventory.length>0&&<BasicInventoryDetails {...this.props}/>}
                  </Col>

                  <Security level={3}>
                    <Col sm={6}>
                      {inventory.length>0&&<SuppliersDetails {...this.props}/>}
                    </Col>
                  </Security>

                </Row>
                <Row>
                  <Security level={2}>
                    <Col sm={6}>
                      {inventory.length>0&&<InventoryChangeQuantity {...this.props}/>}
                    </Col>
                  </Security>

                  <Security level={2}>
                    <Col sm={6}>
                      {inventory.length>0&&<RestrictedInventoryDetails {...this.props}/>}
                    </Col>
                  </Security>
              </Row>
            </Tab>
            
            <Security level={3}>
              <Tab eventKey={2} title={locale.inventory.inventoryStatistics}>
                <h2>COMING SOON!!!</h2>
                <h3>graphs and details about the actual sales</h3>
              </Tab>
            </Security>
            
            <Security level={2}>
              <Tab eventKey={3} title={locale.inventory.newInventory}>
                {<InventoryForm {...this.props}/>}
              </Tab>
            </Security>
          
          
          </Tabs>
        );
      }
  }

  export default AddLocale(InvenSubTabs);