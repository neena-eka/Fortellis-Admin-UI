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
                {
                    headerName: "Date",
                    field: "date",
                    width: 90,
                    sortable: true,
                    comparator: this.dateSort,
                    sortingOrder: ['desc', 'asc'],
                    sort: 'desc'
                },
                {
                    headerName: "Solution Name",
                    field: "solutionName",
                    cellRendererFramework: InfoRenderer,
                    cellRendererParams: {handleClick: this.displaySolutionInfo}
                },
                {headerName: "Name", field: "name", filter: true, cellRendererFramework: InfoRenderer},
                {headerName: "ID", field: "entityId", width: 300},
                {headerName: "Store Name", field: "storeName", width: 130},
                {headerName: "Store ID", field: "storeId", width: 110},
                {headerName: "Status", field: "status", width: 90},
                {
                    headerName: "Actions",
                    field: "actions",
                    cellRendererFramework: ButtonCellRenderer,
                    cellRendererParams: {handleClick: this.updateRequest},
                    width: 135
                }
            ],
            rowData: [],
            solutionData: [],
            contactData: [],
        }
        this.setUp = this.setUp.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
        this.dateSort = this.dateSort.bind(this);
        this.displaySolutionInfo = this.displaySolutionInfo.bind(this);
        this.setContactInfo = this.setContactInfo.bind(this);
    }

    async setUp(statusFilter) {
        let attributes = await fetchEntityInfo();
        if (attributes === "Information not found") {
            console.log(attributes);
            return;
        }
        let row = [];
        let item;
        let nameExists = false;
        for (let i = 0; i < attributes.items.length; i++) {
            if (!this.props.nameFilter || this.props.nameFilter === attributes.items[i].name.s) {
                nameExists = this.props.nameFilter === attributes.items[i].name.s ? true : nameExists;
                if (statusFilter === 'All' || statusFilter === attributes.items[i].requestStatus.s) {
                    item = attributes.items[i];
                    row.push({
                        id: item.id.s,
                        entityId: item.entityId.s,
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
        }
        if (row.length === 0) {
            let data = ["No " + statusFilter.toLowerCase() + " requests"];
            if (attributes.items.length === 0) {
                data = ["There are no requests"];
            }
            if (!nameExists && this.props.nameFilter) {
                data = ["No requests from this dealership"];
            }
            this.setState({solutionData: data})
            document.getElementById('popup-button').click();
        }

        this.setState({
            columnDefs: [
                {
                    headerName: "Date",
                    field: "date",
                    width: 90,
                    sortable: true,
                    comparator: this.dateSort,
                    sortingOrder: ['desc', 'asc'],
                    sort: 'desc'
                },
                {
                    headerName: "Solution Name",
                    field: "solutionName",
                    cellRendererFramework: InfoRenderer,
                    cellRendererParams: {handleClick: this.displaySolutionInfo}
                },
                {
                    headerName: "Name",
                    field: "name",
                    filter: true,
                    cellRendererFramework: InfoRenderer,
                    hide: this.props.nameFilter
                },
                {headerName: "ID", field: "entityId", width: 300, hide: this.props.nameFilter},
                {headerName: "Store Name", field: "storeName", width: 130, hide: this.props.nameFilter},
                {headerName: "Store ID", field: "storeId", width: 110, hide: this.props.nameFilter},
                {headerName: "Status", field: "status", width: 90},
                {
                    headerName: "Actions",
                    field: "actions",
                    cellRendererFramework: ButtonCellRenderer,
                    cellRendererParams: {handleClick: this.updateRequest},
                    width: 135
                },
            ],
            rowData: row,
        });
        this.setContactInfo(this.props.nameFilter)
    }

    displaySolutionInfo(solutionId) {
        let attributes = this.state.rowData;
        let row = {};
        for (let i = 0; i < attributes.length; i++) {
            if (solutionId === attributes[i].solutionId) {
                row = attributes[i];
            }
        }
        let data = ['Solution ID: ' + row.solutionId,
            'Solution Name: ' + row.solutionName,
            'Developer: ' + row.developer,
            'Contact Email: ' + row.email,
            'Subscription ID: ' + row.subscriptionId,
            'Connection ID: ' + row.connectionId];
        this.setState({solutionData: data});

        document.getElementById('popup-button').click();
    }

    setContactInfo(nameFilter) {
        if (!this.props.nameFilter) {
            return;
        }
        let attributes = this.state.rowData;
        let row = {};
        for (let i = 0; i < attributes.length; i++) {
            if (nameFilter === attributes[i].name) {
                row = attributes[i];
                break;
            }
        }
        let data = ['ID: ' + row.entityId,
            'Store Name: ' + row.storeName,
            'Store ID: ' + row.storeId,
            'Phone Number: ' + row.phoneNumber,
            'Address: ' + row.address];
        if (!data[0].includes('undefined'))
            this.setState({contactData: data});
    }

    dateSort(valueA, valueB) {
        let yearA = valueA.substring(6, 8);
        let monthA = valueA.substring(0, 2);
        let dayA = valueA.substring(3, 5);
        let yearB = valueB.substring(6, 8);
        let monthB = valueB.substring(0, 2);
        let dayB = valueB.substring(3, 5);

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
            <GridDisplay solutionData={this.state.solutionData} contactData={this.state.contactData} setUp={this.setUp}
                         rowData={this.state.rowData} columnDefs={this.state.columnDefs}/>
        );
    }
}