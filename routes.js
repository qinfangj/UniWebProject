"use strict";
import React from 'react';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

import App from './components/routes/App';
import HomePage from './components/routes/HomePage';
import * as tracking from './components/routes/trackingRoutes';
import * as userdata from './components/routes/userDataRoutes';
import * as fdata from './components/routes/facilityDataRoutes';
import * as qprojects from './components/routes/queryProjectsRoutes';
import * as login from './components/routes/loginRoutes';
import * as admin from './components/routes/adminRoutes';
import * as account from './components/routes/accountRoutes';
import AuthService from './utils/AuthService';


// Fires on any route change.
const onRouteChange = (nextRouterState, replace) => {
};

// Validate authentication for private routes
const requireAuth = (nextRouterState, replace) => {
    onRouteChange(nextRouterState, replace);
    if (!AuthService.isLoggedIn) {
        replace({ pathname: '/login' });
    }
};


const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} onEnter={onRouteChange}/>
            <Route path="home" component={HomePage} onEnter={onRouteChange}/>

            <Route path="login" component={login.LoginPage} onEnter={onRouteChange}/>
            <Route path="signup" component={login.SignupPage} onEnter={onRouteChange}/>
            <Route path="forgotPassword" component={login.ForgotPasswordPage} onEnter={onRouteChange}/>
            <Route path="changePassword" component={login.ChangePasswordPage} onEnter={onRouteChange}/>

            <Route path="account" component={account.AccountPage} onEnter={requireAuth} />

            {/* FACILITY DATA */}

            <Route path="facility" component={fdata.FacilityDataRoute} onEnter={requireAuth} />

            <Route path="facility/projects" component={fdata.ProjectsListRoute} onEnter={requireAuth} />
            <Route path="facility/projects/list" component={fdata.ProjectsListRoute} onEnter={requireAuth} />
            <Route path="facility/projects/active" component={fdata.ProjectsActiveRoute} onEnter={requireAuth} />
            <Route path="facility/projects/new" component={fdata.ProjectsNewRoute} onEnter={requireAuth} />
            <Route path="facility/projects/update/:id" component={fdata.ProjectsUpdateRoute} onEnter={requireAuth} />

            <Route path="facility/people" component={fdata.PeopleListRoute} onEnter={requireAuth} />
            <Route path="facility/people/list" component={fdata.PeopleListRoute} onEnter={requireAuth} />
            <Route path="facility/people/active" component={fdata.PeopleActiveRoute} onEnter={requireAuth} />
            <Route path="facility/people/new" component={fdata.PeopleNewRoute} onEnter={requireAuth} />
            <Route path="facility/people/update/:id" component={fdata.PeopleUpdateRoute} onEnter={requireAuth} />

            <Route path="facility/genomes" component={fdata.GenomesListRoute} onEnter={requireAuth} />
            <Route path="facility/genomes/list" component={fdata.GenomesListRoute} onEnter={requireAuth} />
            <Route path="facility/genomes/active" component={fdata.GenomesActiveRoute} onEnter={requireAuth} />
            <Route path="facility/genomes/new" component={fdata.GenomesNewRoute} onEnter={requireAuth} />
            <Route path="facility/genomes/update/:id" component={fdata.GenomesUpdateRoute} onEnter={requireAuth} />

            <Route path="facility/samples" component={fdata.SamplesListRoute} onEnter={requireAuth} />
            <Route path="facility/samples/list" component={fdata.SamplesListRoute} onEnter={requireAuth} />
            <Route path="facility/samples/active" component={fdata.SamplesActiveRoute} onEnter={requireAuth} />
            <Route path="facility/samples/new" component={fdata.SamplesNewRoute} onEnter={requireAuth} />
            <Route path="facility/samples/update/:id" component={fdata.SamplesUpdateRoute} onEnter={requireAuth} />

            <Route path="facility/libraries" component={fdata.LibrariesListRoute} onEnter={requireAuth} />
            <Route path="facility/libraries/list" component={fdata.LibrariesListRoute} onEnter={requireAuth} />
            <Route path="facility/libraries/active" component={fdata.LibrariesActiveRoute} onEnter={requireAuth} />
            <Route path="facility/libraries/new" component={fdata.LibrariesNewRoute} onEnter={requireAuth} />
            <Route path="facility/libraries/update/:id" component={fdata.LibrariesUpdateRoute} onEnter={requireAuth} />

            <Route path="facility/runs" component={fdata.RunsListRoute} onEnter={requireAuth} />
            <Route path="facility/runs/list" component={fdata.RunsListRoute} onEnter={requireAuth} />
            <Route path="facility/runs/active" component={fdata.RunsActiveRoute} onEnter={requireAuth} />
            <Route path="facility/runs/new" component={fdata.RunsNewRoute} onEnter={requireAuth} />
            <Route path="facility/runs/from-tracking" component={fdata.RunsFromTrackingRoute} onEnter={requireAuth} />
            <Route path="facility/runs/update/:id" component={fdata.RunsUpdateRoute} onEnter={requireAuth} />

            <Route path="facility/user_requests" component={fdata.UserRequestsListRoute} onEnter={requireAuth} />
            <Route path="facility/user_requests/list" component={fdata.UserRequestsListRoute} onEnter={requireAuth} />
            <Route path="facility/user_requests/active" component={fdata.UserRequestsActiveRoute} onEnter={requireAuth} />
            <Route path="facility/user_requests/new" component={fdata.UserRequestsNewRoute} onEnter={requireAuth} />
            <Route path="facility/user_requests/update/:id" component={fdata.UserRequestsUpdateRoute} onEnter={requireAuth} />

            <Route path="facility/bioanalysers" component={fdata.BioanalysersListRoute} onEnter={requireAuth} />
            <Route path="facility/bioanalysers/list" component={fdata.BioanalysersListRoute} onEnter={requireAuth} />
            <Route path="facility/bioanalysers/active" component={fdata.BioanalysersActiveRoute} onEnter={requireAuth} />
            <Route path="facility/bioanalysers/new" component={fdata.BioanalysersNewRoute} onEnter={requireAuth} />
            <Route path="facility/bioanalysers/update/:id" component={fdata.BioanalysersUpdateRoute} onEnter={requireAuth} />

            <Route path="facility/basecallings" component={fdata.BasecallingsListRoute} onEnter={requireAuth} />
            <Route path="facility/basecallings/list" component={fdata.BasecallingsListRoute} onEnter={requireAuth} />
            <Route path="facility/basecallings/active" component={fdata.BasecallingsActiveRoute} onEnter={requireAuth} />
            <Route path="facility/basecallings/new" component={fdata.BasecallingsNewRoute} onEnter={requireAuth} />
            <Route path="facility/basecallings/update/:id" component={fdata.BasecallingsUpdateRoute} onEnter={requireAuth} />

            <Route path="facility/alignments" component={fdata.AlignmentsListRoute} onEnter={requireAuth} />
            <Route path="facility/alignments/list" component={fdata.AlignmentsListRoute} onEnter={requireAuth} />
            <Route path="facility/alignments/active" component={fdata.AlignmentsActiveRoute} onEnter={requireAuth} />
            <Route path="facility/alignments/new" component={fdata.AlignmentsNewRoute} onEnter={requireAuth} />
            <Route path="facility/alignments/update/:id" component={fdata.AlignmentsUpdateRoute} onEnter={requireAuth} />

            {/* TRACKING */}

            <Redirect from="tracking" to="tracking/samples" />
            <Route path="tracking/samples" component={tracking.trackingSamples} onEnter={requireAuth} />
            <Route path="tracking/libraries" component={tracking.trackingLibraries} onEnter={requireAuth} />
            <Route path="tracking/runs" component={tracking.trackingRuns} onEnter={requireAuth} />

            {/* USER DATA */}

            <Route path="user" component={userdata.UserDataHomePage} onEnter={requireAuth} />
            <Route path="user/batch/samples" component={userdata.BatchSamples} onEnter={requireAuth} />
            <Route path="user/batch/libraries" component={userdata.BatchLibraries} onEnter={requireAuth} />

            <Route path="user/view/labsamples" component={userdata.BatchLibraries} onEnter={requireAuth} />
            <Route path="user/view/colsamples" component={userdata.BatchLibraries} onEnter={requireAuth} />
            <Route path="user/data/labsdata" component={userdata.UserDataHomePage} onEnter={requireAuth} />
            {/*<Route path="user/data/labsdata" component={userdata.LabsData} onEnter={requireAuth} />*/}
            {/*<Route path="user/data/labsdata/:data" component={userdata.ProjectRunDetails} onEnter={requireAuth} />*/}
            {/*<Route path="user/data/collabsdata" component={userdata.CollabsData} onEnter={requireAuth} />*/}

            {/* QUERY PROJECTS */}

            <Redirect from="projects" to="projects/starting_material" />
            <Route path="projects/starting_material" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/user_request" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/library" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/sequencing_details" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/sample_sheets" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/ivc_plots" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/demultiplexing" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/alignments" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />

            {/* QUERY RUNS */}

            <Redirect from="runs" to="runs/starting_material" />
            <Route path="runs/starting_material" component={qprojects.QueryRunsRoute} onEnter={requireAuth} />
            <Route path="runs/user_request" component={qprojects.QueryRunsRoute} onEnter={requireAuth} />
            <Route path="runs/library" component={qprojects.QueryRunsRoute} onEnter={requireAuth} />
            <Route path="runs/sequencing_details" component={qprojects.QueryRunsRoute} onEnter={requireAuth} />
            <Route path="runs/sample_sheets" component={qprojects.QueryRunsRoute} onEnter={requireAuth} />
            {/*<Route path="projects/ivc" component={qprojects.QueryRunsRoute} onEnter={requireAuth} />*/}
            <Route path="runs/demultiplexing" component={qprojects.QueryRunsRoute} onEnter={requireAuth} />
            {/*<Route path="projects/alignments" component={qprojects.QueryRunsRoute} onEnter={requireAuth} />*/}

            {/* ADMIN */}

            <Route path="admin" component={admin.AdminDataPage} onEnter={requireAuth} />
            <Route path="admin/users/list" component={admin.LimsUsersListRoute} onEnter={requireAuth} />
            <Route path="admin/users/new" component={admin.LimsUsersNewPage} onEnter={requireAuth} />
            {/*<Route path="admin/users/unvalidated" component={admin.LimsUserDeletePage} onEnter={requireAuth} />*/}
            <Route path="admin/users/update/:id" component={admin.LimsUsersUpdatePage} onEnter={requireAuth} />
            <Route path="admin/project_sharings/list" component={admin.projectSharingsListRoute} onEnter={requireAuth} />
            <Route path="admin/project_sharings/new" component={admin.projectSharingsNewPage} onEnter={requireAuth} />
            <Route path="admin/project_sharings/update/:id" component={admin.projectSharingsUpdatePage} onEnter={requireAuth} />
            <Route path="admin/pipeline_analysis_types/list" component={admin.AnalysisTypeListRoute} onEnter={requireAuth} />
            <Route path="admin/pipeline_analysis_types/new" component={admin.AnalysisTypeNewPage} onEnter={requireAuth} />
            <Route path="admin/pipeline_analysis_types/update/:id" component={admin.AnalysisTypeUpdatePage} onEnter={requireAuth} />
            <Route path="admin/flowcell_types/list" component={admin.FlowcellTypesListRoute} onEnter={requireAuth} />
            <Route path="admin/flowcell_types/new" component={admin.FlowcellTypesNewPage} onEnter={requireAuth} />
            <Route path="admin/flowcell_types/update/:id" component={admin.FlowcellTypesUpdatePage} onEnter={requireAuth} />
            <Route path="admin/instruments/list" component={admin.InstrumentsListRoute} onEnter={requireAuth} />
            <Route path="admin/instruments/new" component={admin.InstrumentsNewPage} onEnter={requireAuth} />
            <Route path="admin/instruments/update/:id" component={admin.InstrumentsUpdatePage} onEnter={requireAuth} />
            <Route path="admin/library_adapters/list" component={admin.libAdaptersListRoute} onEnter={requireAuth} />
            <Route path="admin/library_adapters/new" component={admin.libAdaptersNewPage} onEnter={requireAuth} />
            <Route path="admin/library_adapters/update/:id" component={admin.libAdaptersUpdatePage} onEnter={requireAuth} />
            <Route path="admin/lib_protocols/list" component={admin.libProtocolsListRoute} onEnter={requireAuth} />
            <Route path="admin/lib_protocols/new" component={admin.libProtocolsNewPage} onEnter={requireAuth} />
            <Route path="admin/lib_protocols/update/:id" component={admin.libProtocolsUpdatePage} onEnter={requireAuth} />
            <Route path="admin/library_states/list" component={admin.libStatesListRoute} onEnter={requireAuth} />
            <Route path="admin/library_states/new" component={admin.libStatesNewPage} onEnter={requireAuth} />
            <Route path="admin/library_states/update/:id" component={admin.libStatesUpdatePage} onEnter={requireAuth} />
            <Route path="admin/mapping_tools/list" component={admin.mappingToolsListRoute} onEnter={requireAuth} />
            <Route path="admin/mapping_tools/new" component={admin.mappingToolsNewPage} onEnter={requireAuth} />
            <Route path="admin/mapping_tools/update/:id" component={admin.mappingToolsUpdatePage} onEnter={requireAuth} />
            <Route path="admin/multiplex_indexes/list" component={admin.multiplexIndexesListRoute} onEnter={requireAuth} />
            <Route path="admin/multiplex_indexes/new" component={admin.multiplexIndexesNewPage} onEnter={requireAuth} />
            <Route path="admin/multiplex_indexes/update/:id" component={admin.multiplexIndexesUpdatePage} onEnter={requireAuth} />
            <Route path="admin/pipeline_versions/list" component={admin.pipelineVersionListRoute} onEnter={requireAuth} />
            <Route path="admin/pipeline_versions/new" component={admin.pipelineVersionNewPage} onEnter={requireAuth} />
            <Route path="admin/pipeline_versions/update/:id" component={admin.pipelineVersionUpdatePage} onEnter={requireAuth} />
            <Route path="admin/project_analysis/list" component={admin.projectAnalysisListRoute} onEnter={requireAuth} />
            <Route path="admin/project_analysis/new" component={admin.projectAnalysisNewPage} onEnter={requireAuth} />
            <Route path="admin/project_analysis/update/:id" component={admin.projectAnalysisUpdatePage} onEnter={requireAuth} />
            <Route path="admin/project_states/list" component={admin.projectStatesListRoute} onEnter={requireAuth} />
            <Route path="admin/project_states/new" component={admin.projectStatesNewPage} onEnter={requireAuth} />
            <Route path="admin/project_states/update/:id" component={admin.projectStatesUpdatePage} onEnter={requireAuth} />
            <Route path="admin/quantif_methods/list" component={admin.quantifMethodsListRoute} onEnter={requireAuth} />
            <Route path="admin/quantif_methods/new" component={admin.quantifMethodsNewPage} onEnter={requireAuth} />
            <Route path="admin/quantif_methods/update/:id" component={admin.quantifMethodsUpdatePage} onEnter={requireAuth} />
            <Route path="admin/read_lengths/list" component={admin.readLengthsListRoute} onEnter={requireAuth} />
            <Route path="admin/read_lengths/new" component={admin.readLengthsNewPage} onEnter={requireAuth} />
            <Route path="admin/read_lengths/update/:id" component={admin.readLengthsUpdatePage} onEnter={requireAuth} />
            <Route path="admin/run_types/list" component={admin.runTypesListRoute} onEnter={requireAuth} />
            <Route path="admin/run_types/new" component={admin.runTypesNewPage} onEnter={requireAuth} />
            <Route path="admin/run_types/update/:id" component={admin.runTypesUpdatePage} onEnter={requireAuth} />
            <Route path="admin/run_types_lengths/list" component={admin.runTypesLengthsListRoute} onEnter={requireAuth} />
            <Route path="admin/run_types_lengths/new" component={admin.runTypesLengthsNewPage} onEnter={requireAuth} />
            <Route path="admin/run_types_lengths/update/:id" component={admin.runTypesLengthsUpdatePage} onEnter={requireAuth} />
            <Route path="admin/sample_types/list" component={admin.sampleTypesListRoute} onEnter={requireAuth} />
            <Route path="admin/sample_types/new" component={admin.sampleTypesNewPage} onEnter={requireAuth} />
            <Route path="admin/sample_types/update/:id" component={admin.samplesTypesUpdatePage} onEnter={requireAuth} />
            <Route path="admin/sequencing_kit_versions/list" component={admin.seqKitVersionListRoute} onEnter={requireAuth} />
            <Route path="admin/sequencing_kit_versions/new" component={admin.seqKitVersionNewPage} onEnter={requireAuth} />
            <Route path="admin/sequencing_kit_versions/update/:id" component={admin.seqKitVersionUpdatePage} onEnter={requireAuth} />
            <Route path="admin/sequencing_qualities/list" component={admin.seqQualitiesListRoute} onEnter={requireAuth} />
            <Route path="admin/sequencing_qualities/new" component={admin.seqQualitiesNewPage} onEnter={requireAuth} />
            <Route path="admin/sequencing_qualities/update/:id" component={admin.seqQualitiesUpdatePage} onEnter={requireAuth} />
            <Route path="admin/taxonomies/list" component={admin.taxonomiesListRoute} onEnter={requireAuth} />
            <Route path="admin/taxonomies/new" component={admin.taxonomiesNewPage} onEnter={requireAuth} />
            <Route path="admin/taxonomies/update/:id" component={admin.taxonomiesUpdatePage} onEnter={requireAuth} />

        </Route>
    </Router>
);


export default routes;