import axios from 'axios';
import URL from '../helpers/url';

const mallsterApi = (() => {
  const getProducts = async () => {
    const response = axios.get(`${URL}/products`, { withCredentials: true });
    const products = await response;
    return products;
  };

  const getMyProducts = async user => {
    const response = axios.get(`${URL}/my_products`, { params: { user: user.id } }, { withCredentials: true });
    const products = await response;
    return products;
  };

  const getSingleProduct = async id => {
    const response = axios.get(`${URL}/products/${id}`, { withCredentials: true });
    const product = await response;
    return product;
  };

  const getFavorites = async user => {
    const response = axios.get(`${URL}/favorites`, { params: { user: user.id } }, { withCredentials: true });
    const favorites = await response;
    return favorites;
  };

  const addFavorite = async (user, id) => {
    const response = axios.post(`${URL}/favorites`, { product_id: id, user: user.id }, { withCredentials: true });
    const favorites = await response;
    return favorites;
  };

  const removeFavorite = async (user, id) => {
    const response = axios.delete(`${URL}/favorites/${id}`, { data: user.id }, { withCredentials: true });
    const favorites = await response;
    return favorites;
  };

  /* eslint-disable-next-line camelcase */
  const signUpUser = async (username, email, password, password_confirmation) => {
    const response = axios.post(`${URL}/registrations`, {
      registration: {
        username,
        email,
        password,
        password_confirmation,
      },
    },
    { withCredentials: true });
    const user = await response;
    return user;
  };

  const signInUser = async (email, password) => {
    const response = axios.post(`${URL}/sessions`,
      {
        session: {
          email,
          password,
        },
      },
      { withCredentials: true });
    const user = await response;
    return user;
  };

  return {
    getProducts,
    getFavorites,
    getMyProducts,
    getSingleProduct,
    addFavorite,
    removeFavorite,
    signUpUser,
    signInUser,
  };
})();

export default mallsterApi;
