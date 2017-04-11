"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import QueryProjectsForm from '../components/forms/queryProjects/QueryProjectsForm';
import store from '../core/store';
import { Provider } from 'react-redux';



const wrapper = shallow(
    <Provider store={store}>
        <QueryProjectsForm/>
    </Provider>
);

describe('(Component) QueryProjectsForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
