"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import LibrariesInsertForm from '../components/forms/facilityData/LibrariesInsertForm';


const wrapper = shallow(<LibrariesInsertForm/>);
describe('(Component) LibrariesInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
