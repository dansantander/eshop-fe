import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import URL from '../helpers/url';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    let mounted = true;

    axios.get(`${URL}/favorites`, { params: { user: user.id } }, { withCredentials: true })
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

  render() {
    const { favorites, isLoading } = this.state;

    return (
      <>
        { !isLoading ? (
          <div>
            <div className="container  my-5">
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

export default Favorites;
