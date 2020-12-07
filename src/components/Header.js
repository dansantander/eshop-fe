import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
const Header = props => {
  const { loggedIn, user } = props;
  if (loggedIn === 'LOGGED_IN') {
    return (
      <div
        id="nav-links"
        className="nav-top pl-3 py-2 w-100 border-bottom d-flex justify-content-between"
      >
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <i className="fas fa-bars" />
          </Dropdown.Toggle>
          <Dropdown.Menu>

            <Dropdown.Item as={Link} to="/products" className="pl-2">
              All Products
            </Dropdown.Item>

            <Dropdown.Item as={Link} to="/favorites" className="pl-2">
              Favorite Products
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
        <div className="mr-4 align-self-center">
          Welcome,
          {' '}
          <b>{user.username}</b>
          {' '}
          !
        </div>
      </div>
    );
  }

  return (
    <div
      id="nav-links"
      className="nav-top pl-3 py-2 w-100 border-bottom d-flex justify-content-center"
    >
      LOGO
    </div>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.logIn.loggedIn,
  user: state.logIn.user,
});

export default connect(mapStateToProps)(Header);
