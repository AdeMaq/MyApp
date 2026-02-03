import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Container, Row, Col, Image } from "react-bootstrap";
import { favouriteActions } from "../store/favourite-slice";
import item from "../asserts/no-item.svg";

const Favourite = () => {
    const dispatch = useDispatch();
    const { AuthenticatedUserId } = useSelector((state) => state.auth);
    const [items, setItems] = useState([]);

    // Fetch favourites from server
    useEffect(() => {
        const fetchFavourites = async () => {
            if (!AuthenticatedUserId) return;
            try {
                const res = await fetch(`http://localhost:5001/favourites/${AuthenticatedUserId}`);
                if (!res.ok) throw new Error("Failed to fetch favourites");
                const data = await res.json();
                setItems(data);
                dispatch(favouriteActions.setFavourites(data));
            } catch (err) {
                console.error("Error fetching favourites:", err);
            }
        };

        dispatch(favouriteActions.setFavourites([])); // clear old data
        fetchFavourites();
    }, [AuthenticatedUserId, dispatch]);

    const removeFavourite = async (favouriteId) => {
        try {
            const res = await fetch(`http://localhost:5001/favourites/${favouriteId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to remove favourite");

            setItems((prev) => prev.filter((it) => it.favouriteId !== favouriteId));
            dispatch(favouriteActions.removeFavourite(favouriteId));
        } catch (err) {
            console.error("Error removing favourite:", err);
        }
    };

    return (
        <Container className="flex flex-wrap my-5">
            <h2 className="fw-bold mb-4">My Wishlist</h2>

            {items.length === 0 ? (
                <div className="mt-4 text-center mb-4">
                    <Image
                        src={item}
                        alt="no-item"
                        className="mb-2 p-0"
                        style={{ width: "104px", height: "104px", margin: "5px" }}
                    />
                    <p className="m-0 fw-bold" style={{ fontSize: 18 }}>
                        No item found in your wishlist.
                    </p>
                    <p className="m-0" style={{ fontSize: 14 }}>
                        Continue shopping and add items in your Wishlist.
                    </p>
                </div>
            ) : (
                items.map((it) => (
                    <Card key={it.favouriteId} className="mb-3 p-3 shadow-sm">
                        <Row className="align-items-center">
                            <Col xs={12} md={2}>
                                <Image src={it.image} alt={it.title} fluid />
                            </Col>
                            <Col xs={12} md={6}>
                                <h5 className="fw-bold">{it.title}</h5>
                                <p className="text-muted">{it.condition}</p>
                            </Col>
                            <Col xs={12} md={2}>
                                <h6 className="fw-bold text-success">PKR {it.price}</h6>
                            </Col>
                            <Col xs={12} md={2} className="text-end">
                                <Button
                                    variant="danger"
                                    onClick={() => removeFavourite(it.favouriteId)}
                                >
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default Favourite;
