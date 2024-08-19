import React from "react";
import { Card } from "react-bootstrap";
import '../Ordersale/sale.css';

// Helper function to truncate seller information
const truncateSeller = (seller) => {
  if (seller.length <= 15) {
    return seller; // Return the full seller if it's short enough
  }
  return `${seller.substring(0, 10)}...${seller.substring(seller.length - 5)}`;
};

class SaleList extends React.Component {
  render() {
    return (
      <div id="salesList">
        {this.props.sales?.map((sale, key) => (
          <Card key={key} className="sale-card">
            <Card.Img variant="top" src={`https://gateway.pinata.cloud/ipfs/${sale.imgHash}`} className="sale-image" />
            <Card.Body>
              <Card.Text as="div">
                <div>
                  <p className="productName">{sale.name}</p>
                  <p className="productPrice">Price: {sale.price} ETH</p>
                  <p className="productBuyer">Seller: {truncateSeller(sale.seller)}</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default SaleList;
