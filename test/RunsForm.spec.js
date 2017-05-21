"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';

import {expect} from 'chai';
import RunsInsertForm from '../components/forms/facilityData/Runs/RunsInsertForm';


const wrapper1 = shallow(
    <Provider store={store}>
        <RunsInsertForm/>
    </Provider>
);
describe('(Component) RunsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper1).to.have.length(1);
    });
});
