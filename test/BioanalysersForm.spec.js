"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';

import {expect} from 'chai';
import BioanalysersInsertForm from '../components/forms/facilityData/Bioanalysers/BioanalysersInsertForm';
import LanesSubForm from '../components/forms/facilityData/Bioanalysers/lanesSubForm';


const wrapper1 = shallow(
    <Provider store={store}>
        <BioanalysersInsertForm />
    </Provider>
);

describe('(Component) BioanalysersInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper1).to.have.length(1);
    });
});


const wrapper2 = shallow(
    <Provider store={store}>
        <LanesSubForm/>
    </Provider>
);

describe('(Component) BioanalysersSubForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper2).to.have.length(1);
    });
});
