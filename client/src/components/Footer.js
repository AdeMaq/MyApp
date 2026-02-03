import React from 'react';
import { Container,Row,Col,Button,Image} from 'react-bootstrap';
import {FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn,FaMapMarkerAlt, FaPhone, FaEnvelope, FaShoppingBag, FaPlus} from 'react-icons/fa';
import whitelogo from '../asserts/whitelogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1F2323', color: 'white', paddingTop: '40px', paddingBottom: '20px' }}>
      <Container>
        <Row className="gy-4 align-items-start">
          <Col lg={2}>
            <img src={whitelogo} alt="Wise Market Logo" style={{ width: '160px', marginBottom: '20px' }} />
            <p style={{fontSize:"12px" }}><FaMapMarkerAlt /> 40 L block Johar Town</p>
            <p style={{fontSize:"12px" }}><FaPhone /> 042 1111 09473</p>
            <p style={{fontSize:"12px" }}><FaEnvelope /> info@wisemarket.com.pk</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <a href="#" style={{ color: 'white' }}><FaFacebookF /></a>
              <a href="#" style={{ color: 'white' }}><FaInstagram /></a>
              <a href="#" style={{ color: 'white' }}><FaTwitter /></a>
              <a href="#" style={{ color: 'white' }}><FaLinkedinIn /></a>
            </div>
          </Col>
          <Col lg={1}></Col>
          <Col lg={2}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">FAQ's</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">Contact Us</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">Blogs</a></li>
            </ul>
          </Col>
          <Col lg={2}>
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Return Policy</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">Privacy Policy</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">Refund-&-Shipping</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">Warranty</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">Terms and Conditions</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">Auction Terms</a></li>
            </ul>
          </Col>
          <Col lg={2}>
            <h5>My Account</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Sign In</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">View Cart</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">My Wishlist</a></li>
              <li style={{ paddingTop:'0px' }}><a href="#" className="footer-link">Help</a></li>
            </ul>
          </Col>
          <Col lg={2} style={{ paddingTop:'20px' }}>
            <Button variant="success" className="w-75 mb-2" style={{ padding:'10px',fontSize:'12px', backgroundColor: '#1BAB6E', border: 'none' }}><FaPlus /> Create Auction</Button>
            <Button variant="success" className="w-75 mb-2" style={{ marginTop:'10px',padding:'10px',fontSize:'12px',backgroundColor: '#1BAB6E', border: 'none' }}><FaShoppingBag /> Become a Seller</Button>
            <p style={{ fontSize: '10px', color: '#aaa', marginTop: '10px' }}>
              Reach millions of customers nationwide through wisemarket. A leading smart devices platform in Pakistan
            </p>
          </Col>
          <Col lg={2} className="d-none d-lg-block"></Col>
        </Row>
      </Container>
      <div style={{ borderTop: '1px solid #353535', marginTop: '30px', padding: '20px 0', backgroundColor: '#1F2323' }}>
        <Container className="d-flex flex-wrap justify-content-between align-items-center">
          <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
            © 2025 WiseMarket. All Rights Reserved.
          </p>
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '12px', color: '#ccc' }}>We are using safe payments:</span>
            <img
              src="https://media.wisemarket.com.pk/config/1704456252-payment_method_image.svg"
              alt="Payment Methods" style={{ height: '20px', maxWidth: '70%' }} loading="lazy"/>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
