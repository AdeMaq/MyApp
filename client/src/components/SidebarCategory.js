import React, { useState, useEffect } from 'react';
import { Container, Col, Image } from 'react-bootstrap';
import './SidebarCategory.css';
import right from '../asserts/right.png';
import { Link } from "react-router-dom";

const SidebarCategory = () => {
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [activeType, setActiveType] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5001/categories");
        let data = await res.json();
        data = data.sort((a, b) => a.categoryTypeId - b.categoryTypeId);
        setCategoryTypes(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);


  return (
    <>
      <Container>
        <Col
          style={{
            width: '192.1px',
            height: '48px',
            backgroundColor: '#24b26b',
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '12px',
            fontSize: '15px',
            position: 'sticky',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            top: 0,
            zIndex: 20
          }}
        >
          <span style={{ fontSize: '18px', marginRight: '10px' }}>&#9776;</span>
          All Categories
        </Col>
      </Container>
      <Container
        fluid
        className="sidebarContainer position-relative g-4"
        style={{ fontSize: '13px' }}
        onMouseLeave={() => {
          setActiveType(null);
          setActiveCategory(null);
        }}
      >
        <Col
          className="sidebar bg-white border-end g-4"
          style={{ width: '192.1px', height: '346px', overflowY: 'auto' }}
        >
          <ul className="list-unstyled m-0">
            {categoryTypes.slice(0, 10).map((type) => (
              <li
                key={type.categoryTypeId}
                className="py-3 px-3"
                style={{ fontSize: '12px' }}
                onMouseEnter={() => {
                  setActiveType(type);
                  setActiveCategory(null);
                }}
              >
                <Link
                  to={`/products?categoryTypeId=${type.categoryTypeId}`}
                  className="text-decoration-none text-dark"
                  style={{ fontSize: '14px' }}
                >
                  {type.name}
                </Link>
                {type.categories?.length > 0 && (
                  <span className="arrow">
                    <Image src={right} alt="arrow" style={{ width: '10px', height: '10px' }} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Col>
        {activeType?.categories?.length > 0 && (
          <Col
            className="subMenu bg-light position-absolute g-4"
            style={{
              left: '205px',
              width: '230px',
              height: '346px',
              top: 0,
              overflowY: 'auto'
            }}
          >
            <ul className="list-unstyled m-0">
              {activeType.categories.map((cat) => (
                <li
                  key={cat.categoryId}
                  style={{ fontSize: '12px' }}
                  className={`py-2 px-3 ${activeCategory?.categoryId === cat.categoryId ? 'bg-success-subtle' : ''}`}
                  onMouseEnter={() => setActiveCategory(cat)}
                >
                  <Link
                    to={`/products?categoryId=${cat.categoryId}`}
                    className="text-decoration-none text-dark"
                    style={{ fontSize: '14px' }}
                  >
                    {cat.name}
                  </Link>
                  {cat.categoryItems?.length > 0 && (
                    <span style={{ marginLeft: '10px' }}>
                      <Image src={right} alt="arrow" style={{ width: '10px', height: '10px' }} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Col>
        )}
        {activeCategory?.categoryItems?.length > 0 && (
          <Col
            className="subSubMenu position-absolute"
            style={{
              left: '435px',
              width: '240px',
              top: 0,
              height: '346px',
              background: '#f8f7f7',
              overflowY: 'auto'
            }}
          >
            <ul className="list-unstyled m-0">
              {activeCategory.categoryItems.map((item) => (
                <li
                  key={item.categoryItemId}
                  style={{ fontSize: '12px' }}
                  className="py-2 px-3"
                >
                  <Link
                    to={`/products?categoryItemId=${item.categoryItemId}`}
                    className="text-decoration-none text-dark"
                    style={{ fontSize: '14px' }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        )}
      </Container>
    </>
  );
};

export default SidebarCategory;
