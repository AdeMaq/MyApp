// import React, { useState } from "react";
// import {Container,Row,Col,Image,Button,} from "react-bootstrap";

// const Individual = () => {
//   const [selectedColor, setSelectedColor] = useState("Maroon");

//   const colors = [
//     {name: "Black",img: "https://i.ibb.co/2k9wL5z/black.png",},
//     {name: "White",img: "https://i.ibb.co/d5HchY4/white.png",},
//     {name: "Maroon",img: "https://i.ibb.co/qFtxw93/maroon.png",},
//     {name: "Mustard",img: "https://i.ibb.co/ZdcHfqy/mustard.png",},
//   ];

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col md={1}>
//           <Image
//             src="https://i.ibb.co/qFtxw93/maroon.png"
//             thumbnail
//             style={{
//               width: "60px",
//               height: "60px",
//               border: "1px solid #ddd",
//             }}
//           />
//         </Col>
//         <Col md={5} className="d-flex flex-column align-items-center">
//           <Image
//             src="https://i.ibb.co/qFtxw93/maroon.png"
//             fluid
//             style={{ borderRadius: "5px", maxHeight: "420px" }}
//           />
//         </Col>
//         <Col md={5}>
//           <h3 className="fw-bold">Quilted Waterproof Mattress Bed Sheet</h3>
//           <div className="d-flex align-items-center mb-2">
//             <span style={{ fontSize: "18px" }}>⭐⭐⭐⭐⭐</span>
//             <span className="ms-2 text-muted">| 0 Reviews |</span>
//             <span className="ms-2" bg="light" text="danger">🔥 Hot selling! only 5 left</span>
//           </div>
//           <h4 className="fw-bold mb-3">PKR 2500</h4>
//           <p>
//             <strong>Color: </strong>
//             {selectedColor}
//           </p>
//           <div className="d-flex gap-3 mb-3">
//             {colors.map((c) => (
//               <Image
//                 key={c.name}
//                 src={c.img}
//                 roundedCircle
//                 style={{
//                   border:
//                     selectedColor === c.name
//                       ? "3px solid green"
//                       : "1px solid #ccc",
//                   cursor: "pointer",
//                   width: "70px",
//                   height: "70px",
//                 }}
//                 onClick={() => setSelectedColor(c.name)}
//               />
//             ))}
//           </div>
//           <div>
//             <div>
//               <strong>Condition: </strong>
//             </div>
//             <Button className="text-dark" style={{ fontSize: "14px", background: "#46c648ff", border: "1px solid #364f40ff", }}>
//               Brand New
//             </Button>
//           </div>
//           <div>
//             <div>
//               <strong>size: </strong>
//             </div>
//             <Button className="text-dark" style={{ fontSize: "14px", background: "#63ed63ff", border: "1px solid #364f40ff", }}>
//               16 by 16
//             </Button>
//           </div>
//           <div>
//             <div>
//               <strong>connectivity: </strong>
//             </div>
//             <Button className="text-dark" style={{ fontSize: "14px", background: "#63ed63ff", border: "1px solid #364f40ff", }}>
//               GPS
//             </Button>
//           </div>
//           <div>
//             <div>
//               <strong>Storage: </strong>
//             </div>
//             <div>
//               <Button className="text-dark" style={{fontSize: "14px",background: "#63ed63ff",border: "1px solid #364f40ff",marginRight: "10px",  }}>
//                 128GB
//               </Button>
//               <Button className="text-dark" style={{fontSize: "14px",background: "#63ed63ff", border: "1px solid #364f40ff",}}>
//                 370GB
//               </Button>
//             </div>
//           </div>
//           <div>
//             <div>
//               <strong>Processor: </strong>
//             </div>
//             <div>
//               <Button className="text-dark" style={{fontSize: "14px",background: "#63ed63ff",border: "1px solid #364f40ff",marginRight: "10px",  }}>
//                 i7
//               </Button>
//               <Button className="text-dark" style={{fontSize: "14px",background: "#63ed63ff", border: "1px solid #364f40ff",}}>
//                 i6
//               </Button>
//             </div>
//           </div>
//           <div className="d-flex gap-2 mt-4">
//             <Button
//               variant="dark"
//               style={{ padding: "10px 25px", fontWeight: "500" }}
//             >
//               🛒 Buy Now
//             </Button>
//             <Button
//               variant="success"
//               style={{ padding: "10px 25px", fontWeight: "500" }}
//             >
//               ➕ Add to Cart
//             </Button>
//             <Button variant="outline-success">♡</Button>
//             <Button variant="outline-success">🏷</Button>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Individual;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col, Image, Button } from "react-bootstrap";

// const Individual = () => {
//   const { id } = useParams();
//   const API_URL = "http://localhost:5001/products";
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`${API_URL}/${id}`);
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (!product) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }
//   const specs = product.ventItem?.storage
//     ? product.ventItem.storage.split(",").map(s => s.trim())
//     : [];

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col md={6} className="d-flex justify-content-center">
//           <Image
//             src={product.image}
//             fluid
//             style={{ borderRadius: "5px", maxHeight: "420px" }}
//           />
//         </Col>

//         <Col md={6}>
//           {/* Title */}
//           {product.title && <h3 className="fw-bold">{product.title}</h3>}

//           {/* Price */}
//           {product.price && (
//             <h4 className="fw-bold mb-3">
//               PKR {product.newPrice || product.price}
//             </h4>
//           )}

//           {/* Condition */}
//           {product.condition && (
//             <div className="mb-2">
//               <strong>Condition:</strong>{" "}
//               <Button
//                 className="text-dark"
//                 style={{
//                   fontSize: "14px",
//                   background: "#46c648ff",
//                   border: "1px solid #364f40ff",
//                 }}
//               >
//                 {product.condition}
//               </Button>
//             </div>
//           )}
//           {product.delivery && (
//             <div className="mb-2">
//               <strong>Delivery:</strong>{" "}
//               <Button
//                 className="text-dark"
//                 style={{
//                   fontSize: "14px",
//                   background: "#63ed63ff",
//                   border: "1px solid #364f40ff",
//                 }}
//               >
//                 {product.delivery}
//               </Button>
//             </div>
//           )}
//           {specs.length > 0 && (
//             <div className="mb-3">
//               <strong>Specifications:</strong>
//               <div className="mt-2 d-flex flex-wrap gap-2">
//                 {specs.map((s, idx) => (
//                   <Button
//                     key={idx}
//                     className="text-dark"
//                     style={{
//                       fontSize: "14px",
//                       background: "#63ed63ff",
//                       border: "1px solid #364f40ff",
//                     }}
//                   >
//                     {s}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div className="d-flex gap-2 mt-4">
//             <Button variant="dark" style={{ padding: "10px 25px", fontWeight: "500" }}>
//               🛒 Buy Now
//             </Button>
//             <Button variant="success" style={{ padding: "10px 25px", fontWeight: "500" }}>
//               ➕ Add to Cart
//             </Button>
//             <Button variant="outline-success">♡</Button>
//             <Button variant="outline-success">🏷</Button>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Individual;