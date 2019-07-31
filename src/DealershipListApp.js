import React from 'react';
import {DealershipListDisplay} from './DealershipListDisplay';
import {fetchEntityInfo} from "./entityInfoAPIAccessor";
import './DealershipListApp.css';

class DealershipListApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dealershipNameData: []};
        this.fetchNameInfo = this.fetchNameInfo.bind(this);
    }

    async fetchNameInfo() {
        let attributes = await fetchEntityInfo();
        let names = [];
        let urlNames = [];
        let dealershipNameData = [];
        let dealershipName = '';
        let urlName = '';
        let item;
        for (let i = 0; i < attributes.items.length; i++) {
            item = attributes.items[i];
            dealershipName = item.name.s;
            if (!names.includes(dealershipName)) {
                names.push(dealershipName);
                urlName = '/' + dealershipName.toLowerCase();
                while (urlName.includes(' ')) {
                    urlName = urlName.replace(' ', '-');
                }
                urlNames.push(urlName);
            }
        }
        for (let i = 0; i < names.length; i++) {
            dealershipNameData.push(urlNames[i] + '||' + names[i]);
        }
        if (dealershipNameData.length === 0) {
            dealershipNameData.push('/No dealerships to display')
        }
        this.setState({dealershipNameData: dealershipNameData.sort()});
    }

    render() {
        this.fetchNameInfo();
        return (
            <div className="DealershipListApp">
                <header className="DealershipListApp-header">
                    <DealershipListDisplay dealershipNameData={this.state.dealershipNameData}/>
                </header>
            </div>
        )
    }
}

export default DealershipListApp;