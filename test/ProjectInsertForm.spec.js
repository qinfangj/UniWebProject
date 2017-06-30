"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect, assert} from 'chai';
import ProjectsInsertForm from '../components/forms/facilityData/ProjectsInsertForm';



const wrapper = shallow(
    <Provider store={store}>
        <ProjectsInsertForm storeKey="something"/>
    </Provider>
);

describe('(Component) ProjectsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});

// let form = mount(
//     <Provider store={store}>
//         <ProjectsInsertForm />
//     </Provider>
// );
//
// it('should initially be invalid', () => {
//     assert.isFalse(store.getState().facilityDataForms.forms["projects"].$form.validated);
// });

