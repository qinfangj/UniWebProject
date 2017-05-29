"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect} from 'chai';
import UserRequestsInsertForm from '../components/forms/facilityData/UserRequestsInsertForm';


const wrapper = shallow(
    <Provider store={store}>
        <UserRequestsInsertForm/>
    </Provider>
);

describe('(Component) UserRequestsInsertForm =>', () => {

    it('renders without exploding', () => {
        expect(wrapper).to.have.length(1);
    });
});
