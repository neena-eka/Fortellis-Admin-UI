import React from 'react';
import {fetchEntityInfo} from "./entityInfoAPIAccessor";
import './App.css'
import './DealershipApp.css'
import {Grid} from "./Grid";

export const DealershipAppDisplay = (props) => {
    return (
        <div className="grid-div">
            <div style={{maxWidth: "517px", margin: 'auto'}} >
                <header>
                    <h1>{props.nameFilter}</h1>
                </header>
                    <Grid className="dealership-grid" nameFilter={props.nameFilter}/>
            </div>
        </div>
    )
}