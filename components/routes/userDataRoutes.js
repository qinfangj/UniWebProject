"use strict";
import React from 'react';
import UserDataHome from '../pages/UserDataHome';
import UserData from '../pages/UserData';
import SamplesBatchSubmission from '../userData/SamplesBatchSubmission';
import CopyPasteArea from '../userData/CopyPasteArea';


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
                <UserData title="Batch submission of samples" content={

                    <div>
                        <CopyPasteArea/>
                        <SamplesBatchSubmission/>
                    </div>

                }/>
            </div>
        );
    }
}

