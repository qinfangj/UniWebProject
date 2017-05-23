"use strict";
import React from 'react';
import UserDataHome from '../pages/UserDataHome';
import UserData from '../pages/UserData';
import SamplesBatchSubmission from '../userData/SamplesBatchSubmission';


export class UserDataHomePage extends React.PureComponent {
    render() {
        return (
            <div>
                <UserDataHome />
            </div>
        );
    }
}


export class UserDataPage extends React.PureComponent {
    render() {
        return (
            <div>
                <UserData title="New submission" content={<SamplesBatchSubmission/>} />
            </div>
        );
    }
}

