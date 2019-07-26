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
                {headerName: "Solution Name", field: "solutionName", cellRendererFramework: InfoRenderer, cellRendererParams: {handleClick: this.displaySolutionInfo}},
                {headerName: "Name", field: "name", filter: true, cellRendererFramework: InfoRenderer, cellRendererParams: {handleClick: this.displayContactInfo}},
                {headerName: "ID", field: "id", width: 300},
                {headerName: "Store Name", field: "storeName", width: 130},
                {headerName: "Store ID", field: "storeId", width: 110},
                {headerName: "Status", field: "status", width: 90},
                {
                    headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {handleClick: this.updateRequest}, width: 135
                },
            ],
            rowData: [],
            data: []
        }
        this.setUp = this.setUp.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
        this.dateSort = this.dateSort.bind(this);
        this.displaySolutionInfo = this.displaySolutionInfo.bind(this);
        this.displayContactInfo = this.displayContactInfo.bind(this);
    }

    async setUp(filter) {
        let attributes = await fetchEntityInfo();
        if(attributes === "Information not found") {
            console.log(attributes);
            return;
        }
        let row=[];
        let item;
        for(let i = 0; i < attributes.items.length; i ++) {
            if(filter === 'All' || filter === attributes.items[i].requestStatus.s) {
                item = attributes.items[i];
                row.push({
                    id: item.id.s,
                    name: item.name.s,
                    address: item.address.s,
                    phoneNumber: item.phoneNumber.s,
                    date: item.date.s,
                    storeId: item.storeId.s,
                    storeName: item.storeName.s,
                    status: item.requestStatus.s,
                    solutionName: item.solutionName.s,
                    solutionId: item.solutionId.s,
                    developer: item.developer.s,
                    email: item.email.s,
                    subscriptionId: item.subscriptionId.s,
                    connectionId: item.connectionId.s
                });
            }
        }
        if(row.length === 0) {
            let data = ["", "", "No " + filter.toLowerCase() + " requests", "", "", ""];
            if(attributes.items.length === 0) {
                data = ["", "", "There are no requests", "", "", ""];
            }
            this.setState({data})
            document.getElementById('popup-button').click();
        }

        this.setState({
            columnDefs: [
                {headerName: "Date", field: "date", width: 90, sortable: true, comparator: this.dateSort, sortingOrder: ['desc', 'asc'], sort: 'desc'},
                {
                    headerName: "Solution Name", field: "solutionName", cellRendererFramework: InfoRenderer, cellRendererParams: {handleClick: this.displaySolutionInfo}
                },
                {headerName: "Name", field: "name", filter: true, cellRendererFramework: InfoRenderer, cellRendererParams: {handleClick: this.displayContactInfo}},
                {headerName: "ID", field: "id", width: 300},
                {headerName: "Store Name", field: "storeName", width: 130},
                {headerName: "Store ID", field: "storeId", width: 110},
                {headerName: "Status", field: "status", width: 90},
                {
                    headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {handleClick: this.updateRequest}, width: 135
                },
            ],
            rowData: row,
        });

    }

    displaySolutionInfo(solutionId) {
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
         'Subscription ID: ' + row.subscriptionId,
         'Connection ID: ' + row.connectionId];
        this.setState({data})

        document.getElementById('popup-button').click();
    }

    displayContactInfo(solutionId) {
        let attributes = this.state.rowData;
        let row = {};
        for(let i=0; i<attributes.length; i++){
            if(solutionId === attributes[i].solutionId){
                row = attributes[i];
            }
        }
        let data = ['Name: ' + row.name,
            'Phone Number: ' + row.phoneNumber,
            'Contact Email: ' + row.email,
            'Address: ' + row.address];
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
        this.setUp('Pending');
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