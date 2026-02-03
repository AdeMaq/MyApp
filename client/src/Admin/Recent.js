import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, Table, Form, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { recentActions } from '../store/recent-slice';
import recentItems from '../components/recentItems';
import CustomPagination from './CustomPagination';

const Recent = () => {
    const dispatch = useDispatch();
    const stateItems = useSelector((state) => state.recent.itemsList);
    //for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        condition: '',
        delivery: '',
        price: '',
        tag: '',
    });

    const handleResetItems = () => {
        dispatch(recentActions.replaceData(recentItems));
        alert("Recent items reset to default.");
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setFormData(item);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditItem(null);
        setFormData({ id: '', title: '', image: '', price: '', tag: '', condition: '', delivery: '' });
        setShowForm(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const {  title, image, condition, delivery, price, tag } = formData;
        if (!title || !image || !price || !tag || !condition || !delivery) {
            alert("Please fill all fields.");
            return;
        }

        const item = {
            id: editItem ? editItem.id : Date.now(),
            type: 'Recent',
            title,
            image,
            condition,
            delivery,
            price: parseFloat(price),
            tag,
        };

        if (editItem) {
            dispatch(recentActions.updateItem(item));
            alert("Item updated!");
        } else {
            dispatch(recentActions.addItem(item));
            alert("Item added!");
        }

        setSearchQuery('');
        setMinPrice('');
        setMaxPrice('');

        setShowForm(false);
    };

    // Pagination logic

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredItems = stateItems.filter((item) => {
        const deliveryStr = (item.delivery ?? '').toString().toLowerCase();
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deliveryStr.includes(searchQuery.toLowerCase()) ||
            item.id.toString().includes(searchQuery) ||
            item.price.toString().includes(searchQuery);

        //const matchesCondition = conditionFilter ? item.condition === conditionFilter : true;

        const matchesPrice =
            (!minPrice || item.price >= parseFloat(minPrice)) &&
            (!maxPrice || item.price <= parseFloat(maxPrice));

        return matchesSearch && matchesPrice;
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
                            <h2 className="text-dark" style={{ fontFamily: 'sans-serif' }}>Recent Items Management</h2>
                            <p className="text-muted" style={{ fontFamily: 'sans-serif' }}><strong>Current items: {stateItems.length}</strong></p>
                        </Col>
                        <Col className="text-end">
                            <Button variant="success" className="me-2" onClick={handleAdd}>Add a New Item</Button>
                            <Button variant='danger' className="me-2" onClick={() => dispatch(recentActions.clearAll())}>Clear All</Button>
                            <Button variant='info' className="me-2" onClick={handleResetItems}>Reset Recent items Data</Button>
                        </Col>
                    </Row>

                    <Form className="mb-3">
                        <Row>
                            <Col md={5}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by ID, Title, or Condition"
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="number"
                                    placeholder="Min Price"
                                    value={minPrice}
                                    onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
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
                            <Col md={1} className="text-end">
                                <Button variant="secondary" onClick={() => {
                                    setSearchQuery('');
                                    setMinPrice('');
                                    setMaxPrice('');
                                }}>
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    <Table striped bordered hover responsive className="shadow-sm">
                        <thead className="table-dark text-center" style={{ fontFamily: 'sans-serif' }}>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Image</th>
                                <th>Condition</th>
                                <th>Title</th>
                                <th>Delivery</th>
                                <th>Price</th>
                                <th>Tag</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center align-middle">
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.type}</td>
                                    <td><Image src={item.image} alt={item.title} style={{ height: '50px', borderRadius: '8px' }} fluid /></td>
                                    <td>{item.condition}</td>
                                    <td>{item.title}</td>
                                    <td>{item.delivery}</td>
                                    <td>Rs. {item.price}</td>
                                    <td>{item.tag}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => dispatch(recentActions.removeItem(item.id))}>Remove</Button>
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
                                <h2 className="mb-4 text-success text-center fw-bold">{editItem ? 'Edit Recent Item' : 'Add New Recent Item'}</h2>
                                <Form>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control name="title" placeholder="Item Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Control name="condition" placeholder="Product Condition" value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control name="delivery" placeholder="Item Delivery" value={formData.delivery} onChange={(e) => setFormData({ ...formData, delivery: e.target.value })} />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">

                                        <Col>
                                            <Form.Control name="price" placeholder="Give the Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control name="tag" placeholder="Add to Cart/Pre Order" value={formData.tag} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} />
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

export default Recent;
