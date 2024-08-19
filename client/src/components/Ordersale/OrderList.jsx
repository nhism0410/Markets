import React from "react";
import { Card } from "react-bootstrap";
import '../Ordersale/order.css';

// Helper function to truncate seller information
const truncateSeller = (seller) => {
  if (seller.length <= 15) {
    return seller; // Return the full seller if it's short enough
  }
  return `${seller.substring(0, 10)}...${seller.substring(seller.length - 5)}`;
};

class OrderList extends React.Component {
  render() {
    return (
      <div id="orderList">
        {this.props.orders?.map((order, key) => (
          <Card key={key} className="order-card">
            <Card.Img variant="top" src={`https://gateway.pinata.cloud/ipfs/${order.imgHash}`} className="order-image" />
            <Card.Body>
              <Card.Text as="div">
                <div>
                  <p className="productName">{order.name}</p>
                  <p className="productPrice">Price: {order.price} ETH</p>
                  <p className="productBuyer">Seller: {truncateSeller(order.seller)}</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default OrderList;
