import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Warranty from '../components/Warranty';
import { Link, Outlet } from "react-router-dom";


function Front() {
  return (
    <div>
      <Header />
      <Container fluid style={{ paddingLeft: '32px', paddingRight: '32px' }}>
        <Outlet/>
      </Container>
      <Warranty/>
      <Footer />
    </div>
  );
}

export default Front;
