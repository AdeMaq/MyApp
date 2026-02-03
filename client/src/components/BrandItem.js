import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const BRAND_API_URL = "http://localhost:5001/brand";

const BrandItem = () => {
  const [BrandItems, setBrandItems] = useState([]);
  const { brandId } = useParams();

  useEffect(() => {
    const fetchBrandItems = async () => {
      try {
        const res = await fetch(`${BRAND_API_URL}/${brandId}/items`);
        const data = await res.json();
        setBrandItems(data);
      } catch (err) {
        console.error("Error fetching Brand Items:", err);
      }
    };
    fetchBrandItems();
  }, []);

  return (
    <div>
      {BrandItems.map((brand) => {
        <div key={brand.brandItemId} style={{ position: "relative", textAlign: "center", marginTop: 12 }}>
          <Image
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
      })}
      <Container fluid className="mt-4">
        <Row>
          {BrandItems.map((brand) => (
            <>
              <Col
                key={brand.brandItemId}
                xs={6}
                sm={4}
                md={3}
                lg={2}
                className="mb-4 d-flex justify-content-center"
              >
                <Link
                  to={`/brands?brandItemId=${brand.brandItemId}`}
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
                      src={brand.pic}
                      alt={brand.name}
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
                        {brand.name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BrandItem;
