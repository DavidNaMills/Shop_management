import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import AddLocale from '../locales/Context';
import {Nav, NavItem} from 'react-bootstrap';
import Security from './login/Security';

class TabNavigation extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        key: 1
      };
    }
  
    handleSelect(key) {
      this.setState({ key });
    }
  
    render() {
      const {locale} = this.props;
      return (
        <Nav bsStyle="tabs" justified activeKey={this.state.key} onSelect={k => this.handleSelect(k)}>
        
          <LinkContainer to="/dashboard"><NavItem eventKey={1}>{locale.mainNav.dashboard}</NavItem></LinkContainer>
          <LinkContainer to="/purchase"><NavItem eventKey={2}>{locale.mainNav.purchase}</NavItem></LinkContainer>
          <Security level={3}><LinkContainer to="/staff"><NavItem eventKey={3}>{locale.mainNav.staff}</NavItem></LinkContainer></Security>
          <LinkContainer to="/customer"><NavItem eventKey={4}>{locale.mainNav.customer}</NavItem></LinkContainer>
          <LinkContainer to="/inventory"><NavItem eventKey={5}>{locale.mainNav.inventory}</NavItem></LinkContainer>

        </Nav>
      );
    }
  }

  export default AddLocale(TabNavigation);