import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, ListGroup, InputGroup } from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:5001/brand";

const ManageBrand = () => {
    const [brands, setBrands] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [brandIcon, setBrandIcon] = useState("");

    const [brandItemName, setBrandItemName] = useState("");
    const [brandItemPic, setBrandItemPic] = useState("");
    const [selectedBrandId, setSelectedBrandId] = useState(null);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await axios.get(API_URL);
            setBrands(res.data);
        } catch (err) {
            console.error("Error fetching brands:", err);
        }
    };

    const handleFileToBase64 = (file, setState) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setState(reader.result); 
        };
        reader.readAsDataURL(file);
    };

    const handleBrandIconChange = (e) => {
        handleFileToBase64(e.target.files[0], setBrandIcon);
    };

    const handleBrandItemPicChange = (e) => {
        handleFileToBase64(e.target.files[0], setBrandItemPic);
    };

    const handleAddBrand = async (e) => {
        e.preventDefault();
        if (!brandName.trim()) return;

        try {
            const res = await axios.post(API_URL, { name: brandName, icon: brandIcon });
            setBrands([...brands, res.data]);
            setBrandName("");
            setBrandIcon("");
        } catch (err) {
            console.error("Error adding brand:", err);
        }
    };

    const handleDeleteBrand = async (brandId) => {
        try {
            await axios.delete(`${API_URL}/${brandId}`);
            setBrands(brands.filter((b) => b.brandId !== brandId));
        } catch (err) {
            console.error("Error deleting brand:", err);
        }
    };

    const handleAddBrandItem = async (e) => {
        e.preventDefault();
        if (!brandItemName.trim() || !selectedBrandId) return;

        try {
            const res = await axios.post(`${API_URL}/${selectedBrandId}/items`, {
                name: brandItemName,
                pic: brandItemPic,
            });
            setBrands(
                brands.map((b) =>
                    b.brandId === selectedBrandId
                        ? { ...b, brandItems: [...(b.brandItems || []), res.data] }
                        : b
                )
            );
            setBrandItemName("");
            setBrandItemPic("");
        } catch (err) {
            console.error("Error adding brand item:", err);
        }
    };

    const handleDeleteBrandItem = async (brandId, brandItemId) => {
        try {
            await axios.delete(`${API_URL}/${brandId}/items/${brandItemId}`);
            setBrands(
                brands.map((b) =>
                    b.brandId === brandId
                        ? { ...b, brandItems: b.brandItems.filter((item) => item.brandItemId !== brandItemId) }
                        : b
                )
            );
        } catch (err) {
            console.error("Error deleting brand item:", err);
        }
    };

    return (
        <Container className="my-4">
            <Row>
                <Col md={4}>
                    <Card className="p-3 shadow-sm">
                        <h5>Add New Brand</h5>
                        <Form onSubmit={handleAddBrand}>
                            <Form.Group className="mb-2">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    placeholder="Enter brand name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Brand Icon</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBrandIconChange}
                                />
                                {brandIcon && (
                                    <img
                                        src={brandIcon}
                                        alt="Preview"
                                        style={{ height: "40px", marginTop: "5px" }}
                                    />
                                )}
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100">
                                Add Brand
                            </Button>
                        </Form>
                    </Card>
                </Col>

                <Col md={8}>
                    <h4 className="mb-3">Manage Brands & Items</h4>
                    {brands.map((brand) => (
                        <Card key={brand.brandId} className="mb-3 shadow-sm">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h5>
                                            {brand.name}{" "}
                                            <Button
                                                size="sm"
                                                variant="outline-danger"
                                                onClick={() => handleDeleteBrand(brand.brandId)}
                                            >
                                                Delete
                                            </Button>
                                        </h5>
                                        {brand.icon && (
                                            <img src={brand.icon} alt={brand.name} style={{ height: "40px" }} />
                                        )}
                                    </Col>
                                </Row>

                                <hr />

                                <h6>Brand Items</h6>
                                <ListGroup className="mb-2">
                                    {(brand.brandItems || []).map((item) => (
                                        <ListGroup.Item key={item.brandItemId} className="d-flex justify-content-between">
                                            <span>
                                                {item.name} {item.pic && <img src={item.pic} alt="" style={{ height: "30px" }} />}
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="outline-danger"
                                                onClick={() => handleDeleteBrandItem(brand.brandId, item.brandItemId)}
                                            >
                                                Delete
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                {selectedBrandId === brand.brandId ? (
                                    <Form onSubmit={handleAddBrandItem}>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                                placeholder="Brand item name"
                                                value={brandItemName}
                                                onChange={(e) => setBrandItemName(e.target.value)}
                                            />
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={handleBrandItemPicChange}
                                            />
                                            <Button type="submit" variant="success">
                                                +
                                            </Button>
                                        </InputGroup>
                                        {brandItemPic && (
                                            <img
                                                src={brandItemPic}
                                                alt="Preview"
                                                style={{ height: "30px", marginTop: "5px" }}
                                            />
                                        )}
                                    </Form>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant="outline-primary"
                                        onClick={() => setSelectedBrandId(brand.brandId)}
                                    >
                                        + Add Item
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default ManageBrand;