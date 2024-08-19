import React from "react";
import { Button, Card ,Container, Row, Col} from "react-bootstrap";
import '../Product/list.css';
import heroVideo from '../images/video1.mp4';
import '../Home/home.css';


class ProductList extends React.Component {
  render() {
    const { products, createOrder, account } = this.props;

    console.log("Products in ProductList:", products); // Debug log

    return (
      <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2>
                The marketplace closer to you
                <span> Sell extraordinary </span> MARKETs
              </h2>
              <p>
                Experience a world where every piece tells a story, crafted with
                passion and ready to be discovered. Let your journey in the
                extraordinary begin today!
              </p>
              <div className="hero__btns d-flex align-items-center gap-4">
                <div className="explore__btn d-flex align-items-center gap-2">
                  <i className="ri-rocket-line"></i>
                  Explore
                </div>
                <div className="create__btn d-flex align-items-center gap-2">
                  <i className="ri-ball-pen-line"></i>
                  Create
                </div>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__video">
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                className="small-video"
              />
            </div>
          </Col>
        </Row>
        
      </Container>
   
      <div id="productList">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product, key) => (
            <Card key={key} className="product-card">
              <Card.Img variant="top" src={`https://gateway.pinata.cloud/ipfs/${product.imgHash}`} className="product-image" />
              <Card.Body>
                <Card.Text as="div">
                  <div>
                    <p className="productName">{product.name}</p>
                    <p className="productPrice">Price: {product.price} ETH</p>
                  </div>
                  {product.seller.toLowerCase() !== account.toLowerCase() && (
                    <Button variant="primary" onClick={() => createOrder(product.id, product.price)}>Buy
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    </Button>
                    

                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
      </section>
    );
  }
}

export default ProductList;
