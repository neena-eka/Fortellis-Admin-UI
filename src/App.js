import React from 'react';
import './App.css';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import {fetchEntityInfo} from "./fetchEntityInfo";
import {postEntityInfo} from "./fetchEntityInfo";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

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
        {headerName: "Date", field: "date", width: 90, sortable: true, comparator: this.dateSort, sortingOrder: ['desc', 'asc'], sort: 'desc'},
        {headerName: "ID", field: "id", width: 300},
        {headerName: "Name", field: "name", filter: true},
        {headerName: "Address", field: "address", width: 300},
        {headerName: "Phone Number", field: "phoneNumber", width: 140},
        {headerName: "Store ID", field: "storeId", width: 110},
        {headerName: "Store Name", field: "storeName"},
        {headerName: "Status", field: "status", width: 90},
        {
          headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {handleClick: this.updateRequest}, width: 150
        }
      ],
      rowData: []
    }
    this.setUp = this.setUp.bind(this);
    this.updateRequest = this.updateRequest.bind(this);
    this.dateSort = this.dateSort.bind(this);
    this.getValues = this.getValues.bind(this);
  }

  async setUp(filter) {
    let attributes = await fetchEntityInfo();
    attributes = attributes.split('||');
    let row=[];
    for(let i = 0; i < attributes.length; i += 8) {
      if(filter === 'All' || filter === attributes[i + 7]) {
        row.push({
          id: attributes[i],
          name: attributes[i + 1],
          address: attributes[i + 2],
          phoneNumber: attributes[i + 3],
          date: attributes[i + 4],
          storeId: attributes[i + 5],
          storeName: attributes[i + 6],
          status: attributes[i + 7]
        });
      }
    }
    let attributeData=[];
    for(let i = 0; i < this.state.rowData.length; i++) {
      attributeData.push(this.state.rowData[i].status);
    }
    this.setState({rowData: row,
      columnDefs: [
        {headerName: "Date", field: "date", width: 90, sortable: true, comparator: this.dateSort, sortingOrder: ['desc', 'asc'], sort: 'desc'},
        {headerName: "ID", field: "id", width: 300},
        {headerName: "Name", field: "name", filter: true},
        {headerName: "Address", field: "address", width: 300},
        {headerName: "Phone Number", field: "phoneNumber", width: 140},
        {headerName: "Store ID", field: "storeId", width: 110},
        {headerName: "Store Name", field: "storeName"},
        {headerName: "Status", field: "status", width: 90},
        {
          headerName: "Actions", field: "actions", cellRendererFramework: ButtonCellRenderer, cellRendererParams: {handleClick: this.updateRequest}, width: 150
        }
      ]});
  }

  getValues() {
    return ['Accepted', 'Declined', 'Pending'];
  }

  dateSort(valueA, valueB) {
    let yearA = valueA.substring(6,8);
    let monthA = valueA.substring(0,2);
    let dayA = valueA.substring(3,5);
    let yearB = valueB.substring(6,8);
    let monthB = valueB.substring(0,2);
    let dayB = valueB.substring(3,5);

    if(yearA < yearB){
      return -1;
    }
    if(yearA > yearB){
      return 1;
    }
    if(monthA < monthB){
      return -1;
    }
    if(monthA > monthB){
      return 1;
    }
    if(dayA < dayB){
      return -1;
    }
    if(dayA > dayB){
      return 1;
    }
    return 0;
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
    await postEntityInfo(id, newStatus);
  }


  render() {
    return (
        <div>
          <div style={{width:'170px', height: '50px'}}>
            <GridDropdown style={{fontSize:'10px'}} onChange={this.setUp}/>
          </div>
          <div
              className="ag-theme-balham"
              style={{
                height: '500px',
                width: '1580px'
              }}
          >
            <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}>
            </AgGridReact>
          </div>
        </div>
    );
  }
}

class GridDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value:''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.value);
    this.setState({value: e.value});
  }

  render() {
    const options = ['Pending', 'Accepted', 'Declined', 'All'];
    //const defaultOption = options[0];

    return <Dropdown options={options} onChange={this.handleChange} value={this.state.value} placeholder="Filter by"/>
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