import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("<App />", () => {
    const INPUT_TEXT = "Look at this test, isn't this neat";
    const event = {target: {value: INPUT_TEXT}};

    describe("Snapshot Tests", () => {
        const wrapper = mount(<App/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})