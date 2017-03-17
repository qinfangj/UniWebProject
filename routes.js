"use strict";
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/routes/App';
import HomePage from './components/routes/HomePage';
import * as fdata from './components/routes/facilityData/facilityDataRoutes';
import * as qprojects from './components/routes/queryProjects/queryProjectsRoutes';
import * as login from './components/routes/login/loginRoutes';
import * as admin from './components/routes/admin/adminRoutes';
import * as account from './components/routes/account/accountRoutes';
import AuthService from './utils/AuthService';


// Validate authentication for private routes
const requireAuth = (nextRouterState, replace) => {
    if (!AuthService.isLoggedIn) {
        replace({ pathname: '/login' });
    }
};


const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="home" component={HomePage}/>

            <Route path="login" component={login.LoginPage}/>
            <Route path="signup" component={login.SignupPage}/>
            <Route path="forgotPassword" component={login.ForgotPasswordPage}/>
            <Route path="changePassword" component={login.ChangePasswordPage}/>

            <Route path="account" component={account.AccountPage} onEnter={requireAuth} />

            {/* FACILITY DATA */}

            <Route path="data" component={fdata.FacilityDataRoute} onEnter={requireAuth} />

            <Route path="data/projects" component={fdata.ProjectsListRoute} onEnter={requireAuth} />
            <Route path="data/projects/list" component={fdata.ProjectsListRoute} onEnter={requireAuth} />
            <Route path="data/projects/active" component={fdata.ProjectsActiveRoute} onEnter={requireAuth} />
            <Route path="data/projects/new" component={fdata.ProjectsNewRoute} onEnter={requireAuth} />
            <Route path="data/projects/update/:id" component={fdata.ProjectsUpdateRoute} onEnter={requireAuth} />

            <Route path="data/people" component={fdata.PeopleListRoute} onEnter={requireAuth} />
            <Route path="data/people/list" component={fdata.PeopleListRoute} onEnter={requireAuth} />
            <Route path="data/people/active" component={fdata.PeopleActiveRoute} onEnter={requireAuth} />
            <Route path="data/people/new" component={fdata.PeopleNewRoute} onEnter={requireAuth} />
            <Route path="data/people/update/:id" component={fdata.PeopleUpdateRoute} onEnter={requireAuth} />

            <Route path="data/genomes" component={fdata.GenomesListRoute} onEnter={requireAuth} />
            <Route path="data/genomes/list" component={fdata.GenomesListRoute} onEnter={requireAuth} />
            <Route path="data/genomes/active" component={fdata.GenomesActiveRoute} onEnter={requireAuth} />
            <Route path="data/genomes/new" component={fdata.GenomesNewRoute} onEnter={requireAuth} />
            <Route path="data/genomes/update/:id" component={fdata.GenomesUpdateRoute} onEnter={requireAuth} />

            <Route path="data/samples" component={fdata.SamplesListRoute} onEnter={requireAuth} />
            <Route path="data/samples/list" component={fdata.SamplesListRoute} onEnter={requireAuth} />
            <Route path="data/samples/active" component={fdata.SamplesActiveRoute} onEnter={requireAuth} />
            <Route path="data/samples/new" component={fdata.SamplesNewRoute} onEnter={requireAuth} />
            <Route path="data/samples/update/:id" component={fdata.SamplesUpdateRoute} onEnter={requireAuth} />

            <Route path="data/libraries" component={fdata.LibrariesListRoute} onEnter={requireAuth} />
            <Route path="data/libraries/list" component={fdata.LibrariesListRoute} onEnter={requireAuth} />
            <Route path="data/libraries/active" component={fdata.LibrariesActiveRoute} onEnter={requireAuth} />
            <Route path="data/libraries/new" component={fdata.LibrariesNewRoute} onEnter={requireAuth} />
            <Route path="data/libraries/update/:id" component={fdata.LibrariesUpdateRoute} onEnter={requireAuth} />

            <Route path="data/runs" component={fdata.RunsListRoute} onEnter={requireAuth} />
            <Route path="data/runs/list" component={fdata.RunsListRoute} onEnter={requireAuth} />
            <Route path="data/runs/active" component={fdata.RunsActiveRoute} onEnter={requireAuth} />
            <Route path="data/runs/new" component={fdata.RunsPreNewRoute} onEnter={requireAuth} />
            <Route path="data/runs/postnew" component={fdata.RunsNewRoute} onEnter={requireAuth} />
            <Route path="data/runs/update/:id" component={fdata.RunsUpdateRoute} onEnter={requireAuth} />

            <Route path="data/user_requests" component={fdata.UserRequestsListRoute} onEnter={requireAuth} />
            <Route path="data/user_requests/list" component={fdata.UserRequestsListRoute} onEnter={requireAuth} />
            <Route path="data/user_requests/active" component={fdata.UserRequestsActiveRoute} onEnter={requireAuth} />
            <Route path="data/user_requests/new" component={fdata.UserRequestsNewRoute} onEnter={requireAuth} />
            <Route path="data/user_requests/update/:id" component={fdata.UserRequestsUpdateRoute} onEnter={requireAuth} />

            <Route path="data/bioanalysers" component={fdata.BioanalysersListRoute} onEnter={requireAuth} />
            <Route path="data/bioanalysers/list" component={fdata.BioanalysersListRoute} onEnter={requireAuth} />
            <Route path="data/bioanalysers/active" component={fdata.BioanalysersActiveRoute} onEnter={requireAuth} />
            <Route path="data/bioanalysers/new" component={fdata.BioanalysersNewRoute} onEnter={requireAuth} />
            <Route path="data/bioanalysers/update/:id" component={fdata.BioanalysersUpdateRoute} onEnter={requireAuth} />

            <Route path="data/basecallings" component={fdata.BasecallingsListRoute} onEnter={requireAuth} />
            <Route path="data/basecallings/list" component={fdata.BasecallingsListRoute} onEnter={requireAuth} />
            <Route path="data/basecallings/active" component={fdata.BasecallingsActiveRoute} onEnter={requireAuth} />
            <Route path="data/basecallings/new" component={fdata.BasecallingsNewRoute} onEnter={requireAuth} />
            <Route path="data/basecallings/update/:id" component={fdata.BasecallingsUpdateRoute} onEnter={requireAuth} />

            <Route path="data/alignments" component={fdata.AlignmentsListRoute} onEnter={requireAuth} />
            <Route path="data/alignments/list" component={fdata.AlignmentsListRoute} onEnter={requireAuth} />
            <Route path="data/alignments/active" component={fdata.AlignmentsActiveRoute} onEnter={requireAuth} />
            <Route path="data/alignments/new" component={fdata.AlignmentsNewRoute} onEnter={requireAuth} />
            <Route path="data/alignments/update/:id" component={fdata.AlignmentsUpdateRoute} onEnter={requireAuth} />

            {/* QUERY PROJECTS */}

            <Route path="projects" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/sample" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/request" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/library" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/desc" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            <Route path="projects/sheet" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            {/*<Route path="projects/ivc" component={qprojects.QueryProjectsRoute} />*/}
            <Route path="projects/demultiplexing" component={qprojects.QueryProjectsRoute} onEnter={requireAuth} />
            {/*<Route path="projects/alignments" component={qprojects.QueryProjectsRoute} />*/}

            {/* ADMIN */}

            {/*<Route path="admin" component={admin.AdminPage} onEnter={requireAuth} />*/}
            <Route path="admin" component={admin.UsersPage} onEnter={requireAuth} />
            <Route path="admin/users" component={admin.LimsUserPage} onEnter={requireAuth} />
            <Route path="admin/project_sharings" component={admin.UsersPage} onEnter={requireAuth} />
            <Route path="admin/analysis_types/list" component={admin.AnalysisTypeListRoute} onEnter={requireAuth} />
            <Route path="admin/analysis_types/new" component={admin.AnalysisTypeNewPage} onEnter={requireAuth} />
            <Route path="admin/analysis_types/update/:id" component={admin.AnalysisTypeUpdatePage} onEnter={requireAuth} />
            <Route path="admin/flowcell_types/list" component={admin.FlowcellTypesListRoute} onEnter={requireAuth} />
            <Route path="admin/flowcell_types/new" component={admin.FlowcellTypesNewPage} onEnter={requireAuth} />
            <Route path="admin/flowcell_types/update/:id" component={admin.FlowcellTypesUpdatePage} onEnter={requireAuth} />
            <Route path="admin/instruments/list" component={admin.InstrumentsListRoute} onEnter={requireAuth} />
            <Route path="admin/instruments/new" component={admin.InstrumentsNewPage} onEnter={requireAuth} />
            <Route path="admin/instruments/update/:id" component={admin.InstrumentsUpdatePage} onEnter={requireAuth} />
            <Route path="admin/library_adapters/list" component={admin.libAdaptersListRoute} onEnter={requireAuth} />
            <Route path="admin/library_adapters/new" component={admin.libAdaptersNewPage} onEnter={requireAuth} />
            <Route path="admin/library_adapters/update/:id" component={admin.libAdaptersUpdatePage} onEnter={requireAuth} />
            <Route path="admin/library_protocols/list" component={admin.libProtocolsListRoute} onEnter={requireAuth} />
            <Route path="admin/library_protocols/new" component={admin.libProtocolsNewPage} onEnter={requireAuth} />
            <Route path="admin/library_protocols/update/:id" component={admin.libProtocolsUpdatePage} onEnter={requireAuth} />
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