import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Table, Form, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { auctionActions } from '../store/auction-slice';
import auctionItems from '../components/auctionItems';
import { Link } from "react-router-dom";
import CustomPagination from './CustomPagination';
import ImageInputSelector from './InputImageSelector';
const API_BASE = "http://localhost:5001/auctions";

const Auction = () => {
    const dispatch = useDispatch();
    const auctionStateItems = useSelector((state) => state.auction.itemsList);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch(API_BASE)
            .then(res => res.json())
            .then(data => {
                dispatch(auctionActions.replaceData(data));
                setCurrentPage(1);
            })
            .catch(err => console.error("Error fetching Auctions:", err))
    }, [dispatch]);


    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minTime, setMinTime] = useState('');
    const [maxTime, setMaxTime] = useState('');
    const [timeUnit, setTimeUnit] = useState('days');
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        startingPrice: '',
        timeLeft: '',
        timeLeftSeconds: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(auctionActions.tick());
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const formatTime = (seconds) => {
        const d = Math.floor(seconds / 86400);
        const h = Math.floor((seconds % 86400) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${d}d : ${h}h : ${m}m : ${s}s`;
    };

    const convertToSeconds = (value, unit) => {
        const val = parseInt(value);
        if (isNaN(val)) return 0;
        switch (unit) {
            case 'days': return val * 86400;
            case 'hours': return val * 3600;
            case 'minutes': return val * 60;
            case 'seconds': return val;
            default: return 0;
        }
    };

    const parseTimeStringToSeconds = (timeStr) => {
        const regex = /(\d+)d\s*:\s*(\d+)h\s*:\s*(\d+)m\s*:\s*(\d+)s/;
        const match = timeStr.match(regex);
        if (!match) return 0;
        const [, d, h, m, s] = match.map(Number);
        return (d * 86400) + (h * 3600) + (m * 60) + s;
    };
    
    const handleResetAuctionItems = () => {
        dispatch(auctionActions.replaceData(auctionItems));
        alert("Auction items reset to default.");
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setFormData({
            title: item.title,
            image: item.image,
            startingPrice: item.startingPrice,
            timeLeft: item.timeLeft,
            timeLeftSeconds: item.timeLeftSeconds,
        });
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditItem(null);
        setFormData({ title: '', image: '', startingPrice: '', timeLeft: '', timeLeftSeconds: 0 });
        setShowForm(true);
    };


    const handleSubmit = () => {
        const { title, image, startingPrice, timeLeft } = formData;
        if (!title || !image || !startingPrice || !timeLeft) {
            alert("Please fill all fields.");
            return;
        }

        const seconds = parseTimeStringToSeconds(timeLeft);
        const itemData = {
            auctionId: editItem ? editItem.auctionId : undefined,
            type: 'Auction',
            title,
            image,
            startingPrice: parseFloat(startingPrice),
            timeLeft,
            timeLeftSeconds: seconds,
        };
        if (editItem) {
            fetch(`${API_BASE}/${editItem.auctionId}`, {
                method: "PUT",
                headers: { "Content-type": "Application/json" },
                body: JSON.stringify(itemData)
            })
                .then(res => res.json())
                .then(updated => {
                    dispatch(auctionActions.updateItem(updated));
                    alert("Item Updated");
                    setShowForm(false);
                })
                .catch(err => console.error("update failed:", err));
        } else {
            fetch(API_BASE, {
                method: "POST",
                headers: { "Content-type": "Application/json" },
                body: JSON.stringify(itemData)
            })
                .then(res => res.json())
                .then(created => {
                    dispatch(auctionActions.addItem(created));
                    alert("Item Created");
                    setShowForm(false);
                })
                .catch(err => console.error("error while creationg:", err));
        }
    };
    const handleRemove = (auctionId) => {
        fetch(`${API_BASE}/${auctionId}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => {
                dispatch(auctionActions.removeItem(auctionId));
            })
            .catch(err => console.log("Error while deleting:", err));
    }

    const handleClearFilters = () => {
        setSearchQuery('');
        setMinPrice('');
        setMaxPrice('');
        setMinTime('');
        setMaxTime('');
        setTimeUnit('days');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredItems = auctionStateItems.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toString().includes(searchQuery);

        const price = parseFloat(item.startingPrice);
        const matchesPrice =
            (!minPrice || price >= parseFloat(minPrice)) &&
            (!maxPrice || price <= parseFloat(maxPrice));

        const matchesTime =
            (!minTime || item.timeLeftSeconds >= convertToSeconds(minTime, timeUnit)) &&
            (!maxTime || item.timeLeftSeconds <= convertToSeconds(maxTime, timeUnit));

        return matchesSearch && matchesPrice && matchesTime;
    });
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            {!showForm ? (
                <Container style={{
                    transition: 'margin-left 0.3s',
                    backgroundColor: '#e9efe9ff',
                    boxShadow: '0px 2px 8px rgba(0, 128, 0, 0.15)',
                    padding: '16px',
                }}>
                    <Row className="mb-4 align-items-center">
                        <Col>
                            <h2 className="text-dark" style={{ fontFamily: 'sans-serif' }}>Auction Items Management</h2>
                            <p className="text-muted"><strong>Filtered items: {filteredItems.length}</strong></p>
                        </Col>
                        <Col className="text-end">
                            <Button variant="success" className="me-2" onClick={handleAdd}>Add a New Item</Button>
                            <Button variant='danger' className="me-2" onClick={() => dispatch(auctionActions.clearAll())}>Clear All</Button>
                            <Button variant='info' className="me-2" onClick={handleResetAuctionItems}>Reset Auction Data</Button>
                        </Col>
                    </Row>
                    <Form className="mb-4" style={{ fontFamily: 'sans-serif' }}>
                        <Row className="align-items-center gy-2">
                            <Col md={2}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by ID, Title, or Condition"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="number"
                                    placeholder="Min Price"
                                    value={minPrice}
                                    onChange={(e) => {
                                        setMinPrice(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="number"
                                    placeholder="Max Price"
                                    value={maxPrice}
                                    onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
                                />
                            </Col>
                            <Col md={1}>
                                <Form.Select value={timeUnit} onChange={(e) => { setTimeUnit(e.target.value); setCurrentPage(1); }} style={{ fontSize: '10px' }}>
                                    <option value="days">Days</option>
                                    <option value="hours">Hours</option>
                                    <option value="minutes">Minutes</option>
                                    <option value="seconds">Seconds</option>
                                </Form.Select>
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="number"
                                    placeholder="Min Time"
                                    value={minTime}
                                    onChange={(e) => { setMinTime(e.target.value); setCurrentPage(1); }}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="number"
                                    placeholder="Max Time"
                                    value={maxTime}
                                    onChange={(e) => { setMaxTime(e.target.value); setCurrentPage(1); }}
                                />
                            </Col>
                            <Col md={1}>
                                <Button variant="secondary" onClick={handleClearFilters}>Clear</Button>
                            </Col>
                        </Row>
                    </Form>

                    <Table striped bordered hover responsive className="shadow-sm">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Time Left</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center align-middle">
                            {currentItems.map((item) => (
                                <tr key={item.auctionId}>
                                    <td>{item.auctionId}</td>
                                    <td>{item.type}</td>
                                    <td>{item.title}</td>
                                    <td><Image src={item.image} alt={item.title} style={{ height: '50px', borderRadius: '8px' }} fluid /></td>
                                    <td>Rs. {item.startingPrice}</td>
                                    <td>{formatTime(item.timeLeftSeconds)}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleRemove(item.auctionId)}>Remove</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Row className="mt-5">
                        <Col md={4} style={{ marginTop: '5px' }}>
                            <Link to="/" className="text-decoration-none">
                                <h5 className="text-primary">Go to Home</h5>
                            </Link>
                        </Col>
                        <Col md={4}>
                            <CustomPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />

                        </Col>
                        <Col md={4} className="text-end" style={{ marginTop: '5px' }}>
                            <Link to="/admin" className="text-decoration-none">
                                <h5 className="text-primary">Go to Admin Page</h5>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col md={10} lg={8}>
                            <Card className="shadow-sm border-0 p-4" style={{ backgroundColor: '#0f1010ff', borderRadius: '8px' }}>
                                <h2 className="mb-4 text-success text-center fw-bold">{editItem ? 'Edit Auction Item' : 'Add New Auction Item'}</h2>
                                <Form>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control name="title" placeholder="Item Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control name="startingPrice" placeholder="Starting Price" value={formData.startingPrice} onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control name="timeLeft" placeholder="Time Left (e.g. 1d : 2h : 10m : 30s)" value={formData.timeLeft} onChange={(e) => setFormData({ ...formData, timeLeft: e.target.value })} />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <ImageInputSelector
                                                value={formData.image}
                                                onChange={(img) => setFormData({ ...formData, image: img })}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-4 text-center">
                                        <Col>
                                            <Button variant="success" className="w-100" onClick={handleSubmit}>
                                                {editItem ? 'Update Item' : 'Add Item'}
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button variant="danger" className="w-100" onClick={() => setShowForm(false)}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            )}

        </>
    );
};


export default Auction;
