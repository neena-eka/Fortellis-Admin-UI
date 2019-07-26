import React from 'react';
import Nav from "react-bootstrap/Nav";

export const DealershipListDisplay = (props) => {
    return (
        <div className="dealership-display">
            <h1>Dealerships</h1>
            <Nav className="flex-column">
                <Nav.Link href="/">Excellent Car Dealership</Nav.Link>
                <Nav.Link href="/">Dealerships</Nav.Link>
                <Nav.Link href="/requests">Requests</Nav.Link>
                <Nav.Link href="/requests">Requests</Nav.Link>
                <Nav.Link href="/requests">Requests</Nav.Link>
            </Nav>
        </div>
    )
}