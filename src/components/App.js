import React, { useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Registration from './auth/Registration';
import LogIn from './auth/LogIn';
import ProductList from '../containers/ProductList';
import ProductDetails from '../containers/ProductDetails';
import FavoritesList from '../containers/FavoritesList';
import Header from './Header';
import { logInUser } from '../actions/actionsIndex';

const App = props => {
  const { logInUser } = props;

  const checkLoginStatus = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && props.loggedIn === 'NOT_LOGGED_IN') {
      logInUser(user);
    }
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
