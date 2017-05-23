"use strict";
import React from 'react';
import AccountData from '../../pages/AccountData';
import AccountTable from '../../tables/account/AccountTable';

export class AccountPage extends React.Component {

    render() {
        return (
            <AccountData title="Account" content={<AccountTable />}/>
            // <div>Account page in construction</div>
        );
    }

}