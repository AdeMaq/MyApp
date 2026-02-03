// CustomPagination.js
import React from 'react';
import { Pagination } from 'react-bootstrap';
import './Pagination.css';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    const pageLimit = 2;
    const leftside = currentPage - pageLimit / 2 > 1;
    const rightside = currentPage + pageLimit / 2 < totalPages;

    const commonStyle = {
        width: '44px',
        minWidth: '44px',
        height: '36px',
        padding: '0',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const commonClass = "custom-pagination-item";

    pages.push(
        <Pagination.First
            key="first"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            style={commonStyle}
            className={commonClass}
        />
    );

    pages.push(
        <Pagination.Prev
            key="prev"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            style={commonStyle}
            className={commonClass}
        />
    );

    if (leftside) {
        pages.push(
            <Pagination.Ellipsis
                key="left-ellipsis"
                onClick={() => onPageChange(Math.max(currentPage - 2, 1))}
                style={{ ...commonStyle, cursor: 'pointer' }}
                className={commonClass}
            />
        );
    }

    const start = Math.max(1, Math.floor(currentPage - pageLimit / 2));
    const end = Math.min(totalPages, Math.ceil(currentPage + pageLimit / 2));

    for (let i = start; i <= end; i++) {
        pages.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => onPageChange(i)}
                style={commonStyle}
                className={commonClass}
            >
                {i}
            </Pagination.Item>
        );
    }

    if (rightside) {
        pages.push(
            <Pagination.Ellipsis
                key="right-ellipsis"
                onClick={() => onPageChange(Math.min(currentPage + 2, totalPages))}
                style={{ ...commonStyle, cursor: 'pointer' }}
                className={commonClass}
            />
        );
    }

    pages.push(
        <Pagination.Next
            key="next"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={commonStyle}
            className={commonClass}
        />
    );

    pages.push(
        <Pagination.Last
            key="last"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            style={commonStyle}
            className={commonClass}
        />
    );

    return (
        <Pagination
            size="sm"
            style={{
                display: 'flex',
                gap: '0',
                padding: '0',
                margin: '0',
                justifyContent: 'center',
                flexWrap: 'nowrap',
            }}
        >
            {pages}
        </Pagination>
    );
};

export default CustomPagination;
