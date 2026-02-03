import { Link } from "react-router-dom";
import Side from './Side';
import All from './All';

const Main = () => {
    <div className="d-flex">
        <Side/> 
        <div style={{ flexGrow: 1 }}>
            <All/>
        </div>     
    </div>
};



export default Main;