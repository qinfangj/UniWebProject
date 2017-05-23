"use strict";
import React from 'react';
import UserData from '../pages/UserData';
import SamplesBatchSubmission from '../userData/SamplesBatchSubmission';


export class UserDataPage extends React.PureComponent {
    render() {
        return (
            <div>
                <UserData title="New submission" content={<SamplesBatchSubmission/>} />
            </div>
        );
    }
}

