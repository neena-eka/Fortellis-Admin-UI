import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import DealershipApp from './DealershipApp';
import * as serviceWorker from './serviceWorker';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Switch from "react-router-dom/Switch";
import {Dealerships} from './Dealerships'
import "@cdk-uip/react/cdk.css";
import { CDKGlobalHeader } from "@cdk-uip/react-global-header";

let pathname = window.location.pathname;
let origin = window.location.origin;
export const pathURL = pathname.substring(0, pathname.includes('/dealerships') ? pathname.indexOf('/dealerships') : pathname.length - 1);
export const baseURL = origin + pathURL;


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
                <Navbar className="nav-bar">
                    <Nav className="nav">
                        <Nav.Link href={`${baseURL}/`}>Home</Nav.Link>
                        <Nav.Link href={`${baseURL}/dealerships`}>Dealerships</Nav.Link>
                    </Nav>
                </Navbar>
                <Switch>
                    <Route exact
                           path={`${pathURL}/`}
                           component={App}
                    />
                    <Route path={`${pathURL}/dealerships`}
                           component={Dealerships}
                    />
                    <Route path={`${pathURL}/dealerships/:name`}
                           component={DealershipApp}
                    />
                </Switch>
            </div>
        </Router>
    </div>
)

ReactDOM.render(<div><CDKGlobalHeader appName="Fortellis Admin Page" />{routing}</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
