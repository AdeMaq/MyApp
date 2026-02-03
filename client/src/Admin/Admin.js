import React from 'react';
import { Container, Row, Col, Card, InputGroup, FormControl, Image, Button } from 'react-bootstrap';
import { Home, Clock, Box, Tag, Grid, BarChart2, Bell } from 'react-feather';
import logo from '../asserts/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';

const cardThemes = {
    auction: { bg: 'linear-gradient(135deg, #4a00e0, #8e2de2)', iconBg: '#ffffff20', iconColor: '#fff' },
    recent: { bg: 'linear-gradient(135deg, #0f9b0f, #00ff95)', iconBg: '#ffffff20', iconColor: '#fff' },
    arrivals: { bg: 'linear-gradient(135deg, #f7971e, #ffd200)', iconBg: '#ffffff20', iconColor: '#fff' },
    sales: { bg: 'linear-gradient(135deg, #43cea2, #185a9d)', iconBg: '#ffffff20', iconColor: '#fff' },
    all: { bg: 'linear-gradient(135deg, #f1e37eff, #e032f0ff)', iconBg: '#ffffff20', iconColor: '#fff' },
    sidebar: { bg: 'linear-gradient(135deg, #e13974ff, #32f09aff)', iconBg: '#ffffff20', iconColor: '#fff' },
    home: { bg: '#7ea9d3ff', iconBg: '#e0e7ff', iconColor: '#0f172a' },
};

const ThemedCard = ({ title, description, icon, theme, onClick }) => (
    <Card
        className="text-white text-center shadow-sm border-0"
        style={{
            background: theme.bg,
            borderRadius: '1rem',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        onClick={onClick}
    >
        <Card.Body>
            <div
                className="rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
                style={{
                    width: 60,
                    height: 60,
                    background: theme.iconBg,
                }}
            >
                {React.cloneElement(icon, { color: theme.iconColor, size: 28 })}
            </div>
            <Card.Title className="fw-bold">{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
        </Card.Body>
    </Card>
);

const MarketStat = ({ title, value, icon, delta, deltaColor }) => (
    <Card className="shadow-sm border" style={{ borderWidth: '3px', borderboxShadow: '0 4px 12px rgba(0, 128, 0, 0.4)' }}>
        <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
                <small className="text-muted">{title}</small>
                <h5 className="fw-bold mb-0">{value}</h5>
                <small className={deltaColor}>{delta}</small>
            </div>
            <div className="bg-light rounded-circle d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
                {icon}
            </div>
        </Card.Body>
    </Card>
);

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = useSelector((state) => state.auth.email);
    const name = useSelector((state) => state.auth.name);
    const profilePic = useSelector((state) => state.auth.profilePic);
    const handleLogout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };
    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <div className="p-4" style={{ width: '500px', background: 'linear-gradient(180deg, #ffffff, #f1f5f9)', borderRight: '1px solid #e2e8f0' }}>
                <div className="d-flex align-items-center ">
                    <div className="rounded-circle  d-flex justify-content-center align-items-center px-1" >
                        <Image src={logo} alt="Wise Market Logo" className="logo" style={{ width: 100, height: 100 }} />
                    </div>
                    <h2 className="ms-2 fw-bold text-success mb-0">Admin</h2>
                </div>
                <div className="d-flex flex-column gap-4 mt-3 small">
                    <Link to="/dashboard/all" style={{ textDecoration: 'none' }}>
                        <Button className="d-flex align-items-center border-0"
                            style={{
                                width:'250px'
                            }}>
                            <div className="d-flex align-items-center">
                                <span style={{ fontSize: '18px' }}>All items Management</span>
                            </div>
                        </Button>
                    </Link>
                    <Link to="/dashboard/sale" style={{ textDecoration: 'none' }}>
                        <Button
                            className="d-flex  align-items-center text-white border-0 "
                            style={{
                                background: 'linear-gradient(135deg, #678ef8ff, #8e2de2)',
                                width:'250px'
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <span style={{ fontSize: '18px' }}>Sale items Management</span>
                            </div>
                        </Button>
                    </Link>
                    <Link to="/dashboard/new" style={{ textDecoration: 'none' }}>
                        <Button className="d-flex align-items-center border-0"
                            style={{
                                background: 'linear-gradient(135deg, #11998e, #38ef7d)',
                                width:'250px'
                            }}>
                            <div className="d-flex align-items-center">
                                <span style={{ fontSize: '18px' }}>New Items Management</span>
                            </div>
                        </Button>
                    </Link>
                    <Link to="/dashboard/recent" style={{ textDecoration: 'none' }}>
                        <Button className="d-flex align-items-center border-0"
                            style={{
                                background: 'linear-gradient(135deg, #f7971e, #ffd200)',
                                width:'250px'
                            }}>
                            <div className="d-flex align-items-center">
                                <span style={{ fontSize: '18px' }}>Recent items Management</span>
                            </div>
                        </Button>
                    </Link>
                    <Link to="/dashboard/auction" style={{ textDecoration: 'none' }}>
                        <Button className="d-flex justify-content-between align-items-center border-0"
                            style={{
                                background: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)',
                                width:'250px'
                            }}>
                            <div className="d-flex align-items-center">
                                <span style={{ fontSize: '18px' }}>Auction Management</span>
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">Dashboard</h2>
                        <p className="text-muted">Welcome back! Here's what's happening today.</p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <InputGroup size="sm" style={{ width: '220px' }}>
                            <FormControl placeholder="Search..." />
                        </InputGroup>
                        <Bell size={20} />
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <Image
                                    src={profilePic}
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{ width: 36, height: 36, objectFit: 'cover' }}
                                />
                            </div>
                            <div className="ms-2 small">
                                <div className="fw-bold">{name}</div>
                                <div className="text-muted">{email}</div>
                            </div>
                        </div>
                        <div>
                            <Button className='' variant='danger' onClick={handleLogout}>Logout</Button>
                        </div>
                    </div>
                </div>

                {/* Market Stats Cards */}
                <Row xs={1} md={2} lg={4} className="g-4 mb-4">
                    <Col>
                        <MarketStat
                            title="Total Products"
                            value="2,847"
                            delta="+12% from last month"
                            deltaColor="text-success"
                            icon={<Box size={20} color="#4f46e5" />}
                        />
                    </Col>
                    <Col>
                        <MarketStat
                            title="Active Auctions"
                            value="156"
                            delta="+8% from last week"
                            deltaColor="text-success"
                            icon={<BarChart2 size={20} color="#16a34a" />}
                        />
                    </Col>
                    <Col>
                        <MarketStat
                            title="Sales Today"
                            value="$24,567"
                            delta="+15% from yesterday"
                            deltaColor="text-success"
                            icon={<Tag size={20} color="#f59e0b" />}
                        />
                    </Col>
                    <Col>
                        <MarketStat
                            title="Pending Reviews"
                            value="23"
                            delta="-3 from yesterday"
                            deltaColor="text-danger"
                            icon={<Clock size={20} color="#8b5cf6" />}
                        />
                    </Col>
                    <Col>
                        <MarketStat
                            title="Total Revenue"
                            value="$124,590"
                            delta="+12.5% from last month"
                            deltaColor="text-success"
                            icon={<Tag size={20} color="#10b981" />}
                        />
                    </Col>

                    <Col>
                        <MarketStat
                            title="Active Users"
                            value="2,847"
                            delta="+8.2% from last week"
                            deltaColor="text-success"
                            icon={<Grid size={20} color="#3b82f6" />}
                        />
                    </Col>

                    <Col>
                        <MarketStat
                            title="Total Orders"
                            value="1,429"
                            delta="+23.1% from last month"
                            deltaColor="text-success"
                            icon={<Box size={20} color="#6366f1" />}
                        />
                    </Col>

                    <Col>
                        <MarketStat
                            title="Product Views"
                            value="89,432"
                            delta="+15.3% from last week"
                            deltaColor="text-success"
                            icon={<BarChart2 size={20} color="#f97316" />}
                        />
                    </Col>

                    <Col>
                        <MarketStat
                            title="Customer Rating"
                            value="4.8/5"
                            delta="+0.2 from last month"
                            deltaColor="text-success"
                            icon={<Grid size={20} color="#f59e0b" />}
                        />
                    </Col>
                </Row>


                {/* Management Cards */}
                <Container fluid>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        <Col>
                            <Link to="/dashboard/auction" style={{ textDecoration: 'none' }}>
                                <ThemedCard
                                    title="Auction Items Management"
                                    description="Manage auction items with advanced filtering and analytics."
                                    icon={<BarChart2 />}
                                    theme={cardThemes.auction}
                                />
                            </Link>
                        </Col>

                        <Col>
                            <Link to="/dashboard/recent" style={{ textDecoration: 'none' }}>
                                <ThemedCard
                                    title="Recent Items Management"
                                    description="Curate the list of recent items and monitor trending products."
                                    icon={<Clock />}
                                    theme={cardThemes.recent}
                                />
                            </Link>
                        </Col>

                        <Col>
                            <Link to="/dashboard/new" style={{ textDecoration: 'none' }}>
                                <ThemedCard
                                    title="New Arrivals Management"
                                    description="Add new products to the collection and manage inventory."
                                    icon={<Box />}
                                    theme={cardThemes.arrivals}
                                />
                            </Link>
                        </Col>

                        <Col>
                            <Link to="/dashboard/sale" style={{ textDecoration: 'none' }}>
                                <ThemedCard
                                    title="Sales Items Management"
                                    description="Handle items on sale and manage promotional campaigns."
                                    icon={<Tag />}
                                    theme={cardThemes.sales}
                                />
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/dashboard/all" style={{ textDecoration: 'none' }}>
                                <ThemedCard
                                    title="All Items Management"
                                    description="Handle all the items which include recent,sale.auction,new."
                                    icon={<Tag />}
                                    theme={cardThemes.all}
                                />
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <ThemedCard
                                    title="Back to Home"
                                    description="Return to the main site and customer interface."
                                    icon={<Home />}
                                    theme={cardThemes.home}
                                />
                            </Link>
                        </Col>
                    </Row>
                </Container>

            </div>
        </div>
    );
};

export default Admin;
