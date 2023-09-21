import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { fetchUserTotalScore } from '../../redux/action';


function NavbarUser({ userEmail, totalScore }) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserTotalScore(userEmail));
  // }, [dispatch, userEmail]);
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavItem>
        <NavbarBrand className="ps-3">{`Welcome ${userEmail}`}
        {/* {totalScore !== undefined && (
          <span className="ps-2">Total Score: {totalScore}</span>
        )} */}
        </NavbarBrand>
        </NavItem>
        
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink href="/editprofile">Edit Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/" className="pe-3">Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
const mapStateToProps = (state) => ({
  userEmail: state.reducer.email,
  totalScore: state.reducer.totalScore,
});

export default connect(mapStateToProps)(NavbarUser);
