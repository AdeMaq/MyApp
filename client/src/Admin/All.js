import { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Table, Form, Card, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { saleActions } from '../store/sale-slice';
import { recentActions } from '../store/recent-slice';
import { newActions } from '../store/new-slice';
import CustomPagination from './CustomPagination';

const API_URL = 'http://localhost:5001/products';
const CATEGORY_API_URL = "http://localhost:5001/categories";
const VENT_API_URL = "http://localhost:5001/vent";
const BRAND_URL = 'http://localhost:5001/brand';

const STORAGE_OPTIONS = {
    Mobile: ["64GB", "128GB", "256GB", "512GB", "1TB"],
    Laptop: ["128GB SSD", "256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"],
};

const RAM_OPTIONS = {
    Mobile: ["4GB", "8GB"],
    Laptop: ["4GB", "8GB", "16GB", "32GB", "64GB"],
};

const PROCESSOR_OPTIONS = {
    dell: ["i3", "i5", "i7", "i9"],
    lenovo: ["i3", "i5", "i7"],
    hp: ["i3", "i5", "i7"],
};

const CONNECTIVITY = {
    "Smart Watches": ["GPS"],
};

const All = () => {
    const dispatch = useDispatch();
    const saleStateItems = useSelector((state) => state.sale.itemsList);
    const newStateItems = useSelector((state) => state.new.itemsList);
    const recentStateItems = useSelector((state) => state.recent.itemsList);

    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showVentForm, setShowVentForm] = useState(false);
    const [showBrandForm, setShowBrandForm] = useState(false);

    const [selectedType, setSelectedType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const [categoryTypes, setCategoryTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryItems, setCategoryItems] = useState([]);

    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedItemId, setSelectedItemId] = useState('');

    const [ventTypes, setVentTypes] = useState([]);
    const [vents, setVents] = useState([]);
    const [ventItems, setVentItems] = useState([]);
    // const [ventItemTypes, setVentItemTypes] = useState([]);

    const [selectedVentTypeId, setSelectedVentTypeId] = useState('');
    const [selectedVentId, setSelectedVentId] = useState('');
    const [selectedVentItemId, setSelectedVentItemId] = useState('');
    const [selectedVentItemTypeId, setSelectedVentItemTypeId] = useState('');

    const [brands, setBrands] = useState([]);
    const [brandItems, setBrandItems] = useState([]);

    const [selectedStorage, setSelectedStorage] = useState('');
    const [selectedRam, setSelectedRam] = useState('');
    const [selectedProcessor, setSelectedProcessor] = useState('');
    const [selectedConnectivity, setSelectedConnectivity] = useState('');

    const [ventItemName, setVentItemName] = useState("");
    const [ventItemStorage, setVentItemStorage] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${CATEGORY_API_URL}`);
                const data = await res.json();
                setCategoryTypes(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchVents = async () => {
            try {
                const res = await fetch(`${VENT_API_URL}`);
                const data = await res.json();
                setVentTypes(data);
            } catch (err) {
                console.error("Error fetching vents:", err);
            }
        };
        fetchVents();
    }, []);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await fetch(BRAND_URL);
            const data = await res.json();
            setBrands(data);
        } catch (err) {
            console.error("Error fetching brands:", err);
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        image: '',
        condition: '',
        delivery: '',
        price: '',
        newPrice: '',
        discount: '',
        tag: '',
        ventItemName: '',
    });

    const getAllItems = () => [...saleStateItems, ...newStateItems, ...recentStateItems];
    const stateItems = selectedType === 'sale'
        ? saleStateItems
        : selectedType === 'new'
            ? newStateItems
            : selectedType === 'recent'
                ? recentStateItems
                : getAllItems();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();

                if (selectedType === 'sale') {
                    dispatch(saleActions.replaceData(data.filter(p => p.type === 'sale')));
                } else if (selectedType === 'new') {
                    dispatch(newActions.replaceData(data.filter(p => p.type === 'new')));
                } else if (selectedType === 'recent') {
                    dispatch(recentActions.replaceData(data.filter(p => p.type === 'recent')));
                } else {
                    dispatch(saleActions.replaceData(data.filter(p => p.type === 'sale')));
                    dispatch(newActions.replaceData(data.filter(p => p.type === 'new')));
                    dispatch(recentActions.replaceData(data.filter(p => p.type === 'recent')));
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchItems();
        setCurrentPage(1);
    }, [selectedType, dispatch]);
    
    const filteredItems = stateItems.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.condition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productId?.toString().includes(searchQuery)
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleBrandChange = (brandId) => {
        const selectedBrand = brands.find((b) => b.brandId === parseInt(brandId));
        setBrandItems(selectedBrand ? selectedBrand.brandItems : []);
        setFormData({ ...formData, brandItemId: '' });
    };
    const handleSubmit = async () => {
        const parsedPrice = parseFloat(formData.price);
        let newPrice = parsedPrice;
        if (formData.type === 'sale') {
            const discountStr = formData.discount.trim();
            if (discountStr.endsWith("%")) {
                const percentage = parseFloat(discountStr);
                newPrice = Math.round(parsedPrice * (1 - percentage / 100));
            } else {
                const flat = parseInt(discountStr.replace(/[^0-9]/g, ""));
                newPrice = parsedPrice - flat;
            }
        }

        let storageString = "";
        if (selectedStorage) storageString += selectedStorage;
        if (selectedRam) storageString += (storageString ? ", " : "") + selectedRam;
        if (selectedProcessor) storageString += (storageString ? ", " : "") + selectedProcessor;
        if (selectedConnectivity) storageString += (storageString ? ", " : "") + selectedConnectivity;

        let ventItemId = selectedVentItemId || null;
        if (ventItemName && selectedVentId) {
            try {
                const res = await fetch(`${VENT_API_URL}/item`, {
                    method: "POST",
                    headers: { "Content-type": "Application/json" },
                    body: JSON.stringify({
                        name: ventItemName,
                        storage:storageString,
                        ventId: selectedVentId,
                    }),
                })
                if (!res.ok) {
                    throw new Error("Error adding model");
                }
                const createdItem = await res.json();
                ventItemId = createdItem.ventItemId;
            } catch (error) {
                console.error("Error Creating VentItem", error);
                alert("failed to create ventItem");
                return;
            }
        }

        const item = {
            productId: editItem ? editItem.productId : undefined,
            type: formData.type,
            title: formData.title,
            image: formData.image,
            condition: formData.condition,
            delivery: formData.delivery,
            price: parsedPrice,
            newPrice: formData.type === 'sale' ? newPrice : '',
            discount: formData.type === 'sale' ? formData.discount : '',
            tag: formData.tag,
            categoryTypeId: selectedTypeId || null,
            categoryId: selectedCategoryId || null,
            categoryItemId: selectedItemId || null,
            ventTypeId: selectedVentTypeId || null,
            ventId: selectedVentId || null,
            ventItemId: ventItemId || null,
            ventItemTypeId: selectedVentItemTypeId || null,
            storage: storageString,
            // ventItemName: formData.ventItemName,
        };

        try {
            const res = await fetch(
                editItem ? `${API_URL}/${editItem.productId}` : API_URL,
                {
                    method: editItem ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item),
                }
            );

            if (!res.ok) throw new Error('Failed to save product');
            alert(editItem ? "Item updated!" : "Item added!");
            setShowForm(false);
            const updatedRes = await fetch(API_URL);
            const updatedData = await updatedRes.json();
            dispatch(saleActions.replaceData(updatedData.filter(p => p.type === 'sale')));
            dispatch(newActions.replaceData(updatedData.filter(p => p.type === 'new')));
            dispatch(recentActions.replaceData(updatedData.filter(p => p.type === 'recent')));
        } catch (err) {
            console.error(err);
            alert('Error saving product');
        }
    };
    const handleEdit = (item) => {
        setEditItem(item);
        setFormData({
            ...item,
            price: item.price || item.oldPrice || '',
            brandItemId: item.brandItem ? item.brandItem.brandItemId : '',
        });
        setSelectedType(item.type);
        setShowForm(true);
    };
    const handleAdd = () => {
        setEditItem(null);
        setFormData({
            title: '',
            type: selectedType === 'all' ? '' : selectedType,
            image: '',
            condition: 'Brand New',
            delivery: 'Free Delivery',
            price: '',
            newPrice: '',
            discount: '',
            tag: 'Add To Cart',
            ventItemName: '',
        });
        setShowForm(true);
    };

    const handleRemove = async (item) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            const res = await fetch(`${API_URL}/${item.productId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete product');
            alert("Item deleted!");

            const updatedRes = await fetch(API_URL);
            const updatedData = await updatedRes.json();
            dispatch(saleActions.replaceData(updatedData.filter(p => p.type === 'sale')));
            dispatch(newActions.replaceData(updatedData.filter(p => p.type === 'new')));
            dispatch(recentActions.replaceData(updatedData.filter(p => p.type === 'recent')));
        } catch (err) {
            console.error(err);
            alert('Error deleting product');
        }
    };

    return (
        <Container style={{
            transition: 'margin-left 0.3s',
            backgroundColor: '#e9efe9ff',
            boxShadow: '0px 2px 8px rgba(0, 128, 0, 0.15)',
            padding: '16px',
        }}>
            <Row className="mb-3">
                <Col><h2 className="text-success">Item Management</h2></Col>
            </Row>

            {!showForm ? (
                <>
                    <Row>
                        <Col className="text-end" style={{ paddingBottom: '12px' }}>
                            <Form.Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ width: '200px' }}>
                                <option value="all">All</option>
                                <option value="sale">Sale</option>
                                <option value="new">New Arrivals</option>
                                <option value="recent">Recent</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={3}>
                            <Link to="/managecategory">
                                <Button variant="outline-success">Manage Category</Button>
                            </Link>
                        </Col>
                        <Col md={3}>
                            <Link to="/managevent">
                                <Button variant="outline-danger">Manage Vent</Button>
                            </Link>
                        </Col>
                        <Col md={2}>
                            <Link to="/manage">
                                <Button variant="outline-warning">Manage Brand</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col><Button variant="success" onClick={handleAdd}>Add Item</Button></Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
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
                    </Row>

                    <Table striped bordered hover>
                        <thead className='table-dark'>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Condition</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>New Price</th>
                                <th>Discount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(item => (
                                <tr key={item.productId}>
                                    <td>{item.productId}</td>
                                    <td><Image src={item.image} height={50} /></td>
                                    <td>{item.title}</td>
                                    <td>{item.condition}</td>
                                    <td>{item.type}</td>
                                    <td>{item.price}</td>
                                    <td>{item.newPrice || '-'}</td>
                                    <td>{item.discount || '-'}</td>
                                    <td>
                                        <Button size="sm" variant="warning" onClick={() => handleEdit(item)}>Edit</Button>{' '}
                                        <Button size="sm" variant="danger" onClick={() => handleRemove(item)}>Delete</Button>
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
                </>
            ) : (
                <Card className="p-4">
                    <h4 className="text-center mb-3">{editItem ? 'Edit' : 'Add'} Item</h4>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                disabled={editItem !== null || selectedType !== 'all'}
                            >
                                <option value="">Select Type</option>
                                <option value="sale">Sale</option>
                                <option value="new">New</option>
                                <option value="recent">Recent</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control value={formData.condition || "Brand New"} onChange={(e) => setFormData({ ...formData, condition: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control value={formData.delivery || "Free Delivery"} onChange={(e) => setFormData({ ...formData, delivery: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control placeholder={formData.type === 'sale' ? 'Old Price' : 'Price'} value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                        </Form.Group>
                        {formData.type === 'sale' && (
                            <Form.Group className="mb-2">
                                <Form.Control placeholder="Discount (e.g. 10% or -500)" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
                            </Form.Group>
                        )}
                        <Form.Group className="mb-2">
                            <Form.Select
                                value={formData.tag || "Add To Cart"}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                            >
                                <option value="Add To Cart">Add To Cart</option>
                                <option value="Pre Order">Pre Order</option>
                            </Form.Select>
                        </Form.Group>
                        <Card className="mb-2">
                            <Card.Header
                                onClick={() => setShowCategoryForm(!showCategoryForm)}
                                style={{ cursor: 'pointer' }}
                            >
                                <strong>Category</strong>
                            </Card.Header>
                            {showCategoryForm && (
                                <Card.Body>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Category Type</Form.Label>
                                        <Form.Select
                                            value={selectedTypeId}
                                            onChange={(e) => {
                                                const typeId = e.target.value;
                                                setSelectedTypeId(typeId);
                                                const selected = categoryTypes.find(t => t.categoryTypeId.toString() === typeId);
                                                setCategories(selected?.categories || []);
                                                setCategoryItems([]);
                                            }}
                                        >
                                            <option value="">Select Category Type</option>
                                            {categoryTypes.map(type => (
                                                <option key={type.categoryTypeId} value={type.categoryTypeId}>{type.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select
                                            value={selectedCategoryId}
                                            onChange={(e) => {
                                                const catId = e.target.value;
                                                setSelectedCategoryId(catId);
                                                const selected = categories.find(c => c.categoryId.toString() === catId);
                                                setCategoryItems(selected?.categoryItems || []);
                                            }}
                                            disabled={!categories.length}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Category Item</Form.Label>
                                        <Form.Select
                                            value={selectedItemId}
                                            onChange={(e) => setSelectedItemId(e.target.value)}
                                            disabled={!categoryItems.length}
                                        >
                                            <option value="">Select Category Item</option>
                                            {categoryItems.map(item => (
                                                <option key={item.categoryItemId} value={item.categoryItemId}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Card.Body>
                            )}
                        </Card>
                        <Card className="mb-2">
                            <Card.Header
                                onClick={() => setShowVentForm(!showVentForm)}
                                style={{ cursor: 'pointer' }}
                            >
                                <strong>Vent</strong>
                            </Card.Header>
                            {showVentForm && (
                                <Card.Body>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Vent Type</Form.Label>
                                        <Form.Select
                                            value={selectedVentTypeId}
                                            onChange={(e) => {
                                                const typeId = e.target.value;
                                                setSelectedVentTypeId(typeId);
                                                const selected = ventTypes.find(vt => vt.ventTypeId.toString() === typeId);
                                                setVents(selected?.vents || []);
                                                setVentItems([]);
                                            }}
                                        >
                                            <option value="">Select Vent Type</option>
                                            {ventTypes.map(type => (
                                                <option key={type.ventTypeId} value={type.ventTypeId}>{type.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Vent</Form.Label>
                                        <Form.Select
                                            value={selectedVentId}
                                            onChange={(e) => {
                                                const vId = e.target.value;
                                                setSelectedVentId(vId);
                                                const selected = vents.find(v => v.ventId.toString() === vId);
                                                setVentItems(selected?.ventItems || []);
                                            }}
                                            disabled={!vents.length}
                                        >
                                            <option value="">Select Vent</option>
                                            {vents.map(v => (
                                                <option key={v.ventId} value={v.ventId}>{v.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    {/* <Form.Group className="mb-2">
                                        <Form.Label>Models</Form.Label>
                                        <Form.Select
                                            value={selectedVentItemId}
                                            onChange={(e) => {
                                                const viId = e.target.value;
                                                setSelectedVentItemId(viId);
                                                const selected = ventItems.find(i => i.ventItemId.toString() === viId);
                                                setVentItemTypes(selected?.ventItemTypes || []);
                                            }}
                                            disabled={!ventItems.length}
                                        >
                                            <option value="">Select Vent Item</option>
                                            {ventItems.map(i => (
                                                <option key={i.ventItemId} value={i.ventItemId}>{i.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group> */}
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Models</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeHolder={"Enter a Model for the item"}
                                                value={ventItemName}
                                                onChange={(e) => setVentItemName(e.target.value)}
                                                disabled={!selectedVentId.length}
                                            />
                                        </InputGroup>

                                    </Form.Group>
                                    {(() => {
                                        const selectedVentType = ventTypes.find(vt => vt.ventTypeId.toString() === selectedVentTypeId);
                                        const selectedVent = vents.find(v => v.ventId.toString() === selectedVentId);

                                        if (selectedVentType?.name === "Mobile" || selectedVentType?.name === "Laptop") {
                                            return (
                                                <>
                                                    <Form.Group className="mb-2">
                                                        <Form.Label>Storage</Form.Label>
                                                        <Form.Select
                                                            value={selectedStorage}
                                                            onChange={(e) => setSelectedStorage(e.target.value)}
                                                            disabled={!ventItemName}
                                                        >
                                                            <option value="">Select Storage</option>
                                                            {STORAGE_OPTIONS[selectedVentType.name]?.map(opt => (
                                                                <option key={opt} value={opt}>{opt}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-2">
                                                        <Form.Label>RAM</Form.Label>
                                                        <Form.Select
                                                            value={selectedRam}
                                                            onChange={(e) => setSelectedRam(e.target.value)}
                                                            disabled={!ventItemName}
                                                        >
                                                            <option value="">Select RAM</option>
                                                            {RAM_OPTIONS[selectedVentType.name]?.map(opt => (
                                                                <option key={opt} value={opt}>{opt}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                    {selectedVent && PROCESSOR_OPTIONS[selectedVent.name?.toLowerCase()] && (
                                                        <Form.Group className="mb-2">
                                                            <Form.Label>Processor</Form.Label>
                                                            <Form.Select
                                                                value={selectedProcessor}
                                                                onChange={(e) => setSelectedProcessor(e.target.value)}
                                                                disabled={!ventItemName}
                                                            >
                                                                <option value="">Select Processor</option>
                                                                {PROCESSOR_OPTIONS[selectedVent.name.toLowerCase()].map(opt => (
                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    )}
                                                </>
                                            );
                                        }

                                        if (selectedVentType?.name === "Smart Watches") {
                                            return (
                                                <Form.Group className="mb-2">
                                                    <Form.Label>Connectivity</Form.Label>
                                                    <Form.Select
                                                        value={selectedConnectivity}
                                                        onChange={(e) => setSelectedConnectivity(e.target.value)}
                                                        disabled={!ventItemName}
                                                    >
                                                        <option value="">Select Connectivity</option>
                                                        {CONNECTIVITY["Smart Watches"].map(opt => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            );
                                        }

                                        return null;
                                    })()}

                                    {/* <Form.Group className="mb-2">
                                        <Form.Label>Storage</Form.Label>
                                        <Form.Select
                                            value={selectedStorage}
                                            onChange={(e) => setSelectedStorage(e.target.value)}
                                            disabled={!ventItems.length}
                                        >
                                            <option value="">Select Storage</option>
                                            {ventItems.map(i => (
                                                <option key={i.ventItemId} value={i.storage}>
                                                    {i.storage}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group> */}
                                    {/* <Form.Group className="mb-2">
                                        <Form.Label>Vent Item Type</Form.Label>
                                        <Form.Select
                                            value={selectedVentItemTypeId}
                                            onChange={(e) => setSelectedVentItemTypeId(e.target.value)}
                                            disabled={!ventItemTypes.length}
                                        >
                                            <option value="">Select Vent Item Type</option>
                                            {ventItemTypes.map(t => (
                                                <option key={t.ventItemTypeId} value={t.ventItemTypeId}>{t.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group> */}
                                </Card.Body>
                            )}
                        </Card>
                        <Card className="mb-2">
                            <Card.Header
                                onClick={() => setShowBrandForm(!showBrandForm)}
                                style={{ cursor: 'pointer' }}
                            >
                                <strong>Brand</strong>
                            </Card.Header>
                            {showBrandForm && (
                                <Card.Body>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Choose Brand</Form.Label>
                                        <Form.Select onChange={(e) => handleBrandChange(e.target.value)}>
                                            <option value="">Select Brand</option>
                                            {brands.map((b) => (
                                                <option key={b.brandId} value={b.brandId}>{b.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Choose Brand Type</Form.Label>
                                        <Form.Select
                                            value={formData.brandItemId}
                                            onChange={(e) => setFormData({ ...formData, brandItemId: e.target.value })}
                                        >
                                            <option value="">-- Select Brand Item --</option>
                                            {brandItems.map((bi) => (
                                                <option key={bi.brandItemId} value={bi.brandItemId}>{bi.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Card.Body>
                            )}
                        </Card>
                        <div className="text-center mt-3">
                            <Button variant="success" onClick={handleSubmit}>{editItem ? 'Update' : 'Add'}</Button>{' '}
                            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
                        </div>
                    </Form>
                </Card>
            )}
        </Container>
    );
};

export default All;
