const { EntitySchema } = require("typeorm");
module.exports = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    productId: {
      primary: true,
      type: "int",
      generated: true
    },
  },
  relations: {
    categoryType:
    {
      target: "CategoryType",
      type: "many-to-one",
      joinColumn: { name: "categoryTypeId" },
      nullable: true,
      onDelete: "SET NULL",
      eager: true,
    },
    category:
    {
      target: "Category",
      type: "many-to-one",
      joinColumn: { name: "categoryId" },
      nullable: true,
      onDelete: "SET NULL",
      eager: true,
    },
    categoryItem:
    {
      target: "CategoryItem",
      type: "many-to-one",
      joinColumn: { name: "categoryItemId" },
      nullable: true,
      onDelete: "SET NULL",
      eager: true,
    },
  }
});

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "CategoryType",
  tableName: "category_types",
  columns: {
    categoryTypeId:
    {
      primary: true,
      type: "int",
      generated: true
    },
    name:
    {
      type: "varchar",
      length: 100,
      nullable: false
    },
  },
  relations:
  {
    categories:
    {
      target: "Category",
      type: "one-to-many",
      inverseSide: "categoryType",
      cascade: true,
      onDelete: "CASCADE",
    },
    products:
    {
      target: "Product",
      type: "one-to-many",
      inverseSide: "categoryType",
      onDelete: "SET NULL",
    },
  },
});
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "CategoryType",
  tableName: "category_types",
  columns: {
    categoryTypeId:
    {
      primary: true,
      type: "int",
      generated: true
    },
    name:
    {
      type: "varchar",
      length: 100,
      nullable: false
    },
    pic: {
      type: "varchar",
      length: 255,
      nullable: true
    }
  },
  relations:
  {
    categories:
    {
      target: "Category",
      type: "one-to-many",
      inverseSide: "categoryType",
      cascade: true,
      onDelete: "CASCADE",
    },
    products:
    {
      target: "Product",
      type: "one-to-many",
      inverseSide: "categoryType",
      onDelete: "SET NULL",
    },
  },
});

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "CategoryItem",
  tableName: "category_items",
  columns: {
    categoryItemId:
    {
      primary: true,
      type: "int",
      generated: true
    },
    name:
    {
      type: "varchar",
      length: 100,
      nullable: false
    },
  },
  relations:
  {
    category:
    {
      target: "Category",
      type: "many-to-one",
      joinColumn: { name: "categoryId" },
      onDelete: "CASCADE",
    },
    products:
    {
      target: "Product",
      type: "one-to-many",
      inverseSide: "categoryItem",
      onDelete: "SET NULL",
    },
  },
});
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.get("/", categoryController.getAllHierarchy);
router.post("/type", categoryController.createCategoryType);
router.post("/category", categoryController.createCategory);
router.post("/item", categoryController.createCategoryItem);

module.exports = router;

const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

const { AppDataSource } = require("../data-source");

const CategoryTypeRepo = AppDataSource.getRepository("CategoryType");

class CategoryService {
    async getAllHierarchy() {
        return await CategoryTypeRepo.find({
            relations: [
                "categories",
                "categories.categoryItems"
            ],
            order: { categoryTypeId: "ASC" }
        });
    }

    async createCategoryType(data) {
        const ct = CategoryTypeRepo.create(data);
        return await CategoryTypeRepo.save(ct);
    }
}

module.exports = new CategoryService();
const categoryService = require("../services/CategoryService");

exports.getAllHierarchy = async (req, res) => {
    try {
        const categories = await categoryService.getAllHierarchy();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCategoryType = async (req, res) => {
    try {
        const ct = await categoryService.createCategoryType(req.body);
        res.json(ct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup, InputGroup } from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:5001/vent";

const ManageVent = () => {
  const [ventTypes, setVentTypes] = useState([]);
  const [ventTypeName, setVentTypeName] = useState("");

  const [ventName, setVentName] = useState("");
  const [selectedVentTypeId, setSelectedVentTypeId] = useState(null);

  const [ventItemName, setVentItemName] = useState("");
  const [ventItemStorage, setVentItemStorage] = useState("");
  const [selectedVentId, setSelectedVentId] = useState(null);

  const [ventItemTypeName, setVentItemTypeName] = useState("");
  const [selectedVentItemId, setSelectedVentItemId] = useState(null);

  // For inline editing of storage
  const [editingStorageFor, setEditingStorageFor] = useState(null);
  const [editingStorageValue, setEditingStorageValue] = useState("");

  useEffect(() => {
    fetchVentHierarchy();
  }, []);

  const fetchVentHierarchy = async () => {
    try {
      const res = await axios.get(API_URL);
      setVentTypes(res.data || []);
    } catch (err) {
      console.error("Error fetching vent hierarchy:", err);
    }
  };

  // ---- Add handlers ----
  const handleAddVentType = async (e) => {
    e.preventDefault();
    if (!ventTypeName.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/type`, { name: ventTypeName });
      setVentTypes((prev) => [...prev, res.data]);
      setVentTypeName("");
    } catch (err) {
      console.error("Error adding vent type:", err);
    }
  };

  const handleAddVent = async (ventTypeId) => {
    if (!ventName.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/vent`, {
        name: ventName,
        ventTypeId,
      });
      setVentTypes((prev) =>
        prev.map((vt) =>
          vt.ventTypeId === ventTypeId
            ? { ...vt, vents: [...(vt.vents || []), res.data] }
            : vt
        )
      );
      setVentName("");
      setSelectedVentTypeId(null);
    } catch (err) {
      console.error("Error adding vent:", err);
    }
  };

  const handleAddVentItem = async (ventId) => {
    if (!ventItemName.trim() || !ventItemStorage.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/item`, {
        name: ventItemName,
        storage: ventItemStorage,
        ventId,
      });

      setVentTypes((prev) =>
        prev.map((vt) => ({
          ...vt,
          vents: (vt.vents || []).map((v) =>
            v.ventId === ventId
              ? { ...v, ventItems: [...(v.ventItems || []), res.data] }
              : v
          ),
        }))
      );

      setVentItemName("");
      setVentItemStorage("");
      setSelectedVentId(null);
    } catch (err) {
      console.error("Error adding vent item:", err);
    }
  };

  const handleAddVentItemType = async (ventItemId) => {
    if (!ventItemTypeName.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/itemtype`, {
        name: ventItemTypeName,
        ventItemId,
      });
      setVentTypes((prev) =>
        prev.map((vt) => ({
          ...vt,
          vents: (vt.vents || []).map((v) => ({
            ...v,
            ventItems: (v.ventItems || []).map((vi) =>
              vi.ventItemId === ventItemId
                ? { ...vi, ventItemTypes: [...(vi.ventItemTypes || []), res.data] }
                : vi
            ),
          })),
        }))
      );
      setVentItemTypeName("");
      setSelectedVentItemId(null);
    } catch (err) {
      console.error("Error adding vent item type:", err);
    }
  };

  // Inline edit storage. NOTE: backend needs an endpoint to update a vent item (PUT /vent/item/:id)
  const handleSaveEditedStorage = async (ventItemId) => {
    try {
      // Attempt to persist to server (if route exists). If your server doesn't have this route yet,
      // the UI state will still update locally below.
      await axios.put(`${API_URL}/item/${ventItemId}`, { storage: editingStorageValue });
    } catch (err) {
      // If update fails because endpoint doesn't exist, we'll still update UI locally and log the error.
      console.warn("Could not persist edited storage to server (endpoint may be missing):", err.message || err);
    }

    // Update local state so user sees change immediately
    setVentTypes((prev) =>
      prev.map((vt) => ({
        ...vt,
        vents: (vt.vents || []).map((v) => ({
          ...v,
          ventItems: (v.ventItems || []).map((vi) =>
            vi.ventItemId === ventItemId ? { ...vi, storage: editingStorageValue } : vi
          ),
        })),
      }))
    );

    setEditingStorageFor(null);
    setEditingStorageValue("");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Add Vent Type</h5>
            <Form onSubmit={handleAddVentType}>
              <InputGroup className="mb-2">
                <Form.Control
                  value={ventTypeName}
                  onChange={(e) => setVentTypeName(e.target.value)}
                  placeholder="Vent type name"
                />
                <Button type="submit" variant="primary">
                  +
                </Button>
              </InputGroup>
            </Form>
          </Card>
        </Col>

        <Col md={8}>
          <h4 className="mb-3">Manage Vents Hierarchy</h4>

          {ventTypes.map((vt) => (
            <Card key={vt.ventTypeId} className="mb-3 shadow-sm">
              <Card.Body>
                <h5>{vt.name}</h5>
                <hr />
                <h6>Vents</h6>
                <ListGroup>
                  {(vt.vents || []).map((v) => (
                    <ListGroup.Item key={v.ventId}>
                      <strong>{v.name}</strong>
                      <div className="ms-3">
                        <h6>Vent Items</h6>
                        <ListGroup>
                          {(v.ventItems || []).map((vi) => (
                            <ListGroup.Item key={vi.ventItemId}>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <strong>{vi.name}</strong>
                                  <div className="text-muted small">Storage: {vi.storage || "(not set)"}</div>
                                </div>

                                <div>
                                  {editingStorageFor === vi.ventItemId ? (
                                    <InputGroup style={{ minWidth: 220 }}>
                                      <Form.Control
                                        value={editingStorageValue}
                                        onChange={(e) => setEditingStorageValue(e.target.value)}
                                        placeholder="Storage value"
                                      />
                                      <Button
                                        variant="success"
                                        onClick={() => handleSaveEditedStorage(vi.ventItemId)}
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        variant="outline-secondary"
                                        onClick={() => {
                                          setEditingStorageFor(null);
                                          setEditingStorageValue("");
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </InputGroup>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline-primary"
                                      onClick={() => {
                                        setEditingStorageFor(vi.ventItemId);
                                        setEditingStorageValue(vi.storage || "");
                                      }}
                                    >
                                      Edit Storage
                                    </Button>
                                  )}
                                </div>
                              </div>

                              <div className="ms-3 mt-2">
                                <h6>Vent Item Types</h6>
                                <ListGroup>
                                  {(vi.ventItemTypes || []).map((vit) => (
                                    <ListGroup.Item key={vit.ventItemTypeId}>{vit.name}</ListGroup.Item>
                                  ))}
                                </ListGroup>

                                {selectedVentItemId === vi.ventItemId ? (
                                  <Form
                                    className="mt-2"
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      handleAddVentItemType(vi.ventItemId);
                                    }}
                                  >
                                    <InputGroup>
                                      <Form.Control
                                        placeholder="Item type name"
                                        value={ventItemTypeName}
                                        onChange={(e) => setVentItemTypeName(e.target.value)}
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
                                    onClick={() => setSelectedVentItemId(vi.ventItemId)}
                                    className="mt-2"
                                  >
                                    + Add Item Type
                                  </Button>
                                )}
                              </div>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>

                        {selectedVentId === v.ventId ? (
                          <Form
                            className="mt-2"
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleAddVentItem(v.ventId);
                            }}
                          >
                            <InputGroup>
                              <Form.Control
                                placeholder="Vent item name"
                                value={ventItemName}
                                onChange={(e) => setVentItemName(e.target.value)}
                              />
                              <Form.Control
                                placeholder="Storage (e.g. 64GB / 256GB / 1TB)"
                                value={ventItemStorage}
                                onChange={(e) => setVentItemStorage(e.target.value)}
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
                            onClick={() => setSelectedVentId(v.ventId)}
                            className="mt-2"
                          >
                            + Add Vent Item
                          </Button>
                        )}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                {selectedVentTypeId === vt.ventTypeId ? (
                  <Form
                    className="mt-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddVent(vt.ventTypeId);
                    }}
                  >
                    <InputGroup>
                      <Form.Control
                        placeholder="Vent name"
                        value={ventName}
                        onChange={(e) => setVentName(e.target.value)}
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
                    onClick={() => setSelectedVentTypeId(vt.ventTypeId)}
                    className="mt-2"
                  >
                    + Add Vent
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

export default ManageVent;

