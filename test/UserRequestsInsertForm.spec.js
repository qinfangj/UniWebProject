"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import UserRequestsInsertForm from '../components/forms/facilityData/UserRequestsInsertForm';


const wrapper = shallow(<UserRequestsInsertForm/>);
describe('(Component) UserRequestsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
