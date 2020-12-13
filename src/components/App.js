import React, { useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Registration from './auth/Registration';
import LogIn from './auth/LogIn';
import ProductList from '../containers/ProductList';
import ProductDetails from '../containers/ProductDetails';
import FavoritesList from '../containers/FavoritesList';
import Header from './Header';
import { logInUser } from '../actions/actionsIndex';
import URL from '../helpers/url';

/* eslint-disable no-console */

const App = props => {
  const { logInUser } = props;

  const checkLoginStatus = () => {
    axios.get(`${URL}/logged_in`, { withCredentials: true })
      .then(res => {
        if (res.data.logged_in && props.loggedIn === 'NOT_LOGGED_IN') {
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

App.propTypes = {
  loggedIn: PropTypes.string.isRequired,
  logInUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
