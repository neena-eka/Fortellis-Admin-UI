import React from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

export class GridDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.value);
        this.setState({value: e.value});
    }

    render() {
        const options = ['Pending', 'Accepted', 'Declined', 'All'];
        return <Dropdown className="GridDropdown" options={options} onChange={this.handleChange}
                         value={this.state.value} placeholder="Pending"/>
    }
}