import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setFavorites } from '../actions/actionsIndex';
import mallsterApi from '../utils/api';

class ProductDetails extends Component {
  static fillStar() {
    const star = document.getElementById('heart');
    star.classList.remove('far');
    star.classList.add('fas');
  }

  static outlineStar() {
    const star = document.getElementById('heart');
    star.classList.remove('fas');
    star.classList.add('far');
  }

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      favorites: [],
      successMessage: '',
      errorMessage: '',
      isLoading: true,
    };

    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { match } = this.props;
    const { id } = match.params;
    const { history } = this.props;
    let mounted = true;
    if (!user) {
      history.push('/');
    }

    mallsterApi.getSingleProduct(id)
      .then(res => {
        if (mounted) {
          this.setState({
            product: res.data,
            isLoading: false,
          });
          mounted = false;
        }
      });

    mallsterApi.getFavorites(user)
      .then(res => {
        this.setState({
          favorites: res.data.favProducts,
        });
        setFavorites(res.data.favProducts);
      });
  }

  componentDidUpdate() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { history } = this.props;
    if (!user) {
      history.push('/');
    }
  }

  findInFavorites() {
    const { match } = this.props;
    const { id } = match.params;
    const { favorites } = this.state;
    const favorite = favorites.some(f => f.id === parseInt(id, 10));
    const isFavorite = favorite;
    return isFavorite;
  }

  addToFavorites() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { match, setFavorites } = this.props;
    const { id } = match.params;

    mallsterApi.addFavorite(user, id)
      .then(res => {
        if (res.data.success) {
          this.setState({
            favorites: res.data.favProducts,
            successMessage: res.data.success,
          });
          setFavorites(res.data.favProducts);
          ProductDetails.fillStar();
        }
      }).catch(errors => {
        this.setState({
          errorMessage: errors.response.data.errors,
        });
      });
  }

  removeFromFavorites() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { match, setFavorites } = this.props;
    const { id } = match.params;

    mallsterApi.removeFavorite(user, id)
      .then(res => {
        if (res.data.success) {
          this.setState({
            favorites: res.data.favProducts,
            successMessage: res.data.success,
          });
          setFavorites(res.data.favProducts);
          ProductDetails.outlineStar();
        }
      }).catch(errors => {
        this.setState({
          errorMessage: errors.response.data.errors,
        });
      });
  }

  render() {
    const isFavorite = this.findInFavorites();
    const {
      product, isLoading, successMessage, errorMessage,
    } = this.state;

    return (
      <>
        { !isLoading ? (
          <div className="container">
            <div className="row">
              <div className="card product-details my-5 col-12 col-md-6 col-lg-4">
                {isFavorite
                  ? (
                    <i
                      id="heart"
                      tabIndex={0}
                      role="button"
                      aria-label="Mute volume"
                      className="fas fa-heart" // heart filled
                      onClick={() => this.removeFromFavorites()}
                      onKeyDown={() => this.removeFromFavorites()}
                    />
                  )
                  : (
                    <i
                      id="heart"
                      tabIndex={0}
                      role="button"
                      aria-label="Mute volume"
                      className="far fa-heart"
                      onClick={() => this.addToFavorites()}
                      onKeyDown={() => this.addToFavorites()}
                    />
                  )}
                <img alt="" className="card-img-top" src={product.image} />
                <div className="card-body">
                  <h3 className="product-name" data-testid="Title">
                    {product.name}
                  </h3>
                  <p data-testid="Actors">
                    {product.description}
                  </p>
                  <h3>
                    $
                    {product.price}
                  </h3>
                </div>
                { successMessage !== '' ? <div className="success">{successMessage}</div> : ''}
                { errorMessage !== '' ? <div className="error">{errorMessage}</div> : ''}
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
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  setFavorites: favorites => {
    dispatch(setFavorites(favorites));
  },
});

ProductDetails.propTypes = {
  setFavorites: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));
