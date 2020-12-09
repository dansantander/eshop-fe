import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product';
/* eslint-disable */
class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favProducts: [],
    };
  }

  componentDidMount() {
    let mounted = true;

    axios.get('http://localhost:3001/favorites', { withCredentials: true })
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
    console.log('this.state.favProducts',this.state.favProducts);
    const { favProducts } = this.state;

    return (
      <div>
        <div className="container">
          <h1>My Favorites</h1>
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
