import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Product from '../components/Product';
import mallsterApi from '../utils/api';
import { setProducts } from '../actions/actionsIndex';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      products: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { products } = this.state;
    const { setProducts } = this.props;
    const { history } = this.props;
    if (!user) {
      history.push('/');
    }
    setProducts(products);
    let mounted = true;
    mallsterApi.getFavorites(user)
      .then(result => {
        if (mounted) {
          this.setState({
            favorites: result.data.favProducts,
            isLoading: false,
          });
          mounted = false;
        }
      });
  }

  componentDidUpdate() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { history } = this.props;
    if (!user) {
      history.push('/');
    }
  }

  render() {
    const { favorites, isLoading } = this.state;

    return (
      <>
        { !isLoading ? (
          <div>
            <div className="container my-5">
              <div className="section-title">
                <h1>My Favorites</h1>
              </div>
              <div className="row">
                {
                  favorites.map(p => (
                    <Product key={p.id} product={p} isFav={favorites.some(f => f.id === p.id)} />
                  ))
                }
              </div>
            </div>
          </div>
        )
          : (
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
  setProducts: products => {
    dispatch(setProducts(products));
  },
});

Favorites.propTypes = {
  setProducts: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Favorites));
