import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    let mounted = true;

    axios.get(`http://localhost:3001/products/${id}`, { withCredentials: true })
      .then(result => {
        if (mounted) {
          this.setState({
            product: result.data,
            isLoading: false,
          });
          mounted = false;
        }
      });
  }

  render() {
    const { product, isLoading } = this.state;
    return (
      <>
        { !isLoading ? (
          <div className="container">
            <div className="card movie-details my-5">
              <img alt="" className="card-img-top" src={product.image} />
              <div className="card-body">
                <h3 className="" data-testid="Title">
                  {product.name}
                </h3>
                <h5 className="" data-testid="Actors">
                  {product.description}
                </h5>
                <p className="">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </>
    );
  }
}

export default withRouter(ProductDetails);
