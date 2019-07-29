import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import DealershipListApp from './DealershipListApp';
import DealershipApp from './DealershipApp';
import * as serviceWorker from './serviceWorker';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

let pathname = window.location.pathname;
let origin = window.location.origin;
let pathURL = pathname.substring(0, pathname.includes('/dealerships') ? pathname.indexOf('/dealerships') : pathname.length);
let baseURL = origin +  pathURL;


const routing = (
    <div className="nav-div">
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
        />
        <link
            rel="stylesheet"
            href="./App.css"
        />

        <Router>
        <div>
            {/*<ul>
                <li>
                    <Link to="/requests">Requests</Link>
                </li>
            </ul>*/}
           <Navbar className="nav-bar">
                <Nav className="nav">
                    <Nav.Link href={baseURL}>Home</Nav.Link>
                    <Nav.Link href={`${baseURL}dealerships`}>Dealerships</Nav.Link>
                    {/*<Nav.Link href="/requests">Requests</Nav.Link>
                    <Nav.Link href="/requests">Requests</Nav.Link>
                    <Nav.Link href="/requests">Requests</Nav.Link>*/}
                </Nav>
            </Navbar>
            <Route exact
                   path={`${pathURL}/`}
                   component={App}
            />
            <Route exact
                   path={`${pathURL}/dealerships`}
                   component={DealershipListApp}
            />
            <Route exact
                   path={`${pathURL}/dealerships/:name`}
                   component={DealershipApp}
            />
        </div>
    </Router>
    </div>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
