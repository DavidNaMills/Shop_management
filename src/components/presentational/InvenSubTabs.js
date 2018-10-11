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
        const {locale}=this.props;
        return (
          <Tabs
            eventKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={1} title={locale.inventory.inventoryDetails}>
              <Row>
                  <Col sm={6}>
                    <BasicInventoryDetails {...this.props}/>
                  </Col>

                    <Col sm={6}>
                      <Security level={3}>
                        <SuppliersDetails {...this.props}/>
                      </Security>
                    </Col>

                </Row>
                <Row>
                    <Col sm={6}>
                      <Security level={2}>
                        <InventoryChangeQuantity {...this.props}/>
                      </Security>
                    </Col>

                  <Security level={2}>
                    <Col sm={6}>
                      <RestrictedInventoryDetails {...this.props}/>
                    </Col>
                  </Security>
              </Row>
            </Tab>
            
              <Tab eventKey={2} title={locale.inventory.inventoryStatistics}>
            <Security level={3}>
              <div>
                <h2>COMING SOON!!!</h2>
                <h3>graphs and details about the actual sales</h3>
              </div>
            </Security>
              </Tab>
            
              <Tab eventKey={3} title={locale.inventory.newInventory}>
            <Security level={3}>
                {<InventoryForm {...this.props}/>}
            </Security>
              </Tab>
          
          
          </Tabs>
        );
      }
  }

  export default AddLocale(InvenSubTabs);