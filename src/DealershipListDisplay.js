import React from 'react';
import Nav from "react-bootstrap/Nav";
import {pathURL} from "./index";
import './DealershipListApp.css'

export const DealershipListDisplay = (props) => {
    /*const navLinks = props.urlNames.map(url => {
        return <Nav.Link href={url}> {url.toUpperCase().replace('-', ' ').substring(1)} </Nav.Link>;
    });*/

    return (
        <div className="dealership-display">
            <h1>Dealerships</h1>
            <Nav className="flex-column">
                {props.dealershipNameData.map(data => <Nav.Link href={'/'+ pathURL + 'dealerships' + data.substring(0, data.indexOf('||'))}>{data.substring(data.indexOf('||') + 2)}</Nav.Link>)}
            </Nav>
        </div>
    )
}