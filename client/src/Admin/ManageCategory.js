import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, ListGroup, InputGroup, Dropdown } from "react-bootstrap";
import axios from "axios";
import categori from '../data/categori';
const API_URL = "http://localhost:5001/categories";

const ManageCategory = () => {
    const [categoryTypes, setCategoryTypes] = useState([]);
    const [typeName, setTypeName] = useState("");
    const [typePic, setTypePic] = useState("");

    const [categoryName, setCategoryName] = useState("");
    const [selectedTypeId, setSelectedTypeId] = useState(null);

    const [itemName, setItemName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        fetchHierarchy();
    }, []);

    const fetchHierarchy = async () => {
        try {
            const res = await axios.get(API_URL);
            setCategoryTypes(res.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const uploadCategories = async () => {
        try {
            for (const type of categori) {
                const typeRes = await fetch(`${API_URL}/type`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: type.name, pic: type.pic, })
                });
                const createdType = await typeRes.json();

                if (type.subcategories) {
                    for (const cat of type.subcategories) {
                        const catRes = await fetch(`${API_URL}/category`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: cat.name,
                                categoryTypeId: createdType.categoryTypeId
                            })
                        });
                        const createdCat = await catRes.json();

                        if (cat.subSubcategories) {
                            for (const item of cat.subSubcategories) {
                                await fetch(`${API_URL}/item`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        name: item.name || item,
                                        categoryId: createdCat.categoryId
                                    })
                                });
                            }
                        }
                    }
                }
            }
            alert("Categories uploaded successfully!");
        } catch (err) {
            console.error("Error uploading categories:", err);
            alert("Error uploading categories. Check console.");
        }
    };

    // === CLEAR ALL CATEGORIES ===
    const clearAllCategories = async () => {
        if (!window.confirm("⚠️ This will delete ALL category types, categories, and items. Continue?")) return;

        try {
            const res = await fetch(`${API_URL}/clear`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to clear categories");

            alert("✅ All categories cleared!");
            setCategoryTypes([]);   // remove everything from UI
            setTypeName("");
            setTypePic("");
            setCategoryName("");
            setItemName("");
            setSelectedTypeId(null);
            setSelectedCategoryId(null);
        } catch (err) {
            console.error("Error clearing categories:", err);
            alert("❌ Error clearing categories. Check console.");
        }
    };


    // Utility to convert file → base64
    const handleFileToBase64 = (file, setState) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setState(reader.result);
        reader.readAsDataURL(file);
    };

    // === CREATE ===
    const handleAddType = async (e) => {
        e.preventDefault();
        if (!typeName.trim()) return;
        try {
            const res = await axios.post(`${API_URL}/type`, { name: typeName, pic: typePic });
            setCategoryTypes([...categoryTypes, res.data]);
            setTypeName("");
            setTypePic("");
        } catch (err) {
            console.error("Error adding category type:", err);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!categoryName.trim() || !selectedTypeId) return;
        try {
            const res = await axios.post(`${API_URL}/category`, { name: categoryName, categoryTypeId: selectedTypeId });
            setCategoryTypes(
                categoryTypes.map((ct) =>
                    ct.categoryTypeId === selectedTypeId
                        ? { ...ct, categories: [...(ct.categories || []), res.data] }
                        : ct
                )
            );
            setCategoryName("");
            setSelectedTypeId(null);
        } catch (err) {
            console.error("Error adding category:", err);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!itemName.trim() || !selectedCategoryId) return;
        try {
            const res = await axios.post(`${API_URL}/item`, { name: itemName, categoryId: selectedCategoryId });
            setCategoryTypes(
                categoryTypes.map((ct) => ({
                    ...ct,
                    categories: ct.categories.map((c) =>
                        c.categoryId === selectedCategoryId
                            ? { ...c, categoryItems: [...(c.categoryItems || []), res.data] }
                            : c
                    ),
                }))
            );
            setItemName("");
            setSelectedCategoryId(null);
        } catch (err) {
            console.error("Error adding item:", err);
        }
    };

    // === DELETE ===
    const handleDeleteType = async (typeId) => {
        try {
            await axios.delete(`${API_URL}/type/${typeId}`);
            setCategoryTypes(categoryTypes.filter((ct) => ct.categoryTypeId !== typeId));
        } catch (err) {
            console.error("Error deleting category type:", err);
        }
    };

    const handleDeleteCategory = async (typeId, categoryId) => {
        try {
            await axios.delete(`${API_URL}/category/${categoryId}`);
            setCategoryTypes(
                categoryTypes.map((ct) =>
                    ct.categoryTypeId === typeId
                        ? { ...ct, categories: ct.categories.filter((c) => c.categoryId !== categoryId) }
                        : ct
                )
            );
        } catch (err) {
            console.error("Error deleting category:", err);
        }
    };

    const handleDeleteItem = async (typeId, categoryId, itemId) => {
        try {
            await axios.delete(`${API_URL}/item/${itemId}`);
            setCategoryTypes(
                categoryTypes.map((ct) => ({
                    ...ct,
                    categories: ct.categories.map((c) =>
                        c.categoryId === categoryId
                            ? { ...c, categoryItems: c.categoryItems.filter((i) => i.categoryItemId !== itemId) }
                            : c
                    ),
                }))
            );
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    return (
        <>
            <Row>
                <Col md={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="manage-category-dropdown">
                            Category Dropdown
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={uploadCategories}>Upload Categories</Dropdown.Item>
                            <Dropdown.Item onClick={clearAllCategories}>Clear All Categories</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Container className="my-4">
                <Row>
                    {/* LEFT SIDE – Add CategoryType */}
                    <Col md={4}>
                        <Card className="p-3 shadow-sm">
                            <h5>Add New Category Type</h5>
                            <Form onSubmit={handleAddType}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Type Name</Form.Label>
                                    <Form.Control
                                        value={typeName}
                                        onChange={(e) => setTypeName(e.target.value)}
                                        placeholder="Enter category type name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Type Pic</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileToBase64(e.target.files[0], setTypePic)}
                                    />
                                    {typePic && <img src={typePic} alt="Preview" style={{ height: "40px", marginTop: "5px" }} />}
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100">
                                    Add Category Type
                                </Button>
                            </Form>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <h4 className="mb-3">Manage Categories</h4>
                        {categoryTypes.map((ct) => (
                            <Card key={ct.categoryTypeId} className="mb-3 shadow-sm">
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <h5>
                                                {ct.name}{" "}
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    onClick={() => handleDeleteType(ct.categoryTypeId)}
                                                >
                                                    Delete
                                                </Button>
                                            </h5>
                                            {ct.pic && <img src={ct.pic} alt={ct.name} style={{ height: "40px" }} />}
                                        </Col>
                                    </Row>

                                    <hr />

                                    {/* Categories under this type */}
                                    <h6>Categories</h6>
                                    <ListGroup className="mb-2">
                                        {(ct.categories || []).map((c) => (
                                            <ListGroup.Item key={c.categoryId}>
                                                <div className="d-flex justify-content-between">
                                                    <strong>{c.name}</strong>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-danger"
                                                        onClick={() => handleDeleteCategory(ct.categoryTypeId, c.categoryId)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>

                                                {/* Items inside this category */}
                                                <ListGroup className="mt-2">
                                                    {(c.categoryItems || []).map((i) => (
                                                        <ListGroup.Item key={i.categoryItemId} className="d-flex justify-content-between">
                                                            {i.name}
                                                            <Button
                                                                size="sm"
                                                                variant="outline-danger"
                                                                onClick={() => handleDeleteItem(ct.categoryTypeId, c.categoryId, i.categoryItemId)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>

                                                {selectedCategoryId === c.categoryId ? (
                                                    <Form onSubmit={handleAddItem} className="mt-2">
                                                        <InputGroup>
                                                            <Form.Control
                                                                placeholder="Item name"
                                                                value={itemName}
                                                                onChange={(e) => setItemName(e.target.value)}
                                                            />
                                                            <Button type="submit" variant="success">
                                                                +
                                                            </Button>
                                                        </InputGroup>
                                                    </Form>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        variant="outline-primary"
                                                        className="mt-2"
                                                        onClick={() => setSelectedCategoryId(c.categoryId)}
                                                    >
                                                        + Add Item
                                                    </Button>
                                                )}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>

                                    {selectedTypeId === ct.categoryTypeId ? (
                                        <Form onSubmit={handleAddCategory}>
                                            <InputGroup className="mb-2">
                                                <Form.Control
                                                    placeholder="Category name"
                                                    value={categoryName}
                                                    onChange={(e) => setCategoryName(e.target.value)}
                                                />
                                                <Button type="submit" variant="success">
                                                    +
                                                </Button>
                                            </InputGroup>
                                        </Form>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="outline-primary"
                                            onClick={() => setSelectedTypeId(ct.categoryTypeId)}
                                        >
                                            + Add Category
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ManageCategory;
