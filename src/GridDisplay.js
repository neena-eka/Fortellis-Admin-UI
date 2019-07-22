import {GridDropdown} from "./GridDropdown";
import React from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export const GridDisplay = (props) => {
    return (
        <div className="Display">
            <div style={{width:'120px', height: '50px', marginBottom: '-18px'}}>
                <GridDropdown onChange={props.setUp}/>
            </div>
            <div
                className="ag-theme-balham"
                style={{height: "500px"}}
            >
                <AgGridReact
                    className="Grid"
                    columnDefs={props.columnDefs}
                    rowData={props.rowData}
                    suppressDragLeaveHidesColumns={true}>
                </AgGridReact>
            </div>
        </div>
    );
}
