import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Grid, Settings, Tag, BarChart2,Home } from 'react-feather';
import logo from '../asserts/logo.svg';

const Side = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(prev => !prev);

    const SidebarLink = ({ to, icon, text, gradient }) => (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <Button className="d-flex align-items-center border-0 text-white" style={{
                background: `linear-gradient(135deg, ${gradient})`,
                width: '100%',
                justifyContent: collapsed ? 'center' : 'flex-start',
                fontSize: '15px'
            }}>
                {icon}
                {!collapsed && <span className="ms-2">{text}</span>}
            </Button>
        </Link>
    );

    return (
        <div style={{
            top: 0,
            left: 0,
            height: '100vh',
            width: collapsed ? '60px' : '200px',
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #ddd',
            padding: '10px',
            transition: 'width 0.3s ease',
        }}>
            <div className="d-flex align-items-center mb-4">
                <Button onClick={toggleSidebar} className='bg-light border-0 text-dark me-2'>☰</Button>
                {!collapsed && <Image src={logo} alt="Logo" width={60} height={60} />}
            </div>
            <div className="d-flex flex-column gap-3">
                <SidebarLink to="/dashboard/all" icon={<Settings size={20} />} text="All items" gradient="#f7971e, #ffd200" />
                <SidebarLink to="/dashboard/sale" icon={<Tag size={20} />} text="Sale items" gradient="#678ef8ff, #8e2de2" />
                <SidebarLink to="/dashboard/new" icon={<Grid size={20} />} text="New items" gradient="#11998e, #38ef7d" />
                <SidebarLink to="/dashboard/recent" icon={<Settings size={20} />} text="Recent items" gradient="#f7971e, #ffd200" />
                <SidebarLink to="/dashboard/auction" icon={<BarChart2 size={20} />} text="Auction" gradient="#3a1c71, #d76d77, #ffaf7b" />
                <SidebarLink to="/admin" icon={<Settings size={20} />} text="Admin" gradient="#f7971e, #ffd200" />
                <SidebarLink to="/" icon={<Home size={20} />} text="Home Page" gradient="#3a1c71, #d76d77, #ffaf7b" />
            </div>
        </div>
    );
};

export default Side;
