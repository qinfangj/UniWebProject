"use strict";
import React from 'react';
import UserDataHome from '../pages/UserDataHome';
import UserData from '../pages/UserData';
import LibrariesBatchSubmission from '../userData/LibrariesBatchSubmission/LibrariesBatchSubmission';
import SamplesBatchSubmission from '../userData/SamplesBatchSubmission/SamplesBatchSubmission';
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

export class BatchSamples extends React.PureComponent {
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

export class BatchLibraries extends React.PureComponent {
    render() {
        return (
            <div>
                <UserData title="Batch submission of libraries" content={
                    <div>
                        <CopyPasteArea/>
                        <LibrariesBatchSubmission/>
                    </div>
                }/>
            </div>
        );
    }
}

