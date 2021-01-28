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
      myProductsState: [],
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
            myProductsState: result.data.my_products,
            isLoading: false,
          });
        }
        mounted = false;
        setMyProducts(result.data.my_products);
      });
  }

  componentDidUpdate() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { myProducts } = this.props;
    const { myProductsState } = this.state;
    if (myProducts !== myProductsState) {
      mallsterApi.getMyProducts(user)
        .then(result => {
          this.setState({
            myProductsState: result.data.my_products,
            isLoading: false,
          });
          setMyProducts(result.data.my_products);
        });
    }
  }

  render() {
    const { myProductsState, isLoading } = this.state;
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
                  myProductsState.map(p => (
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
  myProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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
