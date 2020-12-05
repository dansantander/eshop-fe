import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Product from '../components/Product';
import { setFavorites, setProducts } from '../actions/actionsIndex';
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      favorites: [],
    };
  }

  componentDidMount() {
    let mounted = true;
    const { setFavorites, setProducts } = this.props;

    axios.get('http://localhost:3001/products', { withCredentials: true })
      .then(result => {
        if (mounted) {
          this.setState({
            products: result.data.products,
          });
        }
        setProducts(result.data.products);
        mounted = false;
      });

    axios.get('http://localhost:3001/favorites', { withCredentials: true })
      .then(result => {
        this.setState({
          favorites: result.data.favProducts,
        });
        setFavorites(result.data.favProducts);
      });
  }

  render() {
    const { products, favorites } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div className="container my-5">
          <div className="container-fluid">
            <h1>Products</h1>
          </div>
          <div className="row">
            {
              products.map(p => (
                <Product
                  key={p.id}
                  product={p}
                  isFav={favorites.some(f => f.id === p.id)}
                  user={user}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setFavorites: favorites => {
    dispatch(setFavorites(favorites));
  },
  setProducts: products => {
    dispatch(setProducts(products));
  },
});

export default connect(null, mapDispatchToProps)(ProductList);
