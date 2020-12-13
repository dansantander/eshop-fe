import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import PropTypes from 'prop-types';
import { logOutUser } from '../actions/actionsIndex';
import URL from '../helpers/url';
/* eslint-disable no-console */

const Header = props => {
  const logOut = () => {
    const { logOutUser } = props;
    axios.delete(`${URL}/logged_out`, { withCredentials: true })
      .then(() => logOutUser());
  };

  const { loggedIn, user } = props;
  if (loggedIn === 'LOGGED_IN') {
    return (
      <div
        id="nav-links"
        className="nav-top pl-3 py-2 w-100 border-bottom d-flex justify-content-around align-items-center"
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

            <Dropdown.Divider />

            <Dropdown.Item onSelect={() => logOut()} className="pl-2">
              LogOut
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
        <h1 className="logo"> mallster </h1>
        <div className="align-self-center">
          <b>{user.username}</b>
          {' '}
          <i className="far fa-user-circle" />
          {' '}
        </div>
        <div className="cart">
          <i className="fas fa-bell" />
        </div>
        <div className="cart">
          <i className="fas fa-shopping-cart" />
        </div>
      </div>
    );
  }

  return (
    <div
      id="nav-links"
      className="nav-top pl-3 py-2 w-100 border-bottom d-flex justify-content-center"
    >
      <h1 className="logo"> mallster </h1>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.logIn.loggedIn,
  user: state.logIn.user,
});

const mapDispatchToProps = dispatch => ({
  logOutUser: () => {
    dispatch(logOutUser());
  },
});

Header.propTypes = {
  loggedIn: PropTypes.string.isRequired,
  logOutUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
