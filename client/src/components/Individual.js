import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const API_URL = "http://localhost:5001/products";

const Individual = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-5">Loading But HehEHeHe it is not showing...</div>;
  }

  // let parts = [];
  // if (product.ventItem && product.ventItem.storage) {
  //   parts = product.ventItem.storage.split(",").map(s => s.trim());
  // }

  function getStorageParts(product) {
    if (!product.ventItem?.storage){
       return [];
    }
    return product.ventItem.storage.split(",").map(s => s.trim());
  }

  const parts = getStorageParts(product);

  // const parts = product.ventItem?.storage ? product.ventItem.storage.split(",").map(s => s.trim()) : [];

  let storage = "";
  let ram = "";
  let processor = "";
  let connectivity = "";

  if (product.ventItem?.vent?.ventType?.name === "Laptop") {
    storage = parts[0] || "";
    ram = parts[1] || "";
    processor = parts[2] || "";
  } else if (product.ventItem?.vent?.ventType?.name === "Mobile") {
    storage = parts[0] || "";
    ram = parts[1] || "";
  } else if (product.ventItem?.vent?.ventType?.name === "Smart Watches") {
    connectivity = parts[0] || "";
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6} className="d-flex justify-content-center">
          <Image
            src={product.image}
            fluid
            style={{ borderRadius: "5px", maxHeight: "420px" }}
          />
        </Col>

        <Col md={6}>
          {product.title && <h3 className="fw-bold">{product.title}</h3>}
          {product.price && (
            <h4 className="fw-bold mb-3">
              PKR {product.newPrice || product.price}
            </h4>
          )}
          {product.condition && (
            <div className="mb-2">
              <strong>Condition:</strong>{" "}
              <Button
                className="text-dark"
                style={{
                  fontSize: "14px",
                  background: "#D3F9E9",
                  border: "1px solid #364f40ff",
                }}
              >
                {product.condition}
              </Button>
            </div>
          )}
          {product.delivery && (
            <div className="mb-2">
              <strong>Delivery:</strong>{" "}
              <Button
                className="text-dark"
                style={{
                  fontSize: "14px",
                  background: "#D3F9E9",
                  border: "1px solid #364f40ff",
                }}
              >
                {product.delivery}
              </Button>
            </div>
          )}
          <div className="mb-3">
            <strong>Specifications:</strong>
            <div className="mt-2 d-flex flex-wrap gap-2">
              {storage && (
                <>
                  <strong>Storage</strong>
                  <Button
                    className="text-dark"
                    style={{
                      fontSize: "14px",
                      background: "#D3F9E9",
                      border: "1px solid #364f40ff",
                    }}
                  >
                    {storage}
                  </Button>
                </>
              )}
              {ram && (
                <>
                  <strong>RAM:</strong>
                  <Button
                    className="text-dark"
                    style={{
                      fontSize: "14px",
                      background: "#D3F9E9",
                      border: "1px solid #364f40ff",
                    }}
                  >
                    {ram}
                  </Button>
                </>
              )}
              {processor && (
                <>
                  <strong>Processor:</strong>
                  <Button
                    className="text-dark"
                    style={{
                      fontSize: "14px",
                      background: "#D3F9E9",
                      border: "1px solid #364f40ff",
                    }}
                  >
                    {processor}
                  </Button>
                </>
              )}
              {connectivity && (
                <>
                  <strong>Connectivity:</strong>
                  <Button
                    className="text-dark"
                    style={{
                      fontSize: "14px",
                      background: "#D3F9E9",
                      border: "1px solid #364f40ff",
                    }}
                  >
                    {connectivity}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="d-flex gap-2 mt-4">
            <Button variant="dark" style={{ padding: "10px 25px", fontWeight: "500" }}>
              🛒 Buy Now
            </Button>
            <Button variant="success" style={{ padding: "10px 25px", fontWeight: "500" }}>
              ➕ Add to Cart
            </Button>
            <Button variant="outline-success">♡</Button>
            <Button variant="outline-success">🏷</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Individual;


