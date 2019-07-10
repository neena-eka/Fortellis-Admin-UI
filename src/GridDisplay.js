import {GridDropdown} from "./GridDropdown";
import React from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

export const GridDisplay = (props) => {
    return (
        <div>
            <div style={{width:'120px', height: '50px', marginBottom: '-18px'}}>
                <GridDropdown onChange={props.setUp}/>
            </div>
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '1710px'
                }}
            >
                <AgGridReact
                    className="Grid"
                    columnDefs={props.columnDefs}
                    rowData={props.rowData}>
                </AgGridReact>
            </div>
        </div>
    );
}
