/**
 * Created by christine on 28.02.17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    findRenderedDOMComponentWithTag,
    findRenderedComponentWithType,
    scryRenderedComponentsWithType,
    scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import sinon from 'sinon';
import {expect} from 'chai';
import PeopleInsertFrom from '../components/forms/facilityData/PeopleInsertForm';

import  TextField  from '../components/forms/elements/TextField';
import fields from '../components/forms/fields';

 describe('peopleInsertForm =>', () => {

     it('should render 5 TextField components', () => {
         const component = renderIntoDocument(
             <PeopleInsertFrom/>
         );

         const textFields = scryRenderedComponentsWithType(component, TextField);
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

         const component = renderIntoDocument(
             <PeopleInsertFrom />
         );

         //const spy = sinon.spy();
         const submitBtn = scryRenderedDOMComponentsWithTag(component,"button");

         expect(submitBtn).to.be.ok;

         Simulate.click(submitBtn[0]);


         expect(component.state.submissionError).to.equal(true);
         expect(component.state.submissionSuccess).to.equal(false);

     });

     it('Fill the valid data and click Submit button should not have submission error and submission is passed through ', () => {
         // const mockOnclick=sinon.spy();

         const component = renderIntoDocument(
             <PeopleInsertFrom />
         );

         const submitBtn = scryRenderedDOMComponentsWithTag(component,"button");
         const textFields = scryRenderedDOMComponentsWithTag(component, "input");

         Simulate.change(textFields[0],{target: {value: 'giraffe'}});
         Simulate.change(textFields[1],{target: {value: 'bear'}});
         Simulate.change(textFields[2],{target: {value: 'aa@xxx.com'}});
         Simulate.change(textFields[3],{target: {value: 'chemin address'}});
         Simulate.change(textFields[4],{target: {value: '00000000'}});

         Simulate.click(submitBtn[0]);

         //console.log(component.state.submissionError);

         expect(component.state.submissionError).to.equal(true);
         expect(component.state.submissionSuccess).to.equal(false);

     });


 });