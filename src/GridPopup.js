import React from 'react';
import Popup from 'reactjs-popup';

export const GridPopup = (props) => {
    let data = props.data;
    return (
        <Popup trigger={<button id="popup-button" hidden>Trigger</button>} modal>
            <div>{data[0]}<br/>{data[1]}<br/>{data[2]}<br/>{data[3]}<br/>{data[4]}<br/>{data[5]}</div>
        </Popup>
    )
}