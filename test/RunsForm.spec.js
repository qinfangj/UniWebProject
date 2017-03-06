"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import RunsInsertForm from '../components/forms/facilityData/Runs/RunsInsertForm';
import RunsPreInsertForm from '../components/forms/facilityData/Runs/RunsPreInsertForm';
import RunsSubForm from '../components/forms/facilityData/Runs/RunsSubForm';


const wrapper1 = shallow(<RunsInsertForm/>);
describe('(Component) RunsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper1).to.have.length(1);
    });
});

const wrapper2 = shallow(<RunsPreInsertForm/>);
describe('(Component) RunsPreInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper2).to.have.length(1);
    });
});

const wrapper3 = shallow(<RunsSubForm/>);
describe('(Component) RunsSubForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper3).to.have.length(1);
    });
});