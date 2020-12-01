import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logInUser } from '../../actions/actionsIndex';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
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
      username, email, password, password_confirmation,
    } = this.state;

    const { logInUser } = this.props;
    const { history } = this.props;

    axios.post('http://localhost:3001/registrations', {
      user: {
        username,
        email,
        password,
        password_confirmation,
      },
    },
    { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        console.log('registration response', response);
        logInUser(response.data.user);
        // eslint-disable-next-line react/prop-types
        history.push('/dashboard');
      }
    }).catch(error => {
      console.log('registration error', error);
    });
  }

  render() {
    const {
      username, email, password, password_confirmation,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
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

          <div className="form-group">
            <input
              type="password"
              name="password_confirmation"
              placeholder="Password confirmation"
              value={password_confirmation}
              onChange={this.handleChange}
              required
            />
          </div>
          <button className="btn btn-info" type="submit">Register</button>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registration));
