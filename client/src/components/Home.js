import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';
import Header from './Header';
import SidebarCategory from './SidebarCategory';
import DownloadPrompt from './DownloadPrompt';
import Auction from './Auction';
import Popular from './Popular';
import Recent from './Recent';
import Footer from './Footer';
import Conditions from './Conditions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from './Filter';
import New from './New';
import Sale from './Sale';
import HeaderBanner from './HeaderBanner';
import Warranty from './Warranty';


function Home() {
  return (
    <div>
      <Header />
      <Container fluid style={{ paddingLeft: '32px', paddingRight: '32px' }}>
        <Row className="mainContent g-0  m-0" style={{paddingBottom:'16px',paddingTop:'2px'}}>
          <Col md={2} className="leftSidebar p-0 m-0">
            <SidebarCategory />
          </Col>
          <Col md={10} className="rightContent m-0" style={{ paddingLeft: '16px' }} >
            <HeaderBanner />
          </Col>
        </Row>
        <DownloadPrompt />
        <Auction />
        <Popular />
        <Recent />
        <New />
        <Filter />
        <Sale />
      </Container>
      <Conditions />
      <Warranty/>
      <Footer />
    </div>
  );
}

export default Home;
