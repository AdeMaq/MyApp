import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Card, Button, Image } from 'react-bootstrap';
import banner1 from '../asserts/crausal1.webp';
import banner2 from '../asserts/crausal2.webp';
import banner3 from '../asserts/crausal3.webp';
import sidecard1 from '../asserts/sidecard1.webp';
import sidecard2 from '../asserts/sidecard2.webp';
import NestedMenu from './NestedMenu';
import down from '../asserts/down.png';
import './NestedMenu.css';
import { Link } from 'react-router-dom';

const HeaderBanner = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hotOffersOpen, setHotOffersOpen] = useState(false);
  const [ventTypes, setVentTypes] = useState([]);

  useEffect(() => {
    const fetchVentTypes = async () => {
      try {
        const res = await fetch("http://localhost:5001/vent");
        const  data = await res.json();
        setVentTypes(data);
      } catch (err) {
        console.error("Error fetching vent hierarchy:", err);
      }
    };
    fetchVentTypes();
  }, []);

  return (
    <div style={{ width: '1008px', height: '380px', margin: '0 auto', padding: 0 }}>
      <Container fluid
        style={{ height: '50px', backgroundColor: 'white', padding: 0, position: 'relative' }}
      >
        <Row className="align-items-center h-100 g-0 m-0">
          <Col md={6} className="d-flex align-items-center p-0" style={{ marginLeft: '30px' }}>
            <div
              onMouseEnter={() => setHotOffersOpen(true)}
              onMouseLeave={() => setHotOffersOpen(false)}
              className="fw-bold text-danger"
              style={{ fontSize: '14px', cursor: 'pointer', display: 'inline-block', position: 'relative', }}>
              🔥 Hot Offers
              <span style={{ marginLeft: '4px' }}>
                <Image src={down} alt="down" style={{ width: '13px', height: '13px' }} />
              </span>
              {hotOffersOpen && (
                <div
                  style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '10px', minWidth: '240px', zIndex: 1000, }}
                >
                  <div style={{ cursor: 'pointer' }}>
                    Spring Sale up to 30% off
                  </div>
                </div>
              )}
            </div>
            {ventTypes.map((ventType, index) => (
              <div
                key={ventType.ventTypeId}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className="ms-4"
                style={{
                  position: 'relative',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
              >
                <Link
                  to={`/brand?ventTypeId=${ventType.ventTypeId}`}
                  className="text-decoration-none text-dark"
                  style={{ fontSize: '14px' }}
                >
                  {ventType.name}
                </Link>
                {activeIndex === index && ventType.vents?.length > 0 && (
                  <NestedMenu items={ventType.vents} level={0} />
                )}
              </div>
            ))}
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-end p-0"
            style={{ marginLeft: '120px', gap: '5px' }}
          >
            <Button
              className="rounded-pill"
              style={{
                background: 'linear-gradient(to right, #8de7a3ff, #524c98ff)',
                border: 'none',
                padding: '12px',
              }}
            >
              WiseWheels
            </Button>
            <Button
              className="rounded-pill"
              style={{
                background: 'linear-gradient(to right, #ff3cac, #784ba0)',
                border: 'none',
                padding: '12px',
              }}
            >
              Auctions
            </Button>
            <Button
              className="rounded-pill"
              style={{
                background: 'linear-gradient(to right, #30cfd0, #330867)',
                border: 'none',
                padding: '12px',
              }}
            >
              Mobile Repair
            </Button>
          </Col>
        </Row>
      </Container>

      <Container fluid className="mt-2 p-0">
        <Row className="g-0 m-0">
          <Col md={9} className="p-0">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block"
                  src={banner1}
                  alt="Banner 1"
                  style={{ width: '782px', height: '330px', objectFit: 'cover' }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block"
                  src={banner2}
                  alt="Banner 2"
                  style={{ width: '782px', height: '330px', objectFit: 'cover' }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block"
                  src={banner3}
                  alt="Banner 3"
                  style={{ width: '782px', height: '330px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col md={3} className="d-flex flex-column justify-content-between" style={{ paddingLeft: '16px' }}>
            <Card style={{ width: '195px', height: '137px' }}>
              <Card.Img variant="top" src={sidecard1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Card>
            <Card style={{ width: '195px', height: '137px' }}>
              <Card.Img variant="top" src={sidecard2} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderBanner;
