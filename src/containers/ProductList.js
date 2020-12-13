import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Product from '../components/Product';
import { setFavorites, setProducts } from '../actions/actionsIndex';
import URL from '../helpers/url';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      favorites: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    let mounted = true;
    const { setProducts } = this.props;

    axios.get(`${URL}/products`, { withCredentials: true })
      .then(result => {
        if (mounted) {
          this.setState({
            products: result.data.products,
            isLoading: false,
          });
        }
        setProducts(result.data.products);
        mounted = false;
      });
  }

  componentDidUpdate() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { favorites } = this.state;
    const { setFavorites } = this.props;
    axios.get(`${URL}/favorites`, { params: { user: user.id } }, { withCredentials: true })
      .then(result => {
        if (JSON.stringify(favorites) !== JSON.stringify(result.data.favProducts)) {
          this.setState({
            favorites: result.data.favProducts,
          });
          setFavorites(result.data.favProducts);
        }
      });
  }

  render() {
    const { products, favorites, isLoading } = this.state;
    return (
      <>
        { !isLoading ? (
          <div>
            <div className="container my-5">
              <div className="section-title">
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
        ) : (
          <div className="container my-5">
            <div className="section-title">
              <h3>Loading...</h3>
            </div>
          </div>
        )}
      </>
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
