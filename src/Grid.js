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
                {headerName: "Solution ID", field: "solutionId", hide: true}
            ],
            rowData: []
        }
        this.setUp = this.setUp.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
        this.dateSort = this.dateSort.bind(this);
        this.displayInfo = this.displayInfo.bind(this);
    }

    async setUp(filter) {
        let attributes = await fetchEntityInfo();
        let row=[];
        for(let i = 0; i < attributes.length; i ++) {
            if(filter === 'All' || filter === attributes[i].requestStatus.S) {
                row.push({
                    id: attributes[i].id.S,
                    name: attributes[i].name.S,
                    address: attributes[i].address.S,
                    phoneNumber: attributes[i].phoneNumber.S,
                    date: attributes[i].date.S,
                    storeId: attributes[i].storeId.S,
                    storeName: attributes[i].storeName.S,
                    status: attributes[i].requestStatus.S,
                    solutionName: attributes[i].solutionName.S,
                    solutionId: attributes[i].solutionId.S,
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
        });

    }

    async displayInfo(solutionId) {
        let attributes = await fetchEntityInfo();
        let row = {};
        for(let i=0; i<attributes.length; i++){
            if(solutionId === attributes[i].solutionId.S){
                row = attributes[i];
            }
        }
        let data = 'Solution ID: ' + row.solutionId.S + '\n'
        + 'Solution Name: ' + row.solutionName.S + '\n'
        + 'Developer: ' + row.developer.S + '\n'
        + 'Contact Email: ' + row.email.S + '\n'
        + 'Subscription ID: ' + row.subscriptionId.S + '\n'
        + 'Connection ID: ' + row.connectionId.S;
        window.alert(data);
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
            <GridDisplay setUp={this.setUp} rowData={this.state.rowData} columnDefs={this.state.columnDefs}/>
        );
    }
}