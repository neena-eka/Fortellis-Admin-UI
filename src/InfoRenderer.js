import React from 'react';

export const InfoRenderer = (props) => {
    return <button onClick={() => props.colDef.cellRendererParams.handleClick(props.data.solutionId)} className="InfoRenderer">{props.colDef.headerName === "Solution Name" ? props.data.solutionName : props.data.name}</button>
}