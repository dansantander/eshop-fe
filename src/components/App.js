import React from 'react';
import {
  BrowserRouter, Switch, Route, /*  Redirect, */
} from 'react-router-dom';
import Registration from './auth/Registration';
import LogIn from './auth/LogIn';
import ProductList from '../containers/ProductList';
import ProductDetails from '../containers/ProductDetails';
import FavoritesList from '../containers/FavoritesList';
import Header from './Header';

/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const App = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log('user in App', user);

  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Header user={user} />
          <Switch>
            <Route exact path="/">
              <LogIn />
            </Route>
            <Route exact path="/registration">
              <Registration />
            </Route>
            <Route exact path="/products">
              <ProductList user={user} />
            </Route>
            <Route exact path="/products/:id">
              <ProductDetails />
            </Route>
            <Route exact path="/favorites">
              <FavoritesList />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
