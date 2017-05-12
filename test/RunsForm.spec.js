"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import RunsInsertForm from '../components/forms/facilityData/Runs/RunsInsertFormRedux';


const wrapper1 = shallow(<RunsInsertForm/>);
describe('(Component) RunsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper1).to.have.length(1);
    });
});
