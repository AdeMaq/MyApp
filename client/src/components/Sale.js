import React, { useRef, useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import "./Sale.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import seearrow from '../asserts/seearrow.png';
import green from '../asserts/green.png';
import { favouriteActions } from '../store/favourite-slice';
import { saleActions } from '../store/sale-slice';

const Sale = () => {
  const dispatch = useDispatch();
  const saleList = useSelector((state) => state.sale.itemsList);
  const cartItems = useSelector((state) => state.cart.items);
  const { AuthenticatedUserId } = useSelector((state) => state.auth);
  const favourites = useSelector((state) => state.favourite.itemsList);

  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);

  const scrollToCard = useCallback((i) => {
    const container = carouselRef.current;
    if (container?.children?.length > 0) {
      const cardWidth = container.children[0].offsetWidth + 12;
      container.scrollTo({ left: cardWidth * i, behavior: "smooth" });
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (saleList.length === 0) return;
    const nextIndex = (index + 1) % saleList.length;
    setIndex(nextIndex);
    scrollToCard(nextIndex);
  }, [index, saleList, scrollToCard]);

  const prevSlide = useCallback(() => {
    if (saleList.length === 0) return;
    const prevIndex = (index - 1 + saleList.length) % saleList.length;
    setIndex(prevIndex);
    scrollToCard(prevIndex);
  }, [index, saleList, scrollToCard]);

  useEffect(() => {
    if (saleList.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, saleList.length]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("http://localhost:5001/products");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        const saleItems = data.filter(item => item.type?.toLowerCase() === "sale");
        dispatch(saleActions.replaceData(saleItems));
      } catch (err) {
        console.error("Failed to fetch sale:", err);
      }
    };

    fetchProduct();
  }, [dispatch]);

  const isInCart = (productId) => {
    return Array.isArray(cartItems) && cartItems.some((item) => item.productId === productId);
  };
  
  const handleAddToCart = async (item) => {
    if (!AuthenticatedUserId) {
      alert("Please log in to add to cart");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5001/cart/${AuthenticatedUserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.productId || item.id,
          quantity: 1
        })
      });
      if (!res.ok) throw new Error("Failed to add item");
      const cartRes = await fetch(`http://localhost:5001/cart/${AuthenticatedUserId}`);
      if (!cartRes.ok) throw new Error("Failed to fetch updated cart");

      const updatedCart = await cartRes.json();
      dispatch(cartActions.setAddToCart(updatedCart));
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const isInFavourites = (productId) => {
    return Array.isArray(favourites) && favourites.some((fav) => fav.productId === productId);
  };

  const handleAddFavourite = async (item) => {
    if (!AuthenticatedUserId) {
      alert("Please log in to add to favourites");
      return;
    }
    if (isInFavourites(item.productId || item.id)) {
      alert("Already in favourites");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/favourites/${AuthenticatedUserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: AuthenticatedUserId, productId: item.productId || item.id }),
      });
      if (!res.ok) {
        const errMsg = (await res.json()).message || "Failed to add favourite";
        alert(errMsg);
        return;
      }
      const newFav = await res.json();
      dispatch(favouriteActions.addFavourite({ ...item, favouriteId: newFav.favouriteId, productId: item.productId || item.id }));
    } catch (err) {
      console.error("Error adding favourite:", err);
    }
  };

  return (
    <Container fluid className="bg-white sale-section mt-8">
      <Row className="justify-content-between align-items-center px-2 mb-3">
        <Col xs="auto">
          <h2 className="fw-bold">Spring Sale up to 30% OFF</h2>
        </Col>
        <Col className="text-end">
          <a href="/front/favourite" className="fw-medium text-dark text-decoration-none fs-6">
            See All <Image src={seearrow} alt="favourite" className="img" />
          </a>
        </Col>
      </Row>

      <div className="position-relative w-100">
        <Button variant="light" className="carousel-button left" onClick={prevSlide}>{'<'}</Button>
        <div className="d-flex sale-carousel no-scrollbar px-2" ref={carouselRef}>
          {saleList.length === 0 ? (
            <div className="text-center p-4 w-100"> No new items available. </div>
          ) : (
            saleList.map((item) => (
              <Card key={item.id} className="mx-1 flex-shrink-0 product-card">
                <div className="position-absolute top-0 start-0 m-2">
                  <div className="bg-danger text-white px-2 py-1 rounded small" style={{ fontSize: '10px' }}>
                    {item.discount}
                  </div>
                </div>
                <div className="position-absolute top-0 end-0 m-2">
                  <Button
                    variant="light"
                    className="p-1 rounded"
                    onClick={() => handleAddFavourite(item)}
                  >
                    <Image src={green} alt="favourite" className="img" />
                  </Button>
                </div>
                <div className="text-center p-3" style={{ height: '150px' }}>
                  <Image src={item.image} alt={item.title} fluid style={{ maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <Card.Body className="pt-1">
                  <p className="text-muted mb-1" style={{ fontSize: '10px' }}>{item.condition}</p>
                  <Card.Title style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.title}
                  </Card.Title>
                  <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '10px' }}>
                    ⭐ (0) 🚚 {item.delivery}
                  </div>
                  <div className="fw-bold text-dark my-1" style={{ fontSize: '18px' }}>
                    PKR {item.newPrice ? item.newPrice.toLocaleString() : (item.price ? item.price.toLocaleString() : 'N/A')}
                  </div>
                  <div className="text-muted text-decoration-line-through" style={{ fontSize: '14px' }}>
                    PKR {item.price ? item.price.toLocaleString() : 'N/A'}
                  </div>
                  <Button
                    className={`w-100 ${isInCart(item.productId || item.id) ? "btn-dark" : "btn-success"} mt-2`}
                    onClick={() => {
                      if (!isInCart(item.productId || item.id)) {
                        handleAddToCart(item);
                      }
                    }}>
                    {isInCart(item.productId || item.id) ? "View Cart" : "Add to Cart"}
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
        <Button variant="light" className="carousel-button right" onClick={nextSlide}>{'>'}</Button>
      </div>
    </Container>
  );
};

export default Sale;