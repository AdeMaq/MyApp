import React, { useRef, useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import "./New.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import green from '../asserts/green.png';
import { favouriteActions } from "../store/favourite-slice";
import { newActions } from '../store/new-slice';


const New = () => {
    const dispatch = useDispatch();
    const newList = useSelector((state) => state.new.itemsList);
    const cartItems = useSelector((state) => state.cart.items);
    const { AuthenticatedUserId } = useSelector((state) => state.auth);
    const favourites = useSelector((state) => state.favourite.itemsList);

    const carouselRef = useRef(null);
    const [index, setIndex] = useState(0);

    const scrollToCard = useCallback((i) => {
        const container = carouselRef.current;
        if (
            container &&
            container.children &&
            container.children.length > 0 &&
            container.children[0]
        ) {
            const cardWidth = container.children[0].offsetWidth + 12;
            container.scrollTo({ left: cardWidth * i, behavior: "smooth" });
        }
    }, []);

    const nextSlide = useCallback(() => {
        if (newList.length === 0) return;
        const nextIndex = (index + 1) % newList.length;
        setIndex(nextIndex);
        scrollToCard(nextIndex);
    }, [index, newList, scrollToCard]);

    const prevSlide = () => {
        if (newList.length === 0) return;
        const prevIndex = (index - 1 + newList.length) % newList.length;
        setIndex(prevIndex);
        scrollToCard(prevIndex);
    };

    useEffect(() => {
        if (newList.length === 0) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [newList.length, nextSlide]);

     useEffect(() => {
        const fetchProduct = async () => {
          try {
            const res = await fetch("http://localhost:5001/products");
            if (!res.ok) {
              throw new Error(`HTTP ${res.status}`);
            }
            const data = await res.json();
            const newItems = data.filter(item => item.type?.toLowerCase() === "new");
            dispatch(newActions.replaceData(newItems));
          } catch (err) {
            console.error("Failed to fetch new:", err);
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
        if (isInFavourites(item.id)) {
            alert("Already in favourites");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5001/favourites/${AuthenticatedUserId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: AuthenticatedUserId, productId: item.productId || item.id }),
            });
            if (!res.ok) throw new Error("Failed to add favourite");

            const newFav = await res.json();
            dispatch(favouriteActions.addFavourite({ ...item, favouriteId: newFav.favouriteId, productId: item.productId || item.id }));
        } catch (err) {
            console.error("Error adding favourite:", err);
        }
    };

    return (
        <Container fluid className="bg-white new-section mt-8">
            <Row className="justify-content-between align-items-center px-2 mb-3">
                <Col xs="auto">
                    <h2 className="mb-0 fw-bold">New Arrivals</h2>
                </Col>
                <Col className="text-end">
                    <div className="category-filters" style={{ fontSize: '12px' }}>
                        <Button variant="success" className="me-2">All</Button>
                        <Button variant="light" className="me-2">Mobiles & Tablets</Button>
                        <Button variant="light" className="me-2">Bags and Travel</Button>
                        <Button variant="light" className="me-2">Toys & Games</Button>
                        <Button variant="light" className="me-2">Bedding & Bath</Button>
                        <Button variant="light">Cameras</Button>
                    </div>
                </Col>
            </Row>
            <div className="position-relative w-100">
                <Button variant="light" className="carousel-button left" onClick={prevSlide}>{"<"}</Button>
                <div className="d-flex new-carousel no-scrollbar px-2" ref={carouselRef}>
                    {newList.length === 0 ? (
                        <div className="text-center p-4 w-100"> No new items available. </div>
                    ) : (
                        newList.map((item) => (
                            <Card key={item.id} className="mx-1 flex-shrink-0 product-card">
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
                                    <Card.Title style={{ fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.title}
                                    </Card.Title>
                                    <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '10px' }}>
                                        ⭐ (0) 🚚 {item.delivery}
                                    </div>
                                    <div className="fw-bold text-dark my-2" style={{ fontSize: '18px' }}>PKR {item.price}</div>
                                    <Button
                                        className={`w-100 ${isInCart(item.productId || item.id) ? "btn-dark" : "btn-success"}`}
                                        onClick={() => {
                                            if (!isInCart(item.productId || item.id)) {
                                                handleAddToCart(item);
                                            } else {
                                                dispatch(cartActions.toggleCart());
                                            }
                                        }}
                                    >
                                        {isInCart(item.productId || item.id) ? "View Cart" : "Add to Cart"}
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))
                    )};
                </div>
                <Button variant="light" className="carousel-button right" onClick={nextSlide}>{">"}</Button>
            </div>
        </Container>
    );
};

export default New;
