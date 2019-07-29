import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DealershipListApp from "./DealershipListApp";
import {pathURL} from "./index";
import DealershipApp from "./DealershipApp";

export const Dealerships = () => (
    <Switch>
        <Route exact
               path={`${pathURL}/dealerships`}
               component={DealershipListApp}
        />
        <Route path={`${pathURL}/dealerships/:name`}
               component={DealershipApp}
        />
    </Switch>
)