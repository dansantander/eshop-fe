import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { setFavorites } from '../actions/actionsIndex';
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
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
    const { match } = this.props;
    const { id } = match.params;
    let mounted = true;

    axios.get(`http://localhost:3001/products/${id}`, { withCredentials: true })
      .then(res => {
        if (mounted) {
          this.setState({
            product: res.data,
            isLoading: false,
          });
          mounted = false;
        }
      });

    axios.get('http://localhost:3001/favorites', { withCredentials: true })
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
    console.log('entered');
    const { match, setFavorites } = this.props;
    const { id } = match.params;
    axios.post('http://localhost:3001/favorites', {
      product_id: id,
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
      }).catch(error => {
        console.log('create favorite error', error);
      });
  }

  removeFromFavorites() {
    const { match, setFavorites } = this.props;
    const { id } = match.params;
    axios.delete(`http://localhost:3001/favorites/${id}`,
      { withCredentials: true })
      .then(res => {
        if (res.data.status === 'removed') {
          this.setState({
            favorites: res.data.favProducts,
          });
          setFavorites(res.data.favProducts);
          ProductDetails.outlineStar();
        }
      }).catch(error => {
        console.log('favorite delete error', error);
      });
  }

  render() {
    const isFavorite = this.findInFavorites();
    const { product, isLoading, favorites } = this.state;
    console.log('state favorites', favorites);
    return (
      <>
        { !isLoading ? (
          <div className="container">
            <div className="card movie-details my-5">
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
                <h3 className="" data-testid="Title">
                  {product.name}
                </h3>
                <h5 className="" data-testid="Actors">
                  {product.description}
                </h5>
                <p className="">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h3>Loading...</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));
