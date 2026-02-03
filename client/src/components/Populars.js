import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import categoryBanner from "../asserts/CategoryBanner.png";

const CATEGORY_API_URL = "http://localhost:5001/categories";

const Populars = () => {
    const [categoryTypes, setCategoryTypes] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(CATEGORY_API_URL);
                const data = await res.json();
                setCategoryTypes(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <div style={{ position: "relative", textAlign: "center",marginTop:12 }}>
                <img
                    src={categoryBanner}
                    alt="Category Banner"
                    style={{
                        width: "100%",
                        maxHeight: "250px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
            </div>
            <Container fluid className="mt-4">
                <Row>
                    {categoryTypes.map((cat) => (
                        <Col
                            key={cat.categoryTypeId}
                            xs={6}
                            sm={4}
                            md={3}
                            lg={2}
                            className="mb-4 d-flex justify-content-center"
                        >
                            <Link
                                to={`/products?categoryTypeId=${cat.categoryTypeId}`}
                                style={{ textDecoration: "none", width: "100%" }}
                            >
                                <Card
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                        border: "1px solid #eee",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                        transition: "transform 0.2s ease-in-out",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform = "scale(1.05)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform = "scale(1)")
                                    }
                                >
                                    <Card.Img
                                        variant="top"
                                        src={cat.pic}
                                        alt={cat.name}
                                        style={{
                                            height: "120px",
                                            objectFit: "contain",
                                            padding: "15px",
                                        }}
                                    />
                                    <Card.Body style={{ padding: "10px" }}>
                                        <Card.Title
                                            style={{
                                                fontSize: "0.95rem",
                                                fontWeight: "600",
                                                color: "#333",
                                            }}
                                        >
                                            {/* {cat.name} */}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Populars;
