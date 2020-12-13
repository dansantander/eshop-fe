import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setFavorites } from '../actions/actionsIndex';
import URL from '../helpers/url';

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
      isLoading: true,
    };

    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { match } = this.props;
    const { id } = match.params;
    let mounted = true;

    axios.get(`${URL}/products/${id}`, { withCredentials: true })
      .then(res => {
        if (mounted) {
          this.setState({
            product: res.data,
            isLoading: false,
          });
          mounted = false;
        }
      });

    axios.get(`${URL}/favorites`, { params: { user: user.id } }, { withCredentials: true })
      .then(res => {
        this.setState({
          favorites: res.data.favProducts,
        });
        setFavorites(res.data.favProducts);
      });
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
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { match, setFavorites } = this.props;
    const { id } = match.params;
    axios.post(`${URL}/favorites`, {
      product_id: id,
      user: user.id,
    },
    { withCredentials: true })
      .then(res => {
        if (res.data.status === 'created') {
          this.setState({
            favorites: res.data.favProducts,
          });
          setFavorites(res.data.favProducts);
          ProductDetails.fillStar();
        }
      });
  }

  removeFromFavorites() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { match, setFavorites } = this.props;
    const { id } = match.params;
    axios.delete(`${URL}/favorites/${id}`, { user: user.id },
      { withCredentials: true })
      .then(res => {
        if (res.data.status === 'removed') {
          this.setState({
            favorites: res.data.favProducts,
          });
          setFavorites(res.data.favProducts);
          ProductDetails.outlineStar();
        }
      });
  }

  render() {
    const isFavorite = this.findInFavorites();
    const { product, isLoading } = this.state;

    return (
      <>
        { !isLoading ? (
          <div className="container">
            <div className="card product-details my-5">
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
                <p className="" data-testid="Actors">
                  {product.description}
                </p>
                <h3 className="">
                  {product.price}
                </h3>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));
