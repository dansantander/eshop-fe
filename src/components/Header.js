import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import { logOutUser } from '../actions/actionsIndex';

const Header = props => {
  const logOut = () => {
    const { logOutUser } = props;
    logOutUser();
    sessionStorage.removeItem('user');
  };

  const { loggedIn, user } = props;
  if (loggedIn === 'LOGGED_IN') {
    return (
      <div className="nav-container">
        <div
          id="nav-links"
          className="container nav-top pl-3 py-2 w-100 border-bottom d-flex justify-content-around align-items-center"
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
          <div className="icons d-flex">
            <div className="align-self-center mx-2">
              <b>{user.username}</b>
              {' '}
              <i className="far fa-user-circle" />
              {' '}
            </div>
            <div className="cart">
              <i className="fas fa-bell" />
            </div>
            <div className="cart ml-1">
              <i className="fas fa-shopping-cart" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nav-container">
      <div
        id="nav-links"
        className="nav-top pl-3 py-2 w-100 border-bottom d-flex justify-content-center"
      >
        <h1 className="logo"> mallster </h1>
      </div>
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
