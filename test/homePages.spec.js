"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import store from '../core/store';
import { Provider } from 'react-redux';
import {expect} from 'chai';

//import HomePage from '../components/routes/HomePage';
import FacilityDataHome from '../components/pages/FacilityDataHome';
import AdminDataHome from '../components/pages/AdminDataHome';
import UserDataHome from '../components/pages/UserDataHome';

// const wrapper1 = shallow(
//     <Provider store={store}>
//         <HomePage />
//     </Provider>
// );
//
// describe('(HomePage) HomePage =>', () => {
//
//     it('renders without exploding', () => {
//         expect(wrapper1).to.have.length(1);
//     });
// });

const wrapper2 = shallow(
        <FacilityDataHome />
);

describe('(HomePages) FacilityDataHome =>', () => {

    it('renders without exploding', () => {
        expect(wrapper2).to.have.length(1);
    });
});

const wrapper3 = shallow(
    <AdminDataHome />
);

describe('(HomePages) AdminDataHome =>', () => {

    it('renders without exploding', () => {
        expect(wrapper3).to.have.length(1);
    });
});

const wrapper4 = shallow(
    <UserDataHome />
);

describe('(HomePages) UserDataHome =>', () => {

    it('renders without exploding', () => {
        expect(wrapper4).to.have.length(1);
    });
});

