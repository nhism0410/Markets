import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../Footer/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-between">
          <Col lg="3" md="6" sm="12" className="footer-logo">
            <h2 className="d-flex align-items-center">
              <i className="ri-fire-fill"></i>
              <span className="ms-2">HLK MARKETs</span>
            </h2>
            <p>
              Discover a new way to manage your digital assets. Join us for a
              seamless experience in the digital marketplace.
            </p>
          </Col>

          <Col lg="2" md="3" sm="6" className="footer-column">
            <h5>My Account</h5>
            <ul className="list-unstyled">
              <li>Profile</li>
              <li>Orders</li>
              <li>Wishlist</li>
              <li>Settings</li>
            </ul>
          </Col>

          <Col lg="2" md="3" sm="6" className="footer-column">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Documentation</li>
              <li>API</li>
            </ul>
          </Col>

          <Col lg="2" md="3" sm="6" className="footer-column">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Legal</li>
            </ul>
          </Col>

          <Col lg="3" md="6" sm="12" className="footer-newsletter">
            <h5>Subscribe to Our Newsletter</h5>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
            />
            <div className="social-links d-flex gap-3 mt-3">
              <a href="#" className="social-link">
                <i className="ri-facebook-line"></i>
              </a>
              <a href="#" className="social-link">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="social-link">
                <i className="ri-youtube-line"></i>
              </a>
              <a href="#" className="social-link">
                <i className="ri-github-line"></i>
              </a>
              <a href="#" className="social-link">
                <i className="ri-discord-line"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
