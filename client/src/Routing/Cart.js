import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaTruck, FaCreditCard } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { Trash } from "react-bootstrap-icons";
import brand from "../asserts/brand-bag.png";

export default function Cart() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.cart.showCart);
  const items = useSelector((state) => state.cart.items || []);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (show && userId) {
      fetch(`http://localhost:5001/cart/${userId}`)
        .then(res => res.json())
        .then(data => {
          // replace state with backend cart
          dispatch(cartActions.replaceCart(data));
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

  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    // reset checkedItems whenever cart updates
    const initialChecked = items.reduce((acc, item) => {
      acc[item.cartId] = true;
      return acc;
    }, {});
    setCheckedItems(initialChecked);
  }, [items]);

  const handleCheckboxChange = (cartId) => {
    setCheckedItems((prev) => ({ ...prev, [cartId]: !prev[cartId] }));
  };

  const total = items.reduce((acc, item) => {
    return checkedItems[item.cartId] ? acc + item.price * item.quantity : acc;
  }, 0);

  const steps = [
    { label: "Cart", icon: <FaShoppingCart />, active: false, completed: true },
    { label: "Information", icon: <FaUser />, active: false, completed: false },
    { label: "Shipping", icon: <FaTruck />, active: false, completed: false },
    { label: "Payment", icon: <FaCreditCard />, active: true, completed: false },
  ];

  return (
    <>
      <Container fluid style={{ borderBottom: "1px solid #eee", padding: "20px 0" }}>
        <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
          <Col md={6} style={{ display: "flex", alignItems: "center" }}>
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div
                  className='mx-0 px-0'
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor:
                      s.active
                        ? "#1E40AF"
                        : s.completed
                          ? "#ccc"
                          : "#eee",
                    color: s.active
                      ? "#fff"
                      : s.completed
                        ? "#000"
                        : "#aaa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: 14,
                      marginTop: 30,
                      marginLeft: 22,
                    }}>
                      {s.icon}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        marginTop: 10,
                        fontWeight: s.active ? "bold" : "normal",
                        color: s.active
                          ? "#000"
                          : s.completed
                            ? "#000"
                            : "#aaa",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className='mx-0 px-0'
                    style={{
                      height: 4,
                      width: 100,
                      backgroundColor: "#ddd",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Col>
          <Col md={4} style={{ display: "flex", justifyContent: "flex-end" }}>
            <img
              src="https://media.wisemarket.com.pk/config/1704456252-payment_method_image.svg"
              alt="Payment Methods"
              style={{ height: 50, maxWidth: "100%" }}
              loading="lazy"
            />
          </Col>
        </Row>
      </Container>
      <Container fluid style={{ padding: "20px 0" }}>
        <Row>
          {/* LEFT SIDE — Items list or empty message */}
          <Col md={7} style={{ marginTop: 30 }}>
            {items.length === 0 ? (
              <div className="mt-4 text-center">
                <Image src={brand} alt="brand" className=" mb-2 p-0 gap-0" style={{ width: '104px', height: '104px', margin: '5px' }} />
                <p className="text-center m-0 p-0 gap-0" style={{ fontWeight: "bold", fontSize: 18 }}>No item found in your Cart.</p>
                <p className="text-center m-0 p-0 gap-0" style={{ fontSize: 14 }}>Continue shopping and add items in your Cart.</p>
              </div>
            ) : (
              <>
                <h5 className="mb-4 fw-bold">Cart items:</h5>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-start mb-3 p-3 border rounded"
                  >
                    <Form.Check
                      type="checkbox"
                      className="me-3"
                      checked={checkedItems[item.id] || false}
                      onChange={() => handleCheckboxChange(item.id)}
                      style={{ width: 20, height: 20, marginTop: "10px" }}
                    />
                    <Image
                      src={item.image}
                      alt={item.title}
                      width="80"
                      height="80"
                      className="me-3"
                      style={{ objectFit: "cover", borderRadius: "5px" }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-bold">{item.title}</h6>
                      <div style={{ fontSize: "14px", color: "#777" }}>
                        -{item.condition}
                      </div>
                      <div style={{ fontSize: "14px" }}>
                        Vendor: <strong>{item.vendor || "N/A"}</strong>
                      </div>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => handleRemove(item.cartId)}
                      >
                        <Trash className="me-1" /> Remove
                      </Button>
                    </div>
                    <div className="ms-3 text-end">
                      <div
                        className="d-flex align-items-center mb-2"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          width: "90px",
                          overflow: "hidden",
                        }}
                      >
                        <Button
                          variant="light"
                          size="sm"
                          style={{ flex: 1 }}
                          onClick={() =>
                            dispatch(cartActions.decreaseQuantity(item.cartId))
                          }
                        >
                          -
                        </Button>
                        <div
                          style={{
                            padding: "4px 8px",
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </div>
                        <Button
                          variant="light"
                          size="sm"
                          style={{ flex: 1 }}
                          onClick={() =>
                            dispatch(cartActions.increaseQuantity(item.cartId))
                          }
                        >
                          +
                        </Button>
                      </div>
                      <div style={{ fontWeight: "bold" }}>
                        PKR {item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Col>

          {/* RIGHT SIDE — Always Visible */}
          <Col md={5}>
            <div
              className="p-4"
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                position: "sticky",
                top: "20px",
              }}
            >
              <h5 className="fw-bold mb-3">Total</h5>
              <div
                className="mb-3 text-end"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                PKR {total}
              </div>

              <Button
                variant="success"
                className="w-100 mb-4"
                style={{ fontWeight: "bold", padding: "10px", fontSize: "16px" }}
              >
                Checkout
              </Button>

              <h6 className="mb-3 fw-bold">💚 We care our customers:</h6>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <ul style={{ paddingLeft: "5px", fontSize: "14px" }}>
                  <li>📦 Free & secure delivery</li>
                  <li>🛡️ 13 months free warranty</li>
                  <li>📆 21 Days extended free return period</li>
                  <li>🏷️ Price beat guarantee. Our prices are the lowest</li>
                  <li>🎁 Reward points as gift on every purchase</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
