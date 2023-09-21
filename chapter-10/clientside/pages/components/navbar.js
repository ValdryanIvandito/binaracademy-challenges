import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

function Example({ isLoggedIn, userEmail }) {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/" className="ps-3">
          {isLoggedIn ? `Welcome, ${userEmail}` : 'Team 2'}
        </NavbarBrand>
        <Nav className="ms-auto" navbar>
          {isLoggedIn ? (
              <>
                <NavLink href="/editprofile">Edit Profile</NavLink>
                <NavLink href="/logout">Logout</NavLink>
              </>
            ) : (
              <>
                <NavLink href="/register">Register</NavLink>
                <NavLink href="/login">Login</NavLink>
              </>
            )}
        </Nav>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.reducer.isLoggedIn,
  userEmail: state.reducer.email || '', 
});

export default connect(mapStateToProps)(Example);
