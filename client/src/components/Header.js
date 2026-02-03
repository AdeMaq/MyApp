import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Image, Badge, Button } from 'react-bootstrap';
import logo from '../asserts/logo.svg';
import search from '../asserts/search.png';
import loginIcon from '../asserts/login.png';
import favourite from '../asserts/favourite.png';
import cart from '../asserts/cart.png';
import balance from '../asserts/balance.png';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';
import { cartActions } from '../store/cart-slice';
import { Link } from "react-router-dom";
import { useEffect } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalItems = useSelector((state) => state.cart.badgeCount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.name);
  const defaultProfilePic = useSelector((state) => state.auth.profilePic);
  const favouriteCount = useSelector((state) => state.favourite.total);
  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("http://localhost:5001/products");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
      } catch (err) {
        console.error("Failed to fetch sale:", err);
      }
    };

    fetchProduct();
  }, [dispatch]);




  return (
    <header className="header-main">
      <div className="top-strip"></div>
      <Container fluid className="header-wrapper">
        <Row className="align-items-center header-content">
          <Col xs="auto" className="header-left">
            <Image src={logo} alt="Wise Market Logo" className="logo" />
          </Col>

          <Col className="header-center d-none d-lg-flex justify-content-center">
            <div className="search-wrapper">
              <Form.Control
                type="text"
                placeholder="Search By Brand, Model, Color..."
                className="search-input"
              />
              <img src={search} alt="search" className="search-icon" />
            </div>
          </Col>

          <Col xs="auto" className="header-right d-flex align-items-center">
            {!isLoggedIn ? (
              <Button variant="link" href="/login" className="p-0 border-0"
                style={{
                  backgroundColor: 'transparent',
                  color: 'black',
                  boxShadow: 'none',
                  outline: 'none',
                  textDecoration: 'none'
                }}
              >
                <Image src={loginIcon} alt="login" style={{ width: '24px', height: '24px', margin: '5px' }} />
                <span className="icon-text">Login</span>
              </Button>
            ) : (
              <div className="d-flex align-items-center">
                <Image
                  src={defaultProfilePic}
                  alt="Profile"
                  roundedCircle
                  style={{ width: '30px', height: '30px', objectFit: 'cover', marginRight: '8px' }}
                />
                <span className="icon-text">{name}</span>
              </div>
            )}

            <div className="divider" />
            <div className="icon-item">
              <Button onClick={handleLogout} className='' variant='danger'>Logout</Button>
            </div>
            <div className="divider" />

            <div className="icon-item">
              <Image src={balance} alt="balance" className="img" />
            </div>
            <div className="divider" />

            <Link to="/front/favourite">
              <div className="icon-item position-relative">
                <Image src={favourite} alt="favourite" className="img" />
                {favouriteCount > 0 && (
                  <Badge pill bg="danger" className="badge">
                    {favouriteCount}
                  </Badge>
                )}
              </div>
            </Link>

            <div className="divider" />

            <div className="icon-item position-relative" onClick={() => dispatch(cartActions.toggleCart())}>
              <Image src={cart} alt="cart" className="img" />
              <Badge pill bg="danger" className="badge">{totalItems}</Badge>
            </div>

          </Col>
        </Row>
      </Container>
      <CartSidebar />
    </header>
  );
};

export default Header;
