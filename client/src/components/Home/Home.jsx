import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import heroVideo from '../images/video1.mp4';
import '../Home/home.css';

function Home() {
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
                <button className="explore__btn d-flex align-items-center gap-2">
                  <i className="ri-rocket-line"></i>
                  Explore
                </button>
                <button className="create__btn d-flex align-items-center gap-2">
                  <i className="ri-ball-pen-line"></i>
                  Create
                </button>
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
    </section>
  );
}

export default Home;
