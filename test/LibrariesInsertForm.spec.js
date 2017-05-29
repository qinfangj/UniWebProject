"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect} from 'chai';
import LibrariesInsertForm from '../components/forms/facilityData/LibrariesInsertForm';


const wrapper = shallow(
    <Provider store={store}>
        <LibrariesInsertForm/>
    </Provider>
);

describe('(Component) LibrariesInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
