import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup, InputGroup, Dropdown } from "react-bootstrap";
import axios from "axios";
import navData from '../data/navData';

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

  const uploadVents = async () => {
    try {
      for (const type of navData) {
        const typeRes = await fetch(`${API_URL}/type`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: type.name })
        });
        const createdType = await typeRes.json();

        if (type.subcategories) {
          for (const vent of type.subcategories) {
            const ventRes = await fetch(`${API_URL}/vent`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: vent.name,
                ventTypeId: createdType.ventTypeId
              })
            });
            const createdVent = await ventRes.json();

            if (vent.subSubcategories) {
              for (const item of vent.subSubcategories) {
                const itemRes = await fetch(`${API_URL}/item`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: item.name || item,
                    ventId: createdVent.ventId
                  })
                });
                const createdItem = await itemRes.json();

                if (item.subSubSubcategories) {
                  for (const typeItem of item.subSubSubcategories) {
                    await fetch(`${API_URL}/itemtype`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: typeItem,
                        ventItemId: createdItem.ventItemId
                      })
                    });
                  }
                }
              }
            }
          }
        }
      }
      alert("Vents uploaded successfully!");
    } catch (err) {
      console.error("Error uploading vents:", err);
      alert("Error uploading vents. Check console.");
    }
  };
  const clearAllVents = async () => {
    if (!window.confirm("⚠️ This will delete ALL vent types, vents, items, and item types. Continue?")) return;

    try {
      const res = await fetch(`${API_URL}/clear`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to clear vents");
      alert("All vents cleared!");
      setVentTypes([]);
      setSelectedVentTypeId(null);
      setSelectedVentId(null);
      setSelectedVentItemId(null);
      setVentTypeName("");
      setVentName("");
      setVentItemName("");
      setVentItemStorage("");
      setVentItemTypeName("");
    } catch (err) {
      console.error("Error clearing vents:", err);
      alert("Error clearing vents. Check console.");
    }
  };

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

  // ---- Update storage inline ----
  const handleSaveEditedStorage = async (ventItemId) => {
    try {
      await axios.put(`${API_URL}/item/${ventItemId}`, { storage: editingStorageValue });
    } catch (err) {
      console.warn("Could not persist edited storage to server:", err?.message || err);
    }

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

  // ---- Delete handlers (every level) ----
  const handleDeleteVentType = async (ventTypeId) => {
    try {
      await axios.delete(`${API_URL}/type/${ventTypeId}`);
      setVentTypes((prev) => prev.filter((vt) => vt.ventTypeId !== ventTypeId));
    } catch (err) {
      console.error("Error deleting vent type:", err);
    }
  };

  const handleDeleteVent = async (ventId) => {
    try {
      await axios.delete(`${API_URL}/vent/${ventId}`);
      setVentTypes((prev) =>
        prev.map((vt) => ({
          ...vt,
          vents: (vt.vents || []).filter((v) => v.ventId !== ventId),
        }))
      );
    } catch (err) {
      console.error("Error deleting vent:", err);
    }
  };

  const handleDeleteVentItem = async (ventItemId) => {
    try {
      await axios.delete(`${API_URL}/item/${ventItemId}`);
      setVentTypes((prev) =>
        prev.map((vt) => ({
          ...vt,
          vents: (vt.vents || []).map((v) => ({
            ...v,
            ventItems: (v.ventItems || []).filter((vi) => vi.ventItemId !== ventItemId),
          })),
        }))
      );
    } catch (err) {
      console.error("Error deleting vent item:", err);
    }
  };

  const handleDeleteVentItemType = async (ventItemTypeId) => {
    try {
      await axios.delete(`${API_URL}/itemtype/${ventItemTypeId}`);
      setVentTypes((prev) =>
        prev.map((vt) => ({
          ...vt,
          vents: (vt.vents || []).map((v) => ({
            ...v,
            ventItems: (v.ventItems || []).map((vi) => ({
              ...vi,
              ventItemTypes: (vi.ventItemTypes || []).filter(
                (vit) => vit.ventItemTypeId !== ventItemTypeId
              ),
            })),
          })),
        }))
      );
    } catch (err) {
      console.error("Error deleting vent item type:", err);
    }
  };

  return (
    <>
      <Row>
        <Col md={2}>
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="manage-vent-dropdown">
              Vents Works
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={uploadVents}>Upload Vents</Dropdown.Item>
              <Dropdown.Item onClick={clearAllVents}>Clear Vents</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
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
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{vt.name}</h5>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDeleteVentType(vt.ventTypeId)}
                    >
                      Delete Type
                    </Button>
                  </div>

                  <hr />
                  <h6>Vents</h6>
                  <ListGroup>
                    {(vt.vents || []).map((v) => (
                      <ListGroup.Item key={v.ventId}>
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>{v.name}</strong>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDeleteVent(v.ventId)}
                          >
                            Delete Vent
                          </Button>
                        </div>

                        <div className="ms-3">
                          <h6 className="mt-2">Vent Items</h6>
                          <ListGroup>
                            {(v.ventItems || []).map((vi) => (
                              <ListGroup.Item key={vi.ventItemId}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <strong>{vi.name}</strong>
                                    <div className="text-muted small">
                                      Storage: {vi.storage || "(not set)"}
                                    </div>
                                  </div>

                                  <div className="d-flex gap-2">
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
                                      <>
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
                                        <Button
                                          size="sm"
                                          variant="outline-danger"
                                          onClick={() => handleDeleteVentItem(vi.ventItemId)}
                                        >
                                          Delete Item
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="ms-3 mt-2">
                                  <h6>Vent Item Types</h6>
                                  <ListGroup>
                                    {(vi.ventItemTypes || []).map((vit) => (
                                      <ListGroup.Item key={vit.ventItemTypeId}>
                                        <div className="d-flex justify-content-between align-items-center">
                                          {vit.name}
                                          <Button
                                            size="sm"
                                            variant="outline-danger"
                                            onClick={() =>
                                              handleDeleteVentItemType(vit.ventItemTypeId)
                                            }
                                          >
                                            Delete Type
                                          </Button>
                                        </div>
                                      </ListGroup.Item>
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
    </>
  );
};

export default ManageVent;
