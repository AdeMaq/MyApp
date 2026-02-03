import React, { useEffect } from "react";
import { Offcanvas, Button, Image, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import brand from "../asserts/brand-bag.png";

const CartSidebar = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.cart.showCart);
    const items = useSelector((state) => state.cart.items || []);
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (show && userId) {
            fetch(`http://localhost:5001/cart/${userId}`)
                .then(res => res.json())
                .then(data => {
                    dispatch(cartActions.setAddToCart(data)); 
                })
                .catch(err => console.error("Error fetching cart:", err));
        }
    }, [show, userId, dispatch]);

    const handleRemove = async (cartId) => {
        try {
            const res = await fetch(`http://localhost:5001/cart/${cartId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                dispatch(cartActions.removeFromCart(cartId)); 
            }
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    return (
        <Offcanvas
            show={show}
            onHide={() => dispatch(cartActions.toggleCart())}
            placement="end"
            style={{ width: "350px" }}
        >
            <Offcanvas.Header
                closeButton
                style={{ borderBottom: "1px solid #ddd", padding: "15px", fontWeight: "bold", fontSize: "18px", }}
            >
                <Offcanvas.Title style={{ fontWeight: "bold" }}>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
                style={{
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                }}
            >
                <div style={{ flex: 1, overflowY: "auto", paddingBottom: "10px" }}>
                    {items.length === 0 ? (
                        <div className="mt-4 text-center">
                            <Image src={brand} alt="brand" className=" mb-2 p-0 gap-0" style={{ width: '104px', height: '104px', margin: '5px' }} />
                            <p className="text-center m-0 p-0 gap-0" style={{ fontWeight: "bold", fontSize: 18 }}>No item found in your Cart.</p>
                            <p className="text-center m-0 p-0 gap-0" style={{ fontSize: 14 }}>Continue shopping and add items in your Cart.</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.cartId}
                                className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 pt-2"
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        width: "55px",
                                        height: "55px",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width="55"
                                        height="55"
                                        style={{
                                            borderRadius: "5px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <span
                                        className="badge bg-success"
                                        style={{
                                            fontSize: "9px",
                                            position: "absolute",
                                            top: "-5px",
                                            right: "-5px",
                                            borderRadius: "50%",
                                            padding: "3px 6px",
                                        }}
                                    >
                                        {item.quantity}
                                    </span>
                                </div>
                                <div
                                    className="ms-3"
                                    style={{
                                        flex: 1,
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                    <div style={{ fontSize: "12px", color: "#6c757d" }}>
                                        {item.condition}
                                    </div>
                                    <div style={{ fontSize: "13px", fontWeight: "500" }}>
                                        PKR {item.price}
                                    </div>
                                </div>
                                <Button
                                    variant="link"
                                    style={{
                                        color: "red",
                                        padding: "0",
                                        marginLeft: "5px",
                                    }}
                                    onClick={() => handleRemove(item.cartId)}
                                >
                                    <Trash size={16} />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                {/* Sticky Footer */}
                <div style={{ borderTop: "1px solid #ddd", paddingTop: "10px", background: "#fff", }}>
                    <h5
                        style={{
                            fontWeight: "bold",
                            marginBottom: "20px",
                            padding: '15px',
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        Subtotal <span style={{ fontWeight: "normal", marginLeft: '90px' }}>PKR {total}</span>
                    </h5>
                    <Row>
                        <Col xs={6}>
                            <Link
                                to="/front/cart"
                                onClick={() => dispatch(cartActions.toggleCart())}
                                style={{ textDecoration: "none" }}
                            >
                                <Button variant="dark" className="w-100" style={{ borderRadius: "8px", fontWeight: "bold", fontSize: "16px", padding: "15px", }}>
                                    View Cart
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={6}>
                            <Button variant="success" className="w-100" style={{ borderRadius: "8px", fontWeight: "bold", fontSize: "16px", padding: "15px", }}>
                                Checkout
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Offcanvas.Body>

        </Offcanvas>
    );
};

export default CartSidebar;

