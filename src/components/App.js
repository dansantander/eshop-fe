import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Registration from './auth/Registration';
import FavoritesList from '../containers/FavoritesList';
import ProductDetails from '../containers/ProductDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
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
