import React from "react";
import {ButtonCellRenderer} from "./ButtonCellRenderer";
import {fetchEntityInfo, patchEntityInfo} from "./entityInfoAPIAccessor";
import {GridDisplay} from "./GridDisplay";
import {InfoRenderer} from "./InfoRenderer";
import Popup from "reactjs-popup";

export class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: "Date", field: "date", width: 90, sortable: true, comparator: this.dateSort, sortingOrder: ['desc', 'asc'], sort: 'desc'},
                {headerName: "Solution Name", field: "solutionName", cellRendererFramework: InfoRenderer, cellRendererParams: {handleClick: this.displayInfo}},
                {headerName: "ID", field: "id", width: 300},
                {headerName: "Name", field: "name", filter: true},
                {headerName: "Address", field: "address", width: 300},
                {headerName: "Phone Number", field: "phoneNumber", width: 140},
                {headerName: "Store ID", field: "storeId", width: 110},
                {headerName: "Store Name", field: "storeName", width: 130},
                {headerName: "Status", field: "status", width: 90},
                {
                    headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {handleClick: this.updateRequest}, width: 150
                },
                {headerName: "Solution ID", field: "solutionId", hide: true}
            ],
            rowData: [],
            data: ""
        }
        this.setUp = this.setUp.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
        this.dateSort = this.dateSort.bind(this);
        this.displayInfo = this.displayInfo.bind(this);
    }

    async setUp(filter) {
        let attributes = await fetchEntityInfo();
        if(attributes === "Information not found") {
            console.log(attributes);
            return;
        }
        let row=[];
        for(let i = 0; i < attributes.items.length; i ++) {
            if(filter === 'All' || filter === attributes.items[i].requestStatus.s) {
                row.push({
                    id: attributes.items[i].id.s,
                    name: attributes.items[i].name.s,
                    address: attributes.items[i].address.s,
                    phoneNumber: attributes.items[i].phoneNumber.s,
                    date: attributes.items[i].date.s,
                    storeId: attributes.items[i].storeId.s,
                    storeName: attributes.items[i].storeName.s,
                    status: attributes.items[i].requestStatus.s,
                    solutionName: attributes.items[i].solutionName.s,
                    solutionId: attributes.items[i].solutionId.s,
                });
            }
        }

        this.setState({
            rowData: row,
            columnDefs: [
                {headerName: "Date", field: "date", width: 90, sortable: true, comparator: this.dateSort, sortingOrder: ['desc', 'asc'], sort: 'desc'},
                {
                    headerName: "Solution Name", field: "solutionName", cellRendererFramework: InfoRenderer, cellRendererParams: {handleClick: this.displayInfo}
                },
                {headerName: "ID", field: "id", width: 300},
                {headerName: "Name", field: "name", filter: true},
                {headerName: "Address", field: "address", width: 300},
                {headerName: "Phone Number", field: "phoneNumber", width: 140},
                {headerName: "Store ID", field: "storeId", width: 110},
                {headerName: "Store Name", field: "storeName", width: 130},
                {headerName: "Status", field: "status", width: 90},
                {
                    headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {handleClick: this.updateRequest}, width: 150
                },
                {headerName: "Solution ID", field: "solutionId", hide: true}
            ],
            data: ""
        });

    }

    async displayInfo(solutionId) {
        let attributes = await fetchEntityInfo();
        let row = {};
        for(let i=0; i<attributes.items.length; i++){
            if(solutionId === attributes.items[i].solutionId.s){
                row = attributes.items[i];
            }
        }
        let data = ['Solution ID: ' + row.solutionId.s,
         'Solution Name: ' + row.solutionName.s,
         'Developer: ' + row.developer.s,
         'Contact Email: ' + row.email.s,
         'Subscription ID: ' + row.subscriptionId.s,
         'Connection ID: ' + row.connectionId.s];
        this.setState({data})

        document.getElementById('popup-button').click();
    }

    dateSort(valueA, valueB) {
        let yearA = valueA.substring(6,8);
        let monthA = valueA.substring(0,2);
        let dayA = valueA.substring(3,5);
        let yearB = valueB.substring(6,8);
        let monthB = valueB.substring(0,2);
        let dayB = valueB.substring(3,5);

        let dateA = yearA + monthA + dayA;
        let dateB = yearB + monthB + dayB;

        return dateA - dateB;
    }

    componentDidMount() {
        this.setUp('All');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.render();
    }

    async updateRequest(id, newStatus) {
        this.setState({
            rowData: this.state.rowData.map(request =>
                request.id === id ? {...request, status: newStatus} : request)
        });
        await patchEntityInfo(id, newStatus);
    }


    render() {
        return (
            <GridDisplay data={this.state.data} setUp={this.setUp} rowData={this.state.rowData} columnDefs={this.state.columnDefs}/>
        );
    }
}