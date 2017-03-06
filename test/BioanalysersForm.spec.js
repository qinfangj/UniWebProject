"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import BioanalysersInsertForm from '../components/forms/facilityData/Bioanalysers/BioanalysersInsertForm';
import BioanalysersSubForm from '../components/forms/facilityData/Bioanalysers/BioanalysersSubForm';


const wrapper1 = shallow(<BioanalysersInsertForm/>);
describe('(Component) BioanalysersInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper1).to.have.length(1);
    });
});

const wrapper2 = shallow(<BioanalysersSubForm/>);
describe('(Component) BioanalysersSubForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper2).to.have.length(1);
    });
});