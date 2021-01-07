import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logInUser } from '../../actions/actionsIndex';

import mallsterApi from '../../utils/api';
/* eslint-disable camelcase */
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      submissionErrors: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    const { loggedIn, history } = this.props;
    if (loggedIn === 'LOGGED_IN') {
      history.push('/products');
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      username, email, password, password_confirmation,
    } = this.state;

    const { logInUser } = this.props;
    const { history } = this.props;

    mallsterApi.signUpUser(username, email, password, password_confirmation)
      .then(response => {
        if (response.data.signed_in) {
          logInUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          history.push('/products');
        }
      }).catch(errors => {
        this.setState({
          submissionErrors: errors.response.data.errors,
        });
      });
  }

  render() {
    const {
      username, email, password, password_confirmation, submissionErrors,
    } = this.state;
    return (
      <div className="login-container d-flex justify-content-center align-items-center">
        <div className="login d-flex flex-column align-items-center">
          <div className="form-top mb-3">
            <h1>Sign Up</h1>
            <p>Hello there! Sign Up and start selling your products</p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="name@domain.com"
                value={email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password_confirmation"
                placeholder="Password confirmation"
                value={password_confirmation}
                onChange={this.handleChange}
                required
              />
            </div>
            <button className="btn btn-info my-3" type="submit">Register</button>
          </form>
          { submissionErrors !== '' ? <span className="submissionErrors">{submissionErrors}</span> : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.logIn.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  logInUser: user => {
    dispatch(logInUser(user));
  },
});

Registration.propTypes = {
  loggedIn: PropTypes.string.isRequired,
  logInUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registration));
