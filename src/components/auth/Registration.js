import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
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

    axios.post('http://localhost:3001/registrations', { // axios post takes in 3 parameters: url, things to post, withcredentials:true
      user: {
        username,
        email,
        password,
        password_confirmation,
      },
    },
    { withCredentials: true }).then(response => {
      console.log('registration response', response);
      if (response.data.status === 'created') {
        console.log('registration response', response);
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
