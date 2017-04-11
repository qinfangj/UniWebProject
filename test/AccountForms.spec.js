"use strict";
import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {expect} from 'chai';
import AccountData from '../components/pages/AccountData';
import AccountTable from '../components/tables/account/AccountTable';


const wrapper1 = shallow(
    <AccountData title="Account" name="account" content={<AccountTable />} />
);




