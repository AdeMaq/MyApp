import React, { useRef, useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Auction.css";
import { auctionActions } from "../store/auction-slice";
import seearrow from '../asserts/seearrow.png';

const formatTime = (seconds) => {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${d}d : ${h}h : ${m}m : ${s}s`;
};


const Auction = () => {
  const items = useSelector((state) => state.auction.itemsList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch("http://localhost:5001/auctions"); 
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        dispatch(auctionActions.replaceData(data)); 
      } catch (err) {
        console.error("Failed to fetch auctions:", err);
      }
    };

    fetchAuctions();
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(auctionActions.tick());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);



  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);

  const scrollToCard = (i) => {
    const container = carouselRef.current;
    if (container && container.children.length > 0) {
      const cardWidth = container.children[0].offsetWidth + 12;
      container.scrollTo({ left: cardWidth * i, behavior: "smooth" });
    }
  };

  const nextSlide = useCallback(() => {
    if (items.length === 0) return;
    const nextIndex = (index + 1) % items.length;
    setIndex(nextIndex);
    scrollToCard(nextIndex);
  },[index,items]);

  const prevSlide = () => {
    if (items.length === 0) return;
    const prevIndex = (index - 1 + items.length) % items.length;
    setIndex(prevIndex);
    scrollToCard(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <Container fluid className="m-0 p-0 bg-light">
      <Row className="justify-content-between align-items-center" style={{ paddingTop: '10px' }}>
        <Col><h2 className="mb-2">Latest Auction</h2></Col>
        <Col className="text-end"><a href="/collections" className="fw-medium text-dark text-decoration-none fs-6" style={{ color: 'black' }}>See All <Image src={seearrow} alt="favourite" className="img" /> </a></Col>
      </Row>

      <div className="position-relative w-100">
        <Button variant="light" className="carousel-button prev" onClick={prevSlide}>{'<'}</Button>

        <div className="d-flex auction-carousel no-scrollbar" ref={carouselRef}>
          {items.length === 0 ? (
            <div className="text-center p-4">No auction items available.</div>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="mx-1 flex-shrink-0" style={{ width: '200px' }}>
                <div className="gradient-banner">{item.title}</div>

                <span className="custom-live-badge">
                  <span className="custom-live-icon" />
                  <div className="custom-live-wrapper">
                    <div className="custom-live-content">
                      <span className="custom-live-text">Live</span>
                    </div>
                  </div>
                </span>

                <div className="auction-image-wrapper">
                  {/* <a href="#" className="auction-image-link"> */}
                    <Image
                      style={{ width: '170px', height: '150px' }}
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="auction-img"
                      fluid
                    />
                  {/* </a> */}
                </div>

                <div className="auction-time">{formatTime(item.timeLeftSeconds)}</div>

                <div className="auction-price mt-2">
                  <span>Starting At:</span> <strong>PKR {item.startingPrice}</strong>
                </div>

                <Button className="bid-now">Bid Now</Button>
              </Card>
            ))
          )}
        </div>

        <Button variant="light" className="carousel-button next" onClick={nextSlide}>{'<'}</Button>
      </div>
    </Container>
  );
};

export default Auction;
