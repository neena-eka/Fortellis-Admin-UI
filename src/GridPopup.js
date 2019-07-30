import React from 'react';
import Popup from 'reactjs-popup';

export const GridPopup = (props) => {
    let data = props.data;
    return (
        <Popup trigger={<button id="popup-button" hidden>Trigger</button>} modal>
            <div>
                {data.map(dataItem => (<div>{dataItem}<br/></div>))}
            </div>
        </Popup>
    )
}