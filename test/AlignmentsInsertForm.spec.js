"use strict";
import React from 'react';

import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect} from 'chai';
import AlignmentsInsertForm from '../components/forms/facilityData/AlignmentsInsertForm';


const wrapper = shallow(
    <Provider store={store}>
        <AlignmentsInsertForm/>
    </Provider>
);

describe('(Component) AlignmentsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
