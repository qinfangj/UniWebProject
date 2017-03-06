"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import SamplesInsertForm from '../components/forms/facilityData/SamplesInsertForm';


const wrapper = shallow(<SamplesInsertForm/>);
describe('(Component) SamplesInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
