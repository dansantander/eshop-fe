import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { addFavorite, removeFavorite } from '../actions/actionsIndex';
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
      .then(result => {
        if (mounted) {
          this.setState({
            product: result.data,
            isLoading: false,
          });
          mounted = false;
        }
      });
  }

  addToFavorites() {
    console.log('entered');
    const { match, addFavorite } = this.props;
    const { id } = match.params;
    axios.post('http://localhost:3001/favorites', {
      product_id: id,
    },
    { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          addFavorite(response.data.favorite);
          ProductDetails.fillStar();
        }
      }).catch(error => {
        console.log('create favorite error', error);
      });
  }

  removeFromFavorites() {
    const { match } = this.props;
    const { id } = match.params;
    axios.delete(`http://localhost:3001/favorites/${id}`,
      { withCredentials: true })
      .then(response => {
        if (response.data.status === 'removed') {
          console.log(' favorite deleted', response);
          ProductDetails.outlineStar();
        }
      }).catch(error => {
        console.log('favorite delete error', error);
      });
  }

  render() {
    const { product, isLoading } = this.state;
    const { location } = this.props;
    const { isFav } = location.state;
    return (
      <>
        { !isLoading ? (
          <div className="container">
            <div className="card movie-details my-5">
              {isFav
                ? (
                  <i
                    id="heart"
                    tabIndex={0}
                    role="button"
                    aria-label="Mute volume"
                    className="fas fa-heart"
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
  favorites: state.favorites.favorites,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: favorite => {
    dispatch(addFavorite(favorite));
  },
  removeFavorite: favorite => {
    dispatch(removeFavorite(favorite));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));
