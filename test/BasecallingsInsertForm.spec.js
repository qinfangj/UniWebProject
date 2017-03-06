"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import BasecallingInsertForm from '../components/forms/facilityData/BasecallingsInsertForm';


const wrapper = shallow(<BasecallingInsertForm/>);
describe('(Component) BasecallingInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
