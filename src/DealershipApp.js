import React from 'react';
import './DealershipApp.css';

function DealershipApp(props) {
    return (
        <div className="DealershipApp">
            <header className="DealershipApp-header">
                <p>Hi {props.match.params.name} {window.location.pathname}</p>
            </header>
        </div>
    )
}
export default DealershipApp;