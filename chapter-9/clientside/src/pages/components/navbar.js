import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

function Example(args) {

  return (
    <div>
      <Navbar {...args} className="my-2" color="dark" dark expand="md">
        <NavbarBrand href="/">Team 2</NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/register">Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Example;
