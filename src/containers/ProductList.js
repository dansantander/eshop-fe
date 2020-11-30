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

    axios.get('http://localhost:3001/products')
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
    // console.log('this.state.products',this.state.products)
    const { products } = this.state;
    // console.log('products',products)

    return (
      <div>
        <div className="container">
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
