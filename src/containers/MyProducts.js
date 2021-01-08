import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Product from '../components/Product';
import ProductForm from './ProductForm';
import mallsterApi from '../utils/api';
import { setMyProducts } from '../actions/actionsIndex';

class MyProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProducts: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { history } = this.props;
    const { setMyProducts } = this.props;
    let mounted = true;
    if (!user) {
      history.push('/');
    }
    mallsterApi.getMyProducts(user)
      .then(result => {
        if (mounted) {
          this.setState({
            myProducts: result.data.my_products,
            isLoading: false,
          });
        }
        setMyProducts(result.data.my_products);
        mounted = false;
      });
  }

  render() {
    const { myProducts, isLoading } = this.state;
    return (
      <>
        { !isLoading ? (
          <div>
            <div className="container my-5">
              <div className="section-title">
                <h1>My Products</h1>
              </div>
              <ProductForm />
              <div className="row">
                {
                  myProducts.map(p => (
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

const mapStateToProps = state => ({
  myProducts: state.myProducts,
});

MyProducts.propTypes = {
  setMyProducts: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  setMyProducts: products => {
    dispatch(setMyProducts(products));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyProducts));
