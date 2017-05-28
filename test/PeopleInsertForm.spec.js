/**
 * Created by christine on 28.02.17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect} from 'chai';
import PeopleInsertFrom from '../components/forms/facilityData/PeopleInsertForm';



const wrapper = shallow(
    <Provider store={store}>
        <PeopleInsertFrom/>
    </Provider>
);

describe('peopleInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});

/*
    it('should render 5 TextField components', () => {

        const textFields = scryRenderedComponentsWithType(wrapper, TextField);
        expect(textFields.length).to.equal(5);
        const textField1 = ReactDOM.findDOMNode(textFields[0]).textContent;
        const textField2 = ReactDOM.findDOMNode(textFields[1]).textContent;
        const textField3 = ReactDOM.findDOMNode(textFields[2]).textContent;
        const textField4 = ReactDOM.findDOMNode(textFields[3]).textContent;
        const textField5 = ReactDOM.findDOMNode(textFields[4]).textContent;

        expect(textField1).to.equal('PI first name  *');
        expect(textField2).to.equal('PI last name  *');
        expect(textField3).to.equal('PI email  *');
        expect(textField4).to.equal('PI address  *');
        expect(textField5).to.equal('PI phone  *');

    });

    it('Clik Submit button only should have submission error and submission is not passed through ', () => {
        // const mockOnclick=sinon.spy();

        const wrapper = renderIntoDocument(
            <Provider store={store}>
                <PeopleInsertFrom/>
            </Provider>
        );

        //const spy = sinon.spy();
        const submitBtn = scryRenderedDOMComponentsWithTag(wrapper,"button");

        expect(submitBtn).to.be.ok;

        Simulate.click(submitBtn[0]);

    });
*/

