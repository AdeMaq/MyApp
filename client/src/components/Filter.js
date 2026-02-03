import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./Filter.css";
import phonebanner from '../asserts/phonebanner.png';
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5001/brand";

const prices = [
  "PKR 0 - PKR 25000",
  "PKR 25000 - PKR 50000",
  "PKR 50000 - PKR 100000",
  "PKR 100000 - PKR 200000",
  "PKR 200000 - PKR 300000",
  "PKR 300000 - PKR 500000",
];

const Filter = () => {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };
    fetchBrands();
  }, []);

  const scrollToCard = (i) => {
    const container = carouselRef.current;
    if (!container || container.children.length === 0) return;
    const cardWidth = container.children[0].offsetWidth + 12;
    container.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  const nextSlide = () => {
    if (brands.length === 0) return;
    const nextIndex = (index + 1) % brands.length;
    setIndex(nextIndex);
    scrollToCard(nextIndex);
  };

  const prevSlide = () => {
    if (brands.length === 0) return;
    const prevIndex = (index - 1 + brands.length) % brands.length;
    setIndex(prevIndex);
    scrollToCard(prevIndex);
  };

  useEffect(() => {
    if (brands.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [index, brands]);

  return (
    <Container fluid className="mt-5">
      <Row className=" d-flex justify-content-between align-items-center">
        <Col><h2 className="mb-2">Shop by favorite Brands</h2></Col>
      </Row>

      <div className="brand-slider-wrapper">
        <Button variant="light" className="slider-arrow left" onClick={prevSlide}>
          &#8249;
        </Button>
        <div className="brand-slider" ref={carouselRef}>
          {brands.map((brand) => (
            <div className="brand-box" key={brand.brandId}>
              <Link
                key={brand.brandId}
                to={`/item?brandId=${brand.brandId}`}>
                <Image
                  src={brand.icon}
                  fluid
                />
              </Link>
              {/* <Image
                src={brand.icon}
                fluid
              /> */}
            </div>
          ))}
        </div>
        <Button variant="light" className="slider-arrow right" onClick={nextSlide}>
          &#8250;
        </Button>
      </div>

      <h2 className="mt-4 fw-bold">Shop By Price</h2>
      <Row>
        {prices.map((range, idx) => (
          <Col xs={6} md={4} lg={2} className="mb-5 mt-3" key={idx}>
            <Button className="price-button w-100" style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {range}
            </Button>
          </Col>
        ))}
      </Row>
      <div className="my-2">
        <Image src={phonebanner} alt="Banner" width="1200" height="164" fluid />
      </div>
    </Container>
  );
};

export default Filter;
