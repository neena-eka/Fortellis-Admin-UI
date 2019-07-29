import React from 'react';
import {DealershipListDisplay} from './DealershipListDisplay';

function DealershipListApp(props) {
    return (
        <div className="DealershipListApp">
            <header className="DealershipListApp-header">
                <DealershipListDisplay url={props.match.url} />
            </header>
        </div>
    )
}
export default DealershipListApp;