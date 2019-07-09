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
            return <button hidden={true}>https://4.bp.blogspot.com/-7kbrqnXfuLk/WqR6bZg882I/AAAAAAAAAkM/0vvnQrIZAwk9ijiTvfF8m5pWpBSJsKuFQCLcBGAs/s1600/Screen%2BShot%2B2018-03-10%2Bat%2B7.37.12%2BPM.png</button>;
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