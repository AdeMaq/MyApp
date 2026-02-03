import { Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../asserts/logo.svg';

const WiseMarketIntro = () => {
  return (
    <div style={{ backgroundColor: 'white',minHeight: '100vh',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} style={{ padding: '2rem' }}>
            <h1 style={{ color: 'green', fontWeight: 'bold', fontSize: '3rem' }}>
              Welcome to Wise Market
            </h1>
            <p style={{ color: 'black', fontSize: '1.2rem', marginTop: '1rem' }}>
              Discover the smartest way to shop. From phones to accessories, explore a wide range of products with the best prices and trusted quality.
            </p>
            <Button variant="primary" style={{backgroundColor: '#007bff',border: 'none',padding: '0.75rem 1.5rem',marginTop: '1rem',fontWeight: '600'}}href="/signup" >
              Explore Now
            </Button>
          </Col>

          <Col md={6} style={{ textAlign: 'center' }}>
            <img
              src={logo}
              alt="Wise Market Preview"
              style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WiseMarketIntro;
