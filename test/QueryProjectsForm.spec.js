"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import QueryProjectsForm from '../components/forms/queryProjects/QueryProjectsForm';



const wrapper = shallow(<QueryProjectsForm/>);
describe('(Component) QueryProjectsForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
