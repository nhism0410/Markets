import React from 'react';
import Home from './Home/Home'; // Import the Home component
import OrderList from './Ordersale/OrderList';
import SaleList from './Ordersale/SaleList';
import ProductForm from './Product/ProductForm';
import ProductList from './Product/ProductList';

class Main extends React.Component {
  render() {
    const { show, products, myProducts, orders, sales, captureFile, addProduct, createOrder, account } = this.props;

    if (show === 'home') {
      return (
        <div id="home">
          <Home />
        </div>
      );
    } else if (show === 'products') {
      return (
        <div id="products">
          <h2>Add a Product</h2>
          <ProductForm captureFile={captureFile} addProduct={addProduct} />
        </div>
      );
    } else if (show === 'productList') {
      return (
        <div id="products">
          <ProductList products={products} createOrder={createOrder} account={account} />
        </div>
      );
    } else if (show === 'orders') {
      return (
        <div id="products">
          <OrderList products={products} orders={orders} />
        </div>
      );
    } else if (show === 'sales') {
      return (
        <div id="products">
          <SaleList products={myProducts} sales={sales} />
        </div>
      );
    }
    return null; // Fallback if no matching case
  }
}

export default Main;
