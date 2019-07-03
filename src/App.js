import React from 'react';
import './App.css';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import {fetchEntityInfo} from "./fetchEntityInfo";
import {postEntifyInfo} from "./fetchEntityInfo";


class ButtonCellRenderer extends React.Component {
  handleClick(newStatus) {
    this.props.colDef.cellRendererParams.handleClick(this.props.data.id, newStatus);
  }

  render() {
    if(!this.props.data.status)
      return null;
    let status = this.props.data.status;
    if(status === 'Accepted'){
      return <button onClick={() => this.handleClick('Declined')}>Remove Access</button>;
    }
    if(status === 'Declined'){
      return <button hidden={true}>hi</button>;
    }
    if(status === 'Pending') {
      return (
          <div>
            <button onClick={() => this.handleClick('Accepted')}>Accept</button>
            <button onClick={() => this.handleClick('Declined')}>Decline</button>
          </div>
      );
    }
    return <button>Fail :(</button>;
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {headerName: "ID", field: "id", width: 300},
        {headerName: "Name", field: "name"},
        {headerName: "Address", field: "address", width: 300},
        {headerName: "Phone Number", field: "phoneNumber"},
        {headerName: "Store ID", field: "storeId"},
        {headerName: "Store Name", field: "storeName"},
        {headerName: "Status", field: "status"},
        {
          headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {handleClick: this.updateRequest}
        }
      ],
      rowData: []
    }
    this.setUp = this.setUp.bind(this);
    this.updateRequest = this.updateRequest.bind(this);
  }

  async setUp() {
    let attributes = await fetchEntityInfo();
    //await postEntifyInfo('f83eaff0-3f88-4ebd-9fc8-25f051632968', 'Accepted');
    attributes = attributes.split('||');
    let row=[];
    for(let i = 0; i < attributes.length; i += 7) {
      row.push({
        id: attributes[i],
        name: attributes[i + 1],
        address: attributes[i + 2],
        phoneNumber: attributes[i + 3],
        storeId: attributes[i + 4],
        storeName: attributes[i + 5],
        status: attributes[i + 6]
      });
    }
    let attributeData=[];
    for(let i = 0; i < this.state.rowData.length; i++) {
      attributeData.push(this.state.rowData[i].status);
    }
    this.setState({rowData: row,
      columnDefs: [
        {headerName: "ID", field: "id", width: 300},
        {headerName: "Name", field: "name"},
        {headerName: "Address", field: "address", width: 300},
        {headerName: "Phone Number", field: "phoneNumber"},
        {headerName: "Store ID", field: "storeId"},
        {headerName: "Store Name", field: "storeName"},
        {headerName: "Status", field: "status"},
        {
          headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {handleClick: this.updateRequest}
        }
      ]});
  }

  componentDidMount() {
    this.setUp();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.render();
  }

  async updateRequest(id, newStatus) {
    this.setState({
      rowData: this.state.rowData.map(request =>
        request.id === id ? {...request, status: newStatus} : request)
    });
    await postEntifyInfo(id, newStatus);
  }


  render() {
    return (
        <div
            className="ag-theme-balham"
            style={{
              height: '500px',
              width: '1800px'
            }}
        >
          <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}>
          </AgGridReact>
        </div>
    );
  }
}

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Grid/>
        </header>
      </div>
  )
}
export default App;