"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import GenomesInsertForm from '../components/forms/facilityData/GenomesInsertForm';


const wrapper = shallow(<GenomesInsertForm/>);
describe('(Component) GenomesInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
