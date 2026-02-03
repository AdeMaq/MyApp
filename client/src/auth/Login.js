import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
// import dummyUsers from './dummyUsers';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5001/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else {
          localStorage.setItem("user", JSON.stringify({
            userId: data.id,  
            name: data.name,
            email: data.email
          }));

          dispatch(authActions.login({
            id: data.id,
            name: data.name,
            email: data.email,
            profilePic: data.profilePic
          }));
          navigate(data.email === 'admin@example.com' ? '/admin' : '/');
        }
      })
      .catch(err => {
        setError(err.message || err);
      });
  };



  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: '380px' }} className="p-4 shadow-sm rounded-4">
        <h3 className="text-center mb-4 text-success fw-bold">Login</h3>
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">Login</Button>
        </Form>
        <div className="text-center mt-3">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/signup" className="text-success fw-semibold text-decoration-none">Sign up</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
