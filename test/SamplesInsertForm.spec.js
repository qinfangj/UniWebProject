"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect} from 'chai';
import SamplesInsertForm from '../components/forms/facilityData/SamplesInsertForm';


const wrapper = shallow(
    <Provider store={store}>
        <SamplesInsertForm/>
    </Provider>
);

describe('(Component) SamplesInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
