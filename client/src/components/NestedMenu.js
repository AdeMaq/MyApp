import React, { useState } from 'react';
import './NestedMenu.css';
import right from '../asserts/right.png';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NestedMenu = ({ items, level = 0 }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const buildLink = (item) => {
    if (item.ventItemTypeId) return `/brand?ventItemTypeId=${item.ventItemTypeId}`;
    if (item.ventItemId) return `/brand?ventItemId=${item.ventItemId}`;
    if (item.ventId) return `/brand?ventId=${item.ventId}`;
    if (item.ventTypeId) return `/brand?ventTypeId=${item.ventTypeId}`;
    return `/brand`;
  };

  return (
    <ul className={`menu level-${level}`}>
      {items.map((item, index) => (
        <li
          key={index}
          className="menu-item"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="menu-title">
            <Link
              to={buildLink(item)}
              style={{ color: "black", textDecoration: "none", fontSize: '13px' }}
            >
              {item.name}
            </Link>

            {(item.vents?.length > 0 ||
              item.ventItems?.length > 0 ||
              item.ventItemTypes?.length > 0) && (
                <span className="arrow">
                  <Image src={right} alt="arrow" style={{ width: '10px', height: '10px' }} />
                </span>
              )}
          </div>

          {hoveredIndex === index && (
            <>
              {item.vents?.length > 0 && (
                <NestedMenu items={item.vents} level={level + 1} />
              )}
              {item.ventItems?.length > 0 && (
                <NestedMenu items={item.ventItems} level={level + 1} />
              )}
              {item.ventItemTypes?.length > 0 && (
                <NestedMenu items={item.ventItemTypes} level={level + 1} />
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NestedMenu;
