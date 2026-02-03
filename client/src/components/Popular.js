import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import seearrow from "../asserts/seearrow.png";
import "./Popular.css";

const CATEGORY_API_URL = "http://localhost:5001/categories";

const Popular = () => {
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
    <Container fluid className="m-0 p-0 bg-light">
      <Row className="justify-content-between align-items-baseline px-3">
        <Col>
          <h2 className="fw-bold fs-4 text-dark mb-2">
            Explore Popular Categories
          </h2>
        </Col>
        <Col className="text-end">
          <Link
            to="/front/populars"
            className="fw-medium text-dark text-decoration-none fs-6"
          >
            See All <Image src={seearrow} alt="favourite" className="img" />
          </Link>
        </Col>
      </Row>

      <div className="d-flex gap-3 overflow-x-auto px-4 py-3 no-scrollbar">
        {categoryTypes.map((category) => (
          <Link
            key={category.categoryTypeId}
            to={`/products?categoryTypeId=${category.categoryTypeId}`}
            className="popular-link text-center"
            style={{ flex: "0 0 auto", width: "132px" }}
          >
            <div className="popular-circle">
              <Image
                src={category.pic}
                alt={category.name}
                fluid
                style={{ width: "70%", height: "70%", objectFit: "contain" }}
              />
            </div>
            <h3>{category.name}</h3>
          </Link>

        ))}
      </div>
    </Container>
  );
};

export default Popular;
