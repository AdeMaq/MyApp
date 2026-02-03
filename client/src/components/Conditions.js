import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Shield, Award, Calendar, Truck } from "react-bootstrap-icons";
import phone from '../asserts/phone.svg';
import "./Conditions.css";

const conditions = [
  { label: "Brand New", icon: "" ,description: "A brand-new device shipped in its box sealed, fully warrantied, and in untouched condition in Pakistan."},
  { label: "As New", icon: "",description: "A brand-new device shipped in its box sealed, fully warrantied, and in untouched condition in Pakistan." },
  { label: "Excellent", icon: "",description: "A brand-new device shipped in its box sealed, fully warrantied, and in untouched condition in Pakistan." },
  { label: "Good", icon: "",description: "A brand-new device shipped in its box sealed, fully warrantied, and in untouched condition in Pakistan." },
  { label: "Fair", icon: "",description: "A brand-new device shipped in its box sealed, fully warrantied, and in untouched condition in Pakistan." },
];

const Conditions = () => {
  return (
    <Container fluid className="p-0 m-0 bg-light">
      <Row className="px-4 pt-5 align-items-center">
        <Col md={3}>
          <h4>
            Hey, <span className="text-success fw-bold">Condition Explained</span> by Wisemarket
          </h4>
          <p className="mt-3 text-muted">
            The mobile phones we offer come in 5 different conditions. These conditions are <strong>Brand New</strong>, <strong>As New</strong>, <strong>Good</strong>, and <strong>Fair</strong>. Pick your favorite one, depending on your price range.
          </p>
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-between flex-wrap">
            {conditions.map((item, idx) => (
              <div key={idx} className="text-center condition-image">
                <div className="condition-circle"><Image src={phone} rounded /></div>
                <div className="condition-label">{item.icon} {item.label}</div>
                <div className="condition-tooltip"><strong>{item.label}</strong><br/>{item.description}</div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <div className="px-4 mt-5 mb-2">
        <Row className="gy-4">
          <Col md={3}>
            <Card className="assured-card text-center">
              <Card.Body>
                <Card.Title className="fw-bold mt-2" style={{fontSize:'14px'}}><Shield className="icon" /> 12 Months Free Warranty</Card.Title>
                <Card.Text>
                  <a href="#" className="assured-link" style={{fontSize:'12px'}}>Only for brand new mobile phones</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="assured-card text-center">
              <Card.Body>
                
                <Card.Title className="fw-bold mt-2" style={{fontSize:'14px'}}><Award className="icon" /> Best Price Guarantee</Card.Title>
                <Card.Text>
                  <a href="#" className="assured-link" style={{fontSize:'12px'}}>Some of the lowest prices that you’ll find</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="assured-card text-center">
              <Card.Body>
                
                <Card.Title className="fw-bold mt-2" style={{fontSize:'14px'}}><Calendar className="icon" /> 14 Day Check Warranty</Card.Title>
                <Card.Text>
                  <a href="#" className="assured-link" style={{fontSize:'12px'}}>Peace of mind & money back guarantee</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="assured-card text-center">
              <Card.Body>
                
                <Card.Title className="fw-bold mt-2" style={{fontSize:'14px'}}><Truck className="icon" /> Free Express Shipping</Card.Title>
                <Card.Text>
                  <a href="#" className="assured-link" style={{fontSize:'12px'}}>Country Wide Free Express Shipping</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Conditions;
