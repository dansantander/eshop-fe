import React, { Component } from 'react';
import mallsterApi from '../utils/api';
/* eslint-disable no-console */
class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      price: '',
      submissionErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      name, description, price,
    } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.id, name, description, price);

    mallsterApi.addProduct(user, name, description, price)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.success);
        }
      }).catch(errors => {
        console.log('errors', errors.response.data.errors);
      });
  }

  render() {
    const {
      name,
      description,
      price,
      submissionErrors,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>
            Add New Product
          </h5>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              name="description"
              placeholder="Description"
              value={description}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        { submissionErrors !== '' ? <span className="submissionErrors">{submissionErrors}</span> : ''}
      </div>
    );
  }
}

export default ProductForm;
