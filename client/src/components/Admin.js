// import { useState } from 'react';
// import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
// import { useNavigate, Link } from 'react-router-dom';
// import { useFormik } from 'formik';
// import basicSchema from '../schemas/basicSchema';

// const Signup = () => {
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       profilePic: '',
//     },
//     validationSchema: basicSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await fetch('http://localhost:5000/api/auth/signup', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(values),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           setError(data.error || 'Signup failed');
//           setSuccess(false);
//         } else {
//           setError('');
//           setSuccess(true);
//           setTimeout(() => navigate('/login'), 1500);
//         }
//       } catch (err) {
//         setError('Server error');
//         setSuccess(false);
//       }
//     },
//   });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         formik.setFieldValue('profilePic', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <Card style={{ width: '380px' }} className="p-4 shadow-sm rounded-4">
//         <h3 className="text-center mb-4 text-success fw-bold">Sign Up</h3>

//         {error && <Alert variant="danger" className="text-center">{error}</Alert>}
//         {success && <Alert variant="success" className="text-center">Signup successful! Redirecting...</Alert>}

//         <Form onSubmit={formik.handleSubmit} noValidate>
//           <Form.Group className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               isInvalid={formik.touched.name && !!formik.errors.name}
//             />
//             <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               isInvalid={formik.touched.email && !!formik.errors.email}
//             />
//             <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               isInvalid={formik.touched.password && !!formik.errors.password}
//             />
//             <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm your Password"
//               value={formik.values.confirmPassword}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
//             />
//             <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-4">
//             <Form.Label>Profile Picture</Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </Form.Group>

//           <Button variant="success" type="submit" className="w-100">Create Account</Button>
//         </Form>

//         <div className="text-center mt-3">
//           <span className="text-muted">Already have an account? </span>
//           <Link to="/login" className="text-success fw-semibold text-decoration-none">Login</Link>
//         </div>
//       </Card>
//     </Container>
//   );
// };

// export default Signup;
