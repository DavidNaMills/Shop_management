import React from 'react';

import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import AddLocale from '../locales/Context';

const NavBar =({locale, logout, name, level})=>(    
<Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href='#'>Shop Management</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav pullRight>
      <NavDropdown eventKey={3} title={`${locale.welcomeMsg} ${name} ${locale.staff.level}: ${locale.staff.LEVEL[level]}`} id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>{locale.settings}</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3} onClick={()=>logout()}>{locale.logout}</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

export default AddLocale(NavBar);