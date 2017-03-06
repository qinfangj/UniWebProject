"use strict";
import React from 'react';

import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import AlignmentsInsertForm from '../components/forms/facilityData/AlignmentsInsertForm';


const wrapper = shallow(<AlignmentsInsertForm/>);
describe('(Component) AlignmentsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
