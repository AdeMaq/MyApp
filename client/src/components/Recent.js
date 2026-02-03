import React, { useRef, useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import "./Recent.css";
import phonebanner from "../asserts/phonebanner.png";
import banner1 from "../asserts/banner1.webp";
import banner2 from "../asserts/banner2.webp";
import banner3 from "../asserts/banner3.webp";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import green from '../asserts/green.png';
import seearrow from '../asserts/seearrow.png';
import { favouriteActions } from '../store/favourite-slice';
import { recentActions } from '../store/recent-slice';

const Recent = () => {
  const dispatch = useDispatch();
  const recent = useSelector((state) => state.recent.itemsList);
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
    if (recent.length === 0) return;
    const nextIndex = (index + 1) % recent.length;
    setIndex(nextIndex);
    scrollToCard(nextIndex);
  }, [index, recent, scrollToCard]);

  const prevSlide = useCallback(() => {
    if (recent.length === 0) return;
    const prevIndex = (index - 1 + recent.length) % recent.length;
    setIndex(prevIndex);
    scrollToCard(prevIndex);
  }, [index, recent, scrollToCard]);

  useEffect(() => {
    if (recent.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, recent.length]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("http://localhost:5001/products");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        const recentItems = data.filter(item => item.type?.toLowerCase() === "recent");
        dispatch(recentActions.replaceData(recentItems));
      } catch (err) {
        console.error("Failed to fetch recent:", err);
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
      const res = await fetch(`http://localhost:5001/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: AuthenticatedUserId,
          productId: item.productId || item.id,
          title: item.title,
          price: item.price,
          quantity: 1,
          image: item.image,
          condition: item.condition
        })
      });
      if (!res.ok) throw new Error("Failed to add item");
      const newItem = await res.json();
      dispatch(cartActions.addToCart(newItem));
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
    <Container fluid className="m-0 p-0 bg-white">
      <Row className="d-flex justify-content-between align-items-center">
        <Col>
          <h2 className="mb-2">Recent Products</h2>
        </Col>
        <Col className="text-end"><a href="/collections" className="fw-medium text-dark text-decoration-none fs-6" style={{ color: 'black' }}>See All <Image src={seearrow} alt="favourite" className="img" /> </a></Col>
      </Row>

      <div className="position-relative w-100">
        <Button variant="light" className="carousel-button left" onClick={prevSlide}>{'<'}</Button>
        <div className="d-flex recent-carousel no-scrollbar" ref={carouselRef}>
          {recent.length === 0 ? (
            <div className="text-center p-4 w-100">No recent items available.</div>
          ) : (
            recent.map((item) => (
              <Card key={item.id} className="mx-1 flex-shrink-0" style={{ width: "200px" }}>
                <div className="position-absolute top-0 end-0 m-2">
                  <Button
                    variant="light"
                    className="p-1 rounded"
                    onClick={() => handleAddFavourite(item)}
                  >
                    <Image src={green} alt="favourite" className="img" />
                  </Button>
                </div>

                <div className="text-center p-3" style={{ height: "150px" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fluid
                    style={{ maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
                <Card.Body className="pt-1">
                  <p className="text-muted mb-1" style={{ fontSize: "10px" }}>
                    {item.condition}
                  </p>
                  <Card.Title
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Card.Title>
                  <div className="d-flex justify-content-between text-muted" style={{ fontSize: "10px" }}>
                    <span>⭐ (0) 🚚 {item.delivery}</span>
                  </div>
                  <div className="fw-bold text-dark my-2" style={{ fontSize: "18px" }}>
                    PKR {item.price}
                  </div>
                  <Button
                    className={`w-100 ${item.tag === "Pre Order" ? "btn-dark" : isInCart(item.productId || item.id) ? "btn-dark" : "btn-success"
                      }`}
                    onClick={() => {
                      if (!isInCart(item.productId || item.id) && item.tag !== "Pre Order") {
                        handleAddToCart(item);
                      }
                    }}
                  >
                    {item.tag === "Pre Order"
                      ? "Pre Order"
                      : isInCart(item.productId || item.id)
                        ? "View Cart"
                        : "Add to Cart"}
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
        <Button variant="light" className="carousel-button right" onClick={nextSlide}>{'>'}</Button>
      </div>

      <div className="my-4">
        <Image src={phonebanner} alt="Banner" width="1200" height="164" fluid />
      </div>

      <div>
        <h2>
          Special Offers{" "}
          <span className="text-muted small">
            Wisemarket Find Best Of The Best Phones For You Only
          </span>
        </h2>
      </div>

      <Row className="mb-3 px-3">
        {[banner1, banner2, banner3].map((img, i) => (
          <Col key={i} xs="auto" className="p-1">
            <Image src={img} alt={`Banner ${i + 1}`} width="292" height="146" rounded />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Recent;
