import React from 'react';

import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import AddLocale from '../locales/Context';
import FlagIcon from './presentational/FlagIcon';

const NavBar =({locale, logout, user, changeLanguage})=>(    
<Navbar  collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
        ShangNaDavid
    </Navbar.Brand>
  <Navbar.Toggle />
  
  </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>

  {user&&
        <NavDropdown eventKey={3} title={`${locale.welcomeMsg} ${user.name} ${locale.staff.level}: ${locale.staff.LEVEL[user.level]}`} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>{locale.settings}</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.2} onClick={()=>logout()}>{locale.logout}</MenuItem>
        </NavDropdown>
  }

        <NavDropdown eventKey={1} title="Language" id="basic-nav-dropdown">
          <MenuItem eventKey={1.1} onClick={()=>{changeLanguage('zh');}}><FlagIcon code={'cn'} size={'lg'}/> 中文</MenuItem>
          <MenuItem eventKey={1.2} onClick={()=>{changeLanguage('en');}}><FlagIcon code={'gb'} size={'lg'}/> English</MenuItem>
        </NavDropdown>

      </Nav>
    </Navbar.Collapse>

</Navbar>
);

export default AddLocale(NavBar);