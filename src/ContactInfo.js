import React from 'react';

export const ContactInfo = (props) => {
    let data = props.data;
    return (
            <div>
                {data.map(dataItem => (<div>{dataItem}<br/></div>))}
            </div>
    )
}