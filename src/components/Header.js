import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
} from '@fortawesome/free-solid-svg-icons';
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
const Header = ({ user }) => (
  <div
    id="nav-links"
    className="nav-top pl-3 py-2 w-100 border-bottom d-flex justify-content-between"
  >
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        <FontAwesomeIcon icon={faBars} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} className="pl-2" to="/dashboard">
          All Products
        </Dropdown.Item>
        <Dropdown.Item as={Link} className="pl-2" to="/favorites">
          Upload Products
        </Dropdown.Item>
        <Dropdown.Item as={Link} className="pl-2" to="/favorites">
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

export default Header;
