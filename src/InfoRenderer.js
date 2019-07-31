import React from 'react';
import {pathURL} from "./index";

export const InfoRenderer = (props) => {
    let url = props.data.name;
    while (url.includes(' ')) {
        url = url.replace(' ', '-');
    }
    url = url.toLowerCase();
    if (props.colDef.headerName === "Solution Name")
        return <button onClick={() => props.colDef.cellRendererParams.handleClick(props.data.solutionId)}
                       className="InfoRenderer">{props.data.solutionName}</button>
    return <a className="link" href={`${pathURL}/dealerships/${url}`}>{props.data.name}</a>
}