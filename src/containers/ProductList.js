import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Product from '../components/Product';
import { setFavorites, setProducts } from '../actions/actionsIndex';
import URL from '../helpers/url';
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

    axios.get(`${URL}/products`, { withCredentials: true })
    // axios.get('https://eshop-be-1418.herokuapp.com/products', { withCredentials: true })
      .then(result => {
        if (mounted) {
          this.setState({
            products: result.data.products,
          });
        }
        setProducts(result.data.products);
        mounted = false;
      });

    axios.get(`${URL}/favorites`, { withCredentials: true })
    // axios.get('https://eshop-be-1418.herokuapp.com/favorites', { withCredentials: true })
      .then(result => {
        this.setState({
          favorites: result.data.favProducts,
        });
        setFavorites(result.data.favProducts);
      });
  }

  render() {
    const { products, favorites } = this.state;
    return (
      <div>
        <div className="container my-5">
          <div className="">
            <h1>Products</h1>
          </div>
          <div className="row">
            {
              products.map(p => (
                <Product
                  key={p.id}
                  product={p}
                  isFav={favorites.some(f => f.id === p.id)}
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

ProductList.propTypes = {
  setFavorites: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ProductList);
