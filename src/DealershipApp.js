import React from 'react';
import './DealershipApp.css';
import {DealershipAppDisplay} from "./DealershipAppDisplay";

function DealershipApp(props) {
    let url = props.match.url.split('/');
    let name = url[url.length - 1];
    while (name.includes('-')) {
        name = name.replace('-', ' ');
    }
    for (let i = 0; i < name.length; i++) {
        if (i === 0 || name[i - 1] === ' ') {
            name = name.substring(0, i) + name.substring(i, i + 1).toUpperCase() + name.substring(i + 1);
        }
    }
    return (
        <div className="DealershipApp">
            <header className="DealershipApp-header">
                <DealershipAppDisplay nameFilter={name}/>
            </header>
        </div>
    )
}

export default DealershipApp;