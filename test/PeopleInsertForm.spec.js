/**
 * Created by christine on 28.02.17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import { expect, assert } from 'chai';
import PeopleInsertFrom from '../components/forms/facilityData/PeopleInsertForm';
import peopleModel from '../components/forms/facilityData/formModels/peopleModel';
import TestUtils from 'react-addons-test-utils'



const wrapper = shallow(
    <Provider store={store}>
        <PeopleInsertFrom />
    </Provider>
);

describe('(Component) peopleInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });

    let form = mount(
        <Provider store={store}>
            <PeopleInsertFrom />
        </Provider>
    );

    it('should initially be invalid', () => {
        assert.isFalse(store.getState().facilityDataForms.forms["people"].$form.validated);
    });

    it('should still be invalid after only all fields made valid', () => {
        peopleModel.fields.forEach((model) => {
            let modelName = model.name;
            form.find('#' + modelName).node.value = 'aaa';
            form.find('#' + modelName).simulate('change', form.find('#' + modelName));
            assert.isTrue(store.getState().facilityDataForms.forms["people"][modelName].valid);
        });
        assert.isTrue(store.getState().facilityDataForms.forms["people"].$form.valid);

    });

    /*it('should render 5 TextField components', () => {

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

     });*/

});




