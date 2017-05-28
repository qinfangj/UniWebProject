"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import store from '../core/store';
import { Provider } from 'react-redux';
import GenomesInsertForm from '../components/forms/facilityData/GenomesInsertForm';


const wrapper = shallow(
    <Provider store={store}>
        <GenomesInsertForm/>
    </Provider>
);

describe('(Component) GenomesInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
