import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    let mounted = true;

    axios.get('http://localhost:3001/products', { withCredentials: true })
      .then(result => {
        if (mounted) {
          this.setState({
            products: result.data.products,
          });
          mounted = false;
        }
      });
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <div className="container my-5">
          <h1>Products</h1>
          <div className="row">
            {
              products.map(p => (
                <Product key={p.id} product={p} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
