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

const baseURL = window.location.origin + '/' + window.location.pathname.substring(0, window.location.pathname.indexOf('/dealerships'));

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
                    <Nav.Link href="/dealerships">Dealerships</Nav.Link>
                    {/*<Nav.Link href="/requests">Requests</Nav.Link>
                    <Nav.Link href="/requests">Requests</Nav.Link>
                    <Nav.Link href="/requests">Requests</Nav.Link>*/}
                </Nav>
            </Navbar>
            <Route exact path="/" component={App} />
            <Route exact
                   path="/dealerships"
                   component={DealershipListApp}
                   match="hi"
            />
            <Route path="/dealerships/:name" component={DealershipApp} />
        </div>
    </Router>
    </div>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
