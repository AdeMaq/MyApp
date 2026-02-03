import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import {Award, Calendar, Truck } from "react-bootstrap-icons";
import "./Conditions.css";

const Warranty = () => {
  return (
    <Container fluid className="p-0 m-0 bg-light">
      <div className="px-3 py-4">
        <Row className="text-center text-md-end">
          <Col md={4} className="text-center">
            <div>
              <Award className="icon mb-2" />
              <h6 className="fw-bold">Best Price Guarantee</h6>
              <p className="text-muted">Some of the lowest prices that you’ll find</p>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div>
              <Calendar className="icon mb-2" />
              <h6 className="fw-bold">14 Day Check Warranty</h6>
              <p className="text-muted">Peace of mind & money back guarantee</p>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div>
              <Truck className="icon mb-2" />
              <h6 className="fw-bold">Free Express Shipping</h6>
              <p className="text-muted">Country Wide Free Express Shipping</p>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Warranty;
