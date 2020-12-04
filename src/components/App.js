import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import Home from './Home';
// import Dashboard from './Dashboard';
import Registration from './auth/Registration';
import FavoritesList from '../containers/FavoritesList';
import ProductDetails from '../containers/ProductDetails';
import Header from './Header';
import ProductList from '../containers/ProductList';

/* eslint-disable no-console */
/* eslint-disable react/prop-types */

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="App">
      <BrowserRouter>
        { user ? <Header user={user} /> : null }
        <Switch>
          <Route exact path="/">
            <Home />
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
  );
}

export default App;
