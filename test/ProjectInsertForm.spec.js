"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import ProjectsInsertForm from '../components/forms/facilityData/ProjectsInsertForm';



const wrapper = shallow(<ProjectsInsertForm storeKey="something"/>);
describe('(Component) ProjectsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
