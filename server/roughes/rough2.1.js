// const { EntitySchema } = require("typeorm");

// module.exports = new EntitySchema({
//     name: "VentItem",
//     tableName: "vent_items",
//     columns: {
//         ventItemId: {
//             primary: true,
//             type: "int",
//             generated: true
//         },
//         name: {
//             type: "varchar",
//             length: 100,
//             nullable: false
//         },
//         storage:{
//             type:"varchar",
//             length:500,
//             nullable:true,
//         }
//     },
//     relations: {
//         vent: {
//             target: "Vent",
//             type: "many-to-one",
//             joinColumn: { name: "ventId" },
//             onDelete: "CASCADE",
//             eager: true,
//         },
//         ventItemTypes: { 
//             target: "VentItemType",
//             type: "one-to-many",
//             inverseSide: "ventItem",
//             cascade: true,
//             onDelete: "CASCADE",
//         },
//         products: {
//             target: "Product",
//             type: "one-to-many",
//             inverseSide: "ventItem",
//             onDelete: "SET NULL",
//         },
//     },
// });

// const { EntitySchema } = require("typeorm");

// module.exports = new EntitySchema({
//     name: "Product",
//     tableName: "products",
//     columns: {
//         productId: {
//             primary: true,
//             type: "int",
//             generated: true
//         },
//         title: {
//             type: "varchar",
//             length: 255,
//             nullable: false
//         },
//         type: {
//             type: "varchar",
//             length: 50,
//             nullable: false
//         },
//         image: {
//             type: "text",
//             nullable: true
//         },
//         condition: {
//             type: "varchar",
//             length: 100,
//             nullable: true
//         },
//         delivery: {
//             type: "varchar",
//             length: 100,
//             nullable: true
//         },
//         price: {
//             type: "decimal",
//             precision: 10,
//             scale: 2,
//             nullable: false
//         },
//         newPrice: {
//             type: "decimal",
//             precision: 10,
//             scale: 2,
//             nullable: true
//         },
//         discount: {
//             type: "varchar",
//             length: 50,
//             nullable: true
//         },
//         tag: {
//             type: "varchar",
//             length: 50,
//             nullable: true
//         },
//         // quantity:{
//         //     type:"int",
//         //     nullable:true
//         // }
//     },
//     relations: {
//         favourites: {
//             target: "Favourite",
//             type: "one-to-many",
//             inverseSide: "product",
//             cascade: true,
//             onDelete: "CASCADE",
//         },
//         cart: {
//             target: "Cart",
//             type: "one-to-many",
//             inverseSide: "product",
//             cascade: true,
//             onDelete: "CASCADE",
//         },
//         categoryType: {
//             target: "CategoryType",
//             type: "many-to-one",
//             joinColumn: { name: "categoryTypeId" },
//             nullable:true,
//             onDelete: "SET NULL",
//             eager: true,
//         },
//         category: {
//             target: "Category",
//             type: "many-to-one",
//             joinColumn: { name: "categoryId" },
//             nullable:true,
//             onDelete: "SET NULL",
//             eager: true,
//         },
//         categoryItem: {
//             target: "CategoryItem",
//             type: "many-to-one",
//             joinColumn: { name: "categoryItemId" },
//             nullable:true,
//             onDelete: "SET NULL",
//             eager: true,
//         },
//         ventType: {
//             target: "VentType",
//             type: "many-to-one",
//             joinColumn: { name: "ventTypeId" },
//             nullable:true,
//             onDelete: "SET NULL",
//             eager: true,
//         },
//         vent: {
//             target: "Vent",
//             type: "many-to-one",
//             joinColumn: { name: "ventId" },
//             nullable:true,
//             onDelete: "SET NULL",
//             eager: true,
//         },
//         ventItem: {
//             target: "VentItem",
//             type: "many-to-one",
//             joinColumn: { name: "ventItemId" },
//             nullable:true,
//             onDelete: "SET NULL",
//             eager: true,
//         },
//         ventItemType: {
//             target: "VentItemType",
//             type: "many-to-one",
//             joinColumn: { name: "ventItemTypeId" },
//             nullable:true,
//             onDelete: "SET NULL",
//             eager: true,
//         },
//         brandItem: {
//             target: "BrandItem",
//             type: "many-to-one",
//             joinColumn: { name: "brandItemId" },
//             nullable:true,
//             onDelete: "SET NULL",
//             eager: true
//         },
//     }
// });
// const { EntitySchema } = require("typeorm");

// module.exports = new EntitySchema({
//   name: "CategoryItem",
//   tableName: "category_items",
//   columns: {
//     categoryItemId: 
//     { 
//         primary: true, 
//         type: "int", 
//         generated: true 
//     },
//     name: 
//     { 
//         type: "varchar", 
//         length: 100, 
//         nullable: false },
//   },
//   relations: 
//   {
//     category: 
//     {
//       target: "Category",
//       type: "many-to-one",
//       joinColumn: { name: "categoryId" },
//       onDelete: "CASCADE",
//       eager: true,
//     },
//     products: 
//     {
//       target: "Product",
//       type: "one-to-many",
//       inverseSide: "categoryItem",
//       onDelete: "SET NULL",
//     },
//   },
// });
// const { EntitySchema } = require("typeorm");

// module.exports = new EntitySchema({
//     name: "Brand",
//     tableName: "brands",
//     columns: {
//         brandId: {
//             primary: true,
//             type: "int",
//             generated: true
//         },
//         name: {
//             type: "varchar",
//             length: 150,
//             nullable: false
//         },
//         icon: {
//             type: "text",
//             nullable: true
//         },
//     },
//     relations: {
//         brandItems: {
//             target: "BrandItem",
//             type: "one-to-many",
//             inverseSide: "brand",
//             cascade: true,
//             onDelete: "CASCADE"
//         }
//     }
// });

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Form, Image, Button, Card } from 'react-bootstrap';
// import search from '../asserts/search.png';
// import './Header.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from 'react';
// import green from "../asserts/green.png";

// const API_URL = "http://localhost:5001/products";
// const Search = ({ title, type, handleAddFavourite, handleAddToCart }) => {
//     const dispatch = useDispatch();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [products, setProducts] = useState([]);
//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const categoryTypeId = query.get("categoryTypeId");
//     const categoryId = query.get("categoryId");
//     const categoryItemId = query.get("categoryItemId");
//     const ventTypeId = query.get("ventTypeId");
//     const ventId = query.get("ventId");
//     const ventItemId = query.get("ventItemId");
//     const ventItemTypeId = query.get("ventItemTypeId");
//     const productId = query.get("productId");

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 let url = `${API_URL}?`;
//                 if (productId) url = url;
//                 if (categoryTypeId) url += `categoryTypeId=${categoryTypeId}&`;
//                 if (categoryId) url += `categoryId=${categoryId}&`;
//                 if (categoryItemId) url += `categoryItemId=${categoryItemId}&`;
//                 if (ventTypeId) url += `ventTypeId=${ventTypeId}&`;
//                 if (ventId) url += `ventId=${ventId}&`;
//                 if (ventItemId) url += `ventItemId=${ventItemId}&`;
//                 if (ventItemTypeId) url += `ventItemTypeId=${ventItemTypeId}&`;

//                 const res = await fetch(url);
//                 const data = await res.json();
//                 if (Array.isArray(data)) {
//                     setProducts(data);
//                 } else {
//                     setProducts([]);
//                     console.warn("Expected array, got:", data);
//                 }
//             } catch (err) {
//                 console.error("Failed to fetch sale:", err);
//                 setProducts([]);
//             }
//         };

//         fetchProduct();
//     }, [dispatch]);
//     const cartItems = useSelector((state) => state.cart.items);

//     const isInCart = (id) => {
//         return cartItems.some((item) => item.id === id || item.productId === id);
//     };

//     const filteredItems = products.filter(item =>
//         item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.condition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.brandId?.toLowerCase().includes(searchQuery) ||
//         item.ventItemId?.toLowerCase().includes(searchQuery)
//     );
//     const currentItems = filteredItems;

//     return (
//         <header className="header-main">
//             <>
//                 <Container className='mt-4'>
//                     <Col className="header-center d-none d-lg-flex justify-content-center">
//                         <div className="search-wrapper">
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Search By Brand, Model, Color..."
//                                 className="search-input"
//                                 value={searchQuery}
//                                 onChange={(e) => {
//                                     setSearchQuery(e.target.value);
//                                 }}
//                             />
//                             <img src={search} alt="search" className="search-icon" />
//                         </div>
//                     </Col>
//                 </Container>
//                 <Container className='mt-4'>
//                     <Row className="px-2 mb-3">
//                         <Col>
//                             <h2 className="fw-bold">{title}</h2>
//                         </Col>
//                     </Row>
//                     {products.length === 0 ? (
//                         <div className="text-center p-4 w-100">No items available.</div>
//                     ) : (
//                         <Row className="g-3 px-2">
//                             {currentItems.map((item) => {
//                                 const id = item.productId || item.id;
//                                 return (
//                                     <Col key={id} xs={12} sm={6} md={4}>
//                                         <Card className="h-100 product-card">
//                                             {type === "sale" && item.discount && (
//                                                 <div className="position-absolute top-0 start-0 m-2">
//                                                     <div
//                                                         className="bg-danger text-white px-2 py-1 rounded small"
//                                                         style={{ fontSize: "10px" }}
//                                                     >
//                                                         {item.discount}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             <div className="position-absolute top-0 end-0 m-2">
//                                                 <Button
//                                                     variant="light"
//                                                     className="p-1 rounded"
//                                                     onClick={() => handleAddFavourite(item)}
//                                                 >
//                                                     <Image src={green} alt="favourite" className="img" />
//                                                 </Button>
//                                             </div>
//                                             <div className="text-center p-3" style={{ height: "150px" }}>
//                                                 <Image
//                                                     src={item.image}
//                                                     alt={item.title}
//                                                     fluid
//                                                     style={{ maxHeight: "100%", objectFit: "contain" }}
//                                                 />
//                                             </div>
//                                             <Card.Body className="pt-1">
//                                                 {item.condition && (
//                                                     <p className="text-muted mb-1" style={{ fontSize: "10px" }}>
//                                                         {item.condition}
//                                                     </p>
//                                                 )}

//                                                 <Card.Title
//                                                     style={{
//                                                         fontSize: "14px",
//                                                         fontWeight: "bold",
//                                                         whiteSpace: "nowrap",
//                                                         overflow: "hidden",
//                                                         textOverflow: "ellipsis",
//                                                     }}
//                                                 >
//                                                     {item.title}
//                                                 </Card.Title>
//                                                 {item.delivery && (
//                                                     <div
//                                                         className="d-flex align-items-center gap-2 text-muted"
//                                                         style={{ fontSize: "10px" }}
//                                                     >
//                                                         ⭐ (0) 🚚 {item.delivery}
//                                                     </div>
//                                                 )}
                                                
//                                             </Card.Body>
//                                         </Card>
//                                     </Col>
//                                 );
//                             })}
//                         </Row>
//                     )}
//                 </Container>
//             </>
//         </header>
//     );
// };

// export default Search;

// Read this thoroughly from top to bottom i want to search by product name,condition,categoryItemName,ventItem Name,Brand Name


// --- inside Search component (replace your useEffect and filteredItems) ---

useEffect(() => {
    const fetchProduct = async () => {
        try {
            const params = new URLSearchParams();
            if (productId) params.set("productId", productId);
            if (categoryTypeId) params.set("categoryTypeId", categoryTypeId);
            if (categoryId) params.set("categoryId", categoryId);
            if (categoryItemId) params.set("categoryItemId", categoryItemId);
            if (ventTypeId) params.set("ventTypeId", ventTypeId);
            if (ventId) params.set("ventId", ventId);
            if (ventItemId) params.set("ventItemId", ventItemId);
            if (ventItemTypeId) params.set("ventItemTypeId", ventItemTypeId);

            const url = `${API_URL}?${params.toString()}`;
            const res = await fetch(url);
            const data = await res.json();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                setProducts([]);
                console.warn("Expected array, got:", data);
            }
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setProducts([]);
        }
    };

    fetchProduct();
}, [location.search]); // re-run when query string changes

// --- improved filtering (search by nested names) ---
const q = searchQuery.trim().toLowerCase();

const filteredItems = products.filter(item => {
    if (!q) return true; // no search -> show all

    const title = item.title?.toString().toLowerCase() || "";
    const condition = item.condition?.toString().toLowerCase() || "";

    // Category item name (CategoryItem)
    const categoryItemName = item.categoryItem?.name?.toString().toLowerCase() || "";

    // Vent item name (VentItem)
    const ventItemName = item.ventItem?.name?.toString().toLowerCase() || "";

    // Brand name tries a few shapes (brandItem.name, brandItem.brand.name, brand.name)
    const brandName =
        (item.brandItem?.name && item.brandItem.name.toString().toLowerCase()) ||
        (item.brandItem?.brand?.name && item.brandItem.brand.name.toString().toLowerCase()) ||
        (item.brand?.name && item.brand.name.toString().toLowerCase()) ||
        "";

    return (
        title.includes(q) ||
        condition.includes(q) ||
        categoryItemName.includes(q) ||
        ventItemName.includes(q) ||
        brandName.includes(q)
    );
});
