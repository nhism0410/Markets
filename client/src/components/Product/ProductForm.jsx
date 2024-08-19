import React from "react";
import { Button, Form } from "react-bootstrap";
import '../Product/form.css'; // Ensure this path is correct
import productImage from '../images/nezukoo.jpg'
// Import the image from the assets folder
 // Adjust the path according to your folder structure

class ProductForm extends React.Component {
  render() {
    return (
      <Form onSubmit={(event) => {
        event.preventDefault();
        let name = this.productName.value;
        let price = this.productPrice.value;
        this.props.addProduct(name, price);
      }} className="d-flex align-items-center">
        <div className="image-container me-3">
          <img
            src={productImage} // Use the imported image here
            alt="Product"
            className="form-image"
          />
        </div>
        <div className="form-fields flex-grow-1">
          <Form.Group className="mb-3" controlId="productFormFile">
            <Form.Control type="file" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productFormName">
            <Form.Control type="text" ref={(input) => { this.productName = input }} placeholder="Enter Name of the Product" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productFormPrice">
            <Form.Control type="number" ref={(input) => { this.productPrice = input }} placeholder="Enter Price in ETH" required />
          </Form.Group>
          <Button style={{ width: "100%" }} variant="primary" type="submit">
            Upload!
          </Button>
        </div>
      </Form>
    )
  }
}

export default ProductForm;
