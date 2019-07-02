import React from 'react';
import './App.css';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import {fetchEntityInfo} from "./fetchEntityInfo";



class ButtonCellRenderer extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    }
  }*/

  render() {
    if(!this.props.status)
      return null;
    let status = this.props.status;
    if(status[status.length - 1]==='Accepted'){
      //status.pop();
      return <button>Remove Access</button>;
    }
    if(status[status.length - 1]==='Declined'){
      //status.pop();
      return;
    }
    if(status[status.length - 1]==='Pending') {
      //status.pop();
      return (
          <div>
            <button>Accept</button>
            <button>Decline</button>
          </div>
      );
    }
    return <button>{this.props.value}</button>;
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
          headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {status: null}
        }
      ],
      rowData: [],
      attributeData: []
    }
    this.setUp = this.setUp.bind(this);
    //this.getStatusDetails = this.getStatusDetails.bind(this);
    //this.setUp();
    //this.setUp();
  }

  async setUp() {
    let attributes = await fetchEntityInfo();
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
    this.setState({
      rowData: row,
      //attributeData: attributeData,
      columnDefs: [
        {headerName: "ID", field: "id", width: 300},
        {headerName: "Name", field: "name"},
        {headerName: "Address", field: "address", width: 300},
        {headerName: "Phone Number", field: "phoneNumber"},
        {headerName: "Store ID", field: "storeId"},
        {headerName: "Store Name", field: "storeName"},
        {headerName: "Status", field: "status"},
        {
          headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {status: attributeData}
        }
      ]
    }
    );
  }

  /*getStatusDetails() {
    let statusDetails = [];
    for(let i = 0; i < this.state.rowData.length; i++) {
      statusDetails.push(this.state.rowData[i].status);
    }
    return statusDetails;
  }*/


  componentDidMount() {
    this.setUp();
    this.setUp();
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

/*async function setUp() {
  let attributes = await fetchEntityInfo();
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

  this.setState({
    rowData: row,
    //attributeData: attributeData,
    columnDefs: [
      {headerName: "ID", field: "id", width: 300},
      {headerName: "Name", field: "name"},
      {headerName: "Address", field: "address", width: 300},
      {headerName: "Phone Number", field: "phoneNumber"},
      {headerName: "Store ID", field: "storeId"},
      {headerName: "Store Name", field: "storeName"},
      {headerName: "Status", field: "status"},
      {
        headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {status: attributeData}
      }
    ]
  }
  );
}*/

//const Button = () => {
 // return <button>Test</button>;
//}

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