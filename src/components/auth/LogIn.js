import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logInUser } from '../../actions/actionsIndex';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /* eslint-disable camelcase */
  /* eslint-disable no-console */
  /* eslint-disable react/prop-types */

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      email, password,
    } = this.state;

    const { logInUser } = this.props;
    const { history } = this.props;

    axios.post('http://localhost:3001/sessions', {
      user: {
        email,
        password,
      },
    },
    { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        logInUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        history.push('/dashboard');
      }
    }).catch(error => {
      console.log('registration error', error);
    });
  }

  render() {
    const {
      email, password,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
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
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>

          <button className="btn btn-info" type="submit">Log In</button>
        </form>
        <div>
          <p>Don&apos;t have an account yet?</p>
          <Link to="/registration">Register</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogIn));