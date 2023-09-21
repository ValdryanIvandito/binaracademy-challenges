import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

function NavbarUser(args) {
  return (
    <div>
      <Navbar {...args} className="my-2" color="dark" dark expand="md">
        <NavbarBrand>Team 2</NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/profile">MyProfile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarUser;
