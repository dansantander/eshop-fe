import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Product from '../components/Product';
import mallsterApi from '../utils/api';
import { setProducts } from '../actions/actionsIndex';

class MyProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
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
    mallsterApi.getMyProducts(user)
      .then(result => {
        if (mounted) {
          this.setState({
            products: result.data.my_products,
            isLoading: false,
          });
        }
        setProducts(result.data.my_products);
        mounted = false;
      });
  }

  render() {
    const { products, isLoading } = this.state;
    return (
      <>
        { !isLoading ? (
          <div>
            <div className="container my-5">
              <div className="section-title">
                <h1>My Products</h1>
              </div>
              <div className="row">
                {
                  products.map(p => (
                    <Product
                      key={p.id}
                      product={p}
                      isMine
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

MyProducts.propTypes = {
  setProducts: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  setProducts: products => {
    dispatch(setProducts(products));
  },
});

export default connect(null, mapDispatchToProps)(withRouter(MyProducts));
