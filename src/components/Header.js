import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart, faUser, faSearch, faBell,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <nav className="navbar navbar-expand-lg ">
    <div className="container">
      <div className="d-flex">
        <h1>Shop</h1>
      </div>

      <div className="d-flex flex-column align-items-center">
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <ul className="navbar-nav">
          <li className="mx-2 my-2">Category</li>
          <li className="mx-2 my-2">History</li>
          <li className="mx-2 my-2">Sell</li>
          <li className="mx-2 my-2">Official Stores</li>
          <li className="mx-2 my-2">Help</li>
        </ul>
      </div>

      <div>
        <ul className="navbar-nav">
          <li className="mx-2">
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-1">Daniel</span>
          </li>
          <li className="mx-2">
            <span className="mr-1">Favorites</span>
          </li>
          <li className="mx-2">
            <FontAwesomeIcon icon={faBell} />
          </li>
          <li className="mx-2">
            <FontAwesomeIcon icon={faShoppingCart} />
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
