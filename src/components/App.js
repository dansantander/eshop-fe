import React, { useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Registration from './auth/Registration';
import LogIn from './auth/LogIn';
import ProductList from '../containers/ProductList';
import ProductDetails from '../containers/ProductDetails';
import FavoritesList from '../containers/FavoritesList';
import Header from './Header';
import { logInUser } from '../actions/actionsIndex';

/* eslint-disable no-console */
/* eslint-disable react/prop-types */

const App = props => {
  const { logInUser } = props;

  const checkLoginStatus = () => {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(res => {
        if (res.data.logged_in && props.loggedIn === 'NOT_LOGGED_IN') {
          console.log('something');
          logInUser(res.data.user);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    checkLoginStatus();
  });

  const { loggedIn } = props;
  console.log('loggedIn', loggedIn);

  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/"><LogIn /></Route>
            <Route exact path="/registration"><Registration /></Route>
            { loggedIn === 'LOGGED_IN' ? <Route exact path="/products"><ProductList /></Route> : <Redirect to="/" />}
            { loggedIn === 'LOGGED_IN' ? <Route exact path="/products/:id"><ProductDetails /></Route> : <Redirect to="/" />}
            { loggedIn === 'LOGGED_IN' ? <Route exact path="/favorites"><FavoritesList /></Route> : <Redirect to="/" />}
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.logIn.loggedIn,
  user: state.logIn.user,
});

const mapDispatchToProps = dispatch => ({
  logInUser: user => {
    dispatch(logInUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
