"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect} from 'chai';
import BasecallingInsertForm from '../components/forms/facilityData/BasecallingsInsertForm';


const wrapper = shallow(
    <Provider store={store}>
        <BasecallingInsertForm/>
    </Provider>
);

describe('(Component) BasecallingInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
