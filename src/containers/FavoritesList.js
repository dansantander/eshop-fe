import React, { Component } from 'react';
import axios from 'axios';
import Product from '../presentational/Product';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favProducts: [],
    };
  }

  componentDidMount() {
    let mounted = true;

    axios.get('http://localhost:3001/favorites')
      .then(result => {
        if (mounted) {
          this.setState({
            favProducts: result.data.favProducts,
          });
          mounted = false;
        }
      });
  }

  render() {
    // console.log('this.state.products',this.state.products)
    const { favProducts } = this.state;
    // console.log('products',products)

    return (
      <div>
        <div className="container">
          <h1>Products</h1>
          <div className="row">
            {
              favProducts.map(p => (
                <Product key={p.id} product={p} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
