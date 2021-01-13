import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Product from '../components/Product';
import { setFavorites, setMyProducts, setProducts } from '../actions/actionsIndex';
import mallsterApi from '../utils/api';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      myProducts: [],
      favorites: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { history } = this.props;
    let mounted = true;
    const { setProducts } = this.props;
    if (!user) {
      history.push('/');
    }
    mallsterApi.getProducts()
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
    const user = JSON.parse(localStorage.getItem('user'));
    const { favorites, myProducts } = this.state;
    const { setFavorites, setMyProducts } = this.props;
    if (user) {
      mallsterApi.getFavorites(user)
        .then(result => {
          if (JSON.stringify(favorites) !== JSON.stringify(result.data.favProducts)) {
            this.setState({
              favorites: result.data.favProducts,
            });
            setFavorites(result.data.favProducts);
          }
        });
    }
    if (user) {
      mallsterApi.getMyProducts(user)
        .then(result => {
          if (JSON.stringify(myProducts) !== JSON.stringify(result.data.my_products)) {
            this.setState({
              myProducts: result.data.my_products,
            });
            setMyProducts(result.data.my_products);
          }
        });
    }
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return (<Redirect to="/" />);
    }
    const {
      products, favorites, isLoading,
      myProducts,
    } = this.state;
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
                      isMine={myProducts.some(mp => mp.id === p.id)}
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

const mapStateToProps = state => ({
  loggedIn: state.logIn.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  setFavorites: favorites => {
    dispatch(setFavorites(favorites));
  },
  setProducts: products => {
    dispatch(setProducts(products));
  },
  setMyProducts: products => {
    dispatch(setMyProducts(products));
  },
});

ProductList.propTypes = {
  setFavorites: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
  setMyProducts: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList));
