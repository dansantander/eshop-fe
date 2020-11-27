import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart, faUser, faSearch,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <div className="d-flex">
        <h1>Shop</h1>
      </div>

      <div>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <ul className="navbar-nav">
          <li>Category</li>
          <li>History</li>
          <li>Sell</li>
          <li>Official Stores</li>
          <li>Help</li>
        </ul>
      </div>

      <div>
        <ul className="navbar-nav">
          <li>
            <FontAwesomeIcon icon={faUser} />
            <span>Daniel</span>
          </li>
          <li>Favorites</li>
          <li><FontAwesomeIcon icon={faShoppingCart} /></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
