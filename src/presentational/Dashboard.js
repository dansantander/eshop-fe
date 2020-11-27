import React from 'react';
import Header from './Header';
import ProductList from '../containers/ProductList';

export default function Dashboard() {
  return (
    <div>
      <Header />
      <ProductList />
    </div>
  );
}
