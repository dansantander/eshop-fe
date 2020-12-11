import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import URL from '../helpers/url';
/* eslint-disable no-console */
class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favProducts: [],
    };
  }

  componentDidMount() {
    let mounted = true;

    axios.get(`${URL}/favorites`, { withCredentials: true })
    // axios.get('https://eshop-be-1418.herokuapp.com/favorites', { withCredentials: true })
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
