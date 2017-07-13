"use strict";
import React from 'react';
import UserDataHome from '../pages/UserDataHome';
import UserData from '../pages/UserData';
import LibrariesBatchSubmission from '../userData/LibrariesBatchSubmission/LibrariesBatchSubmission';
import SamplesBatchSubmission from '../userData/SamplesBatchSubmission/SamplesBatchSubmission';
import SamplesCopyPasteArea from '../userData/SamplesBatchSubmission/CopyPasteArea';
import LibrariesCopyPasteArea from '../userData/LibrariesBatchSubmission/CopyPasteArea';
// import GetLabRunsData from '../tables/userData/GetUserDataRuns'
// import ProjectRunTable from '../tables/userData/ProjectRunTable'


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
                        <SamplesCopyPasteArea />
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
                        <LibrariesCopyPasteArea />
                        <LibrariesBatchSubmission/>
                    </div>
                }/>
            </div>
        );
    }
}

// export class LabsData extends React.PureComponent {
//     render() {
//         return (
//             <div>
//                 <UserData title="Sequences data and other files for download" content={
//                      <GetLabRunsData domain="user" table="userdataruns" dataStoreKey="labsData" />
//                 }/>
//             </div>
//         );
//     }
// }
//
// export class ProjectRunDetails extends React.PureComponent {
//     render() {
//         return (
//             <div>
//                 <UserData title="Run and Project" content={
//                     <ProjectRunTable  data={this.props.params.data} table="projectRunsDetailsx" />
//                 }/>
//             </div>
//         );
//     }
// }

// export class CollabsData extends React.PureComponent {
//     render() {
//         return (
//             <div>
//                 <UserData title="Sequences data and other files for download" content={
//                     <GetCollabRunsData />
//                 }/>
//             </div>
//         );
//     }
// }

