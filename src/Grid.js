import React from "react";
import {ButtonCellRenderer} from "./ButtonCellRenderer";
import {fetchEntityInfo, patchEntityInfo} from "./entityInfoAPIAccessor";
import {GridDisplay} from "./GridDisplay";
import {InfoRenderer} from "./InfoRenderer";

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
            ],
            rowData: [],
            data: []
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
                    developer: attributes.items[i].developer.s,
                    email: attributes.items[i].email.s,
                    subscriptionId: attributes.items[i].subscriptionId.s,
                    connectionId: attributes.items[i].connectionId.s
                });
            }
        }

        this.setState({
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
            ],
            rowData: row,
            data: []
        });

    }

    displayInfo(solutionId) {
        let attributes = this.state.rowData;
        let row = {};
        for(let i=0; i<attributes.length; i++){
            if(solutionId === attributes[i].solutionId){
                row = attributes[i];
            }
        }
        let data = ['Solution ID: ' + row.solutionId,
         'Solution Name: ' + row.solutionName,
         'Developer: ' + row.developer,
         'Contact Email: ' + row.email,
         'Subscription ID: ' + row.subscriptionId,
         'Connection ID: ' + row.connectionId];
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