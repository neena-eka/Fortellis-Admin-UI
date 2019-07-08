import React from "react";

export class ButtonCellRenderer extends React.Component {
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