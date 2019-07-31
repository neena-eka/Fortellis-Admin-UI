import React from "react";
import {Button} from "react-bootstrap"

export const ButtonCellRenderer = (props) => {
    const handleClick = (newStatus) => {
        props.colDef.cellRendererParams.handleClick(props.data.id, newStatus);
    }
    if (!props.data.status)
        return null;
    let status = props.data.status;
    if (status === 'Accepted') {
        return <Button className="action-button" onClick={() => handleClick('Declined')}>Remove Access</Button>;
    }
    if (status === 'Declined') {
        return (
            <div>
                <Button className="action-button" onClick={() => handleClick('Pending')}>Mark Pending</Button>
                <Button className="action-button"
                        hidden>https://4.bp.blogspot.com/-7kbrqnXfuLk/WqR6bZg882I/AAAAAAAAAkM/0vvnQrIZAwk9ijiTvfF8m5pWpBSJsKuFQCLcBGAs/s1600/Screen%2BShot%2B2018-03-10%2Bat%2B7.37.12%2BPM.png</Button>
            </div>
        );
    }
    if (status === 'Pending') {
        return (
            <div>
                <Button className="action-button" onClick={() => handleClick('Accepted')}>Accept</Button>
                <Button className="action-button" onClick={() => handleClick('Declined')}>Decline</Button>
            </div>
        );
    }
    return <button>Fail :(</button>;
}