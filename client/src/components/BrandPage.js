import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import green from "../asserts/green.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5001/products";

const BrandPage = ({ title, type, handleAddFavourite, handleAddToCart }) => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const cartItems = useSelector((state) => state.cart.items);

    const isInCart = (id) => {
        return cartItems.some((item) => item.id === id || item.productId === id);
    };

    const query = new URLSearchParams(location.search);
    const ventTypeId = query.get("ventTypeId");
    const ventId = query.get("ventId");
    const ventItemId = query.get("ventItemId");
    const ventItemTypeId = query.get("ventItemTypeId");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `${API_URL}?`;
                if (ventTypeId) url += `ventTypeId=${ventTypeId}&`;
                if (ventId) url += `ventId=${ventId}&`;
                if (ventItemId) url += `ventItemId=${ventItemId}&`;
                if (ventItemTypeId) url += `ventItemTypeId=${ventItemTypeId}&`;

                const res = await fetch(url);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                    console.warn("Expected array, got:", data);
                }
            } catch (err) {
                console.error("Error fetching vent products:", err);
                setProducts([]);
            }
        };
        fetchProducts();
    }, [ventTypeId, ventId, ventItemId, ventItemTypeId]);

    return (
        <Container fluid className="bg-white mt-4">
            <Row className="px-2 mb-3">
                <Col>
                    <h2 className="fw-bold">{title}</h2>
                </Col>
            </Row>
            {products.length === 0 ? (
                <div className="text-center p-4 w-100">No items available.</div>
            ) : (
                <Row className="g-3 px-2">
                    {products.map((item) => {
                        const id = item.productId || item.id;
                        return (
                            <Col key={id} xs={12} sm={6} md={4}>
                                <Card className="h-100 product-card">
                                    {type === "sale" && item.discount && (
                                        <div className="position-absolute top-0 start-0 m-2">
                                            <div
                                                className="bg-danger text-white px-2 py-1 rounded small"
                                                style={{ fontSize: "10px" }}
                                            >
                                                {item.discount}
                                            </div>
                                        </div>
                                    )}
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
                                        <Link to={`/front/individual/${id}`}>
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fluid
                                                style={{ maxHeight: "100%", objectFit: "contain", cursor: "pointer" }}
                                            />
                                        </Link>
                                    </div>
                                    <Card.Body className="pt-1">
                                        {item.condition && (
                                            <p className="text-muted mb-1" style={{ fontSize: "10px" }}>
                                                {item.condition}
                                            </p>
                                        )}
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
                                        {item.delivery && (
                                            <div
                                                className="d-flex align-items-center gap-2 text-muted"
                                                style={{ fontSize: "10px" }}
                                            >
                                                ⭐ (0) 🚚 {item.delivery}
                                            </div>
                                        )}
                                        {type === "sale" ? (
                                            <>
                                                <div
                                                    className="fw-bold text-dark my-1"
                                                    style={{ fontSize: "18px" }}
                                                >
                                                    PKR{" "}
                                                    {item.newPrice
                                                        ? item.newPrice.toLocaleString()
                                                        : item.price?.toLocaleString()}
                                                </div>
                                                {item.price && (
                                                    <div
                                                        className="text-muted text-decoration-line-through"
                                                        style={{ fontSize: "14px" }}
                                                    >
                                                        PKR {item.price.toLocaleString()}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div
                                                className="fw-bold text-dark my-2"
                                                style={{ fontSize: "18px" }}
                                            >
                                                PKR {item.price?.toLocaleString() || "N/A"}
                                            </div>
                                        )}
                                        <Button
                                            className={`w-100 ${item.tag === "Pre Order"
                                                ? "btn-dark"
                                                : isInCart(id)
                                                    ? "btn-dark"
                                                    : "btn-success"
                                                } mt-2`}
                                            onClick={() => {
                                                if (!isInCart(id) && item.tag !== "Pre Order") {
                                                    handleAddToCart(item);
                                                }
                                            }}
                                        >
                                            {item.tag === "Pre Order"
                                                ? "Pre Order"
                                                : isInCart(id)
                                                    ? "View Cart"
                                                    : "Add to Cart"}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </Container>
    );
};

export default BrandPage;
