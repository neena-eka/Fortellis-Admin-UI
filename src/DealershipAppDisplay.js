import React from 'react';
import {fetchEntityInfo} from "./entityInfoAPIAccessor";
import './App.css'
import './DealershipApp.css'
import {Grid} from "./Grid";

export const DealershipAppDisplay = (props) => {
    return (
        <div>
            <header>
                <h1>{props.nameFilter}</h1>
            </header>
            <Grid nameFilter={props.nameFilter}/>
        </div>
    )
}