import React from "react";

export const ButtonCellRenderer = (props) => {
    const handleClick = (newStatus) => {
        props.colDef.cellRendererParams.handleClick(props.data.id, newStatus);
    }
    if(!props.data.status)
        return null;
    let status = props.data.status;
    if(status === 'Accepted'){
        return <button onClick={() => handleClick('Declined')}>Remove Access</button>;
    }
    if(status === 'Declined'){
        return(
        <div>
            <button onClick={() => handleClick('Pending')}>Mark Pending</button>
            <button hidden={true}>https://4.bp.blogspot.com/-7kbrqnXfuLk/WqR6bZg882I/AAAAAAAAAkM/0vvnQrIZAwk9ijiTvfF8m5pWpBSJsKuFQCLcBGAs/s1600/Screen%2BShot%2B2018-03-10%2Bat%2B7.37.12%2BPM.png</button>
        </div>
        );
    }
    if(status === 'Pending') {
        return (
            <div>
                <button onClick={() => handleClick('Accepted')}>Accept</button>
                <button onClick={() => handleClick('Declined')}>Decline</button>
            </div>
        );
    }
    return <button>Fail :(</button>;
}