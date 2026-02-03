import { Link, Outlet } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Side from './Side';


function Dashboard() {
    return (
        <div className="d-flex">
            <Side />
            <div style={{ flexGrow: 1 }}>
                <Outlet/>
            </div>
        </div>

    );
}



export default Dashboard;