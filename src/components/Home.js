import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import FavoritesList from '../containers/FavoritesList';
import ProductDetails from '../containers/ProductDetails';
import Header from './Header';
import ProductList from '../containers/ProductList';
/* eslint-disable react/prop-types */
const Home = ({ user }) => (
  <div className="home">
    <div>
      <Header user={user} />
    </div>
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/products" exact component={ProductList} />
          <Route path="/products/:id" exact component={ProductDetails} />
          <Route path="/products/favorites" exact component={FavoritesList} />
        </Switch>
      </BrowserRouter>
    </div>
  </div>
);

export default Home;
