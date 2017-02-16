import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App';
import HomePage from './HomePage';
import * as fdata from './facilityData/facilityDataRoutes';
import * as qprojects from './queryProjects/queryProjectsRoutes';
import * as login from './login/loginRoutes';
import AuthService from '../utils/AuthService';



// Validate authentication for private routes
const requireAuth = (nextState, replace) => {
    if (!AuthService.isLoggedIn) {
        replace({ pathname: '/login' });
    }
};


const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="home" component={HomePage}/>

            <Route path="login" component={login.LoginPage}/>
            <Route path="signup" component={login.SignupPage}/>
            <Route path="forgotPassword" component={login.ForgotPasswordPage}/>
            <Route path="changePassword" component={login.ChangePasswordPage}/>

            {/* FACILITY DATA */}

            <Route path="data" component={fdata.FacilityDataRoute} onEnter={requireAuth} />

            <Route path="data/projects" component={fdata.ProjectsListRoute} onEnter={requireAuth} />
            <Route path="data/projects/list" component={fdata.ProjectsListRoute} onEnter={requireAuth} />
            <Route path="data/projects/active" component={fdata.ProjectsActiveRoute} onEnter={requireAuth} />
            <Route path="data/projects/new" component={fdata.ProjectsNewRoute} onEnter={requireAuth} />
            <Route path="data/projects/update/:id" component={fdata.ProjectsNewRoute} onEnter={requireAuth} />

            <Route path="data/people" component={fdata.PeopleListRoute} onEnter={requireAuth} />
            <Route path="data/people/list" component={fdata.PeopleListRoute} onEnter={requireAuth} />
            <Route path="data/people/active" component={fdata.PeopleActiveRoute} onEnter={requireAuth} />
            <Route path="data/people/new" component={fdata.PeopleNewRoute} onEnter={requireAuth} />
            <Route path="data/people/update/:id" component={fdata.PeopleNewRoute} onEnter={requireAuth} />

            <Route path="data/genomes" component={fdata.GenomesListRoute} onEnter={requireAuth} />
            <Route path="data/genomes/list" component={fdata.GenomesListRoute} onEnter={requireAuth} />
            <Route path="data/genomes/active" component={fdata.GenomesActiveRoute} onEnter={requireAuth} />
            <Route path="data/genomes/new" component={fdata.GenomesNewRoute} onEnter={requireAuth} />
            <Route path="data/genomes/update/:id" component={fdata.GenomesNewRoute} onEnter={requireAuth} />

            <Route path="data/samples" component={fdata.SamplesListRoute} onEnter={requireAuth} />
            <Route path="data/samples/list" component={fdata.SamplesListRoute} onEnter={requireAuth} />
            <Route path="data/samples/active" component={fdata.SamplesActiveRoute} onEnter={requireAuth} />
            <Route path="data/samples/new" component={fdata.SamplesNewRoute} onEnter={requireAuth} />
            <Route path="data/samples/update/:id" component={fdata.SamplesNewRoute} onEnter={requireAuth} />

            <Route path="data/libraries" component={fdata.LibrariesListRoute} onEnter={requireAuth} />
            <Route path="data/libraries/list" component={fdata.LibrariesListRoute} onEnter={requireAuth} />
            <Route path="data/libraries/active" component={fdata.LibrariesActiveRoute} onEnter={requireAuth} />
            <Route path="data/libraries/new" component={fdata.LibrariesNewRoute} onEnter={requireAuth} />
            <Route path="data/libraries/update/:id" component={fdata.LibrariesNewRoute} onEnter={requireAuth} />

            <Route path="data/runs" component={fdata.RunsListRoute} onEnter={requireAuth} />
            <Route path="data/runs/list" component={fdata.RunsListRoute} onEnter={requireAuth} />
            <Route path="data/runs/active" component={fdata.RunsActiveRoute} onEnter={requireAuth} />
            <Route path="data/runs/new" component={fdata.RunsPreNewRoute} onEnter={requireAuth} />
            <Route path="data/runs/postnew" component={fdata.RunsNewRoute} onEnter={requireAuth} />
            <Route path="data/runs/update/:id" component={fdata.RunsNewRoute} onEnter={requireAuth} />

            <Route path="data/user_requests" component={fdata.UserRequestsListRoute} onEnter={requireAuth} />
            <Route path="data/user_requests/list" component={fdata.UserRequestsListRoute} onEnter={requireAuth} />
            <Route path="data/user_requests/active" component={fdata.UserRequestsActiveRoute} onEnter={requireAuth} />
            <Route path="data/user_requests/new" component={fdata.UserRequestsNewRoute} onEnter={requireAuth} />
            <Route path="data/user_requests/update/:id" component={fdata.UserRequestsNewRoute} onEnter={requireAuth} />

            <Route path="data/bioanalysers" component={fdata.BioanalysersListRoute} onEnter={requireAuth} />
            <Route path="data/bioanalysers/list" component={fdata.BioanalysersListRoute} onEnter={requireAuth} />
            <Route path="data/bioanalysers/active" component={fdata.BioanalysersActiveRoute} onEnter={requireAuth} />
            <Route path="data/bioanalysers/new" component={fdata.BioanalysersNewRoute} onEnter={requireAuth} />
            <Route path="data/bioanalysers/update/:id" component={fdata.BioanalysersNewRoute} onEnter={requireAuth} />

            <Route path="data/basecallings" component={fdata.BasecallingsListRoute} onEnter={requireAuth} />
            <Route path="data/basecallings/list" component={fdata.BasecallingsListRoute} onEnter={requireAuth} />
            <Route path="data/basecallings/active" component={fdata.BasecallingsActiveRoute} onEnter={requireAuth} />
            <Route path="data/basecallings/new" component={fdata.BasecallingsNewRoute} onEnter={requireAuth} />
            <Route path="data/basecallings/update/:id" component={fdata.BasecallingsNewRoute} onEnter={requireAuth} />

            <Route path="data/alignments" component={fdata.AlignmentsListRoute} onEnter={requireAuth} />
            <Route path="data/alignments/list" component={fdata.AlignmentsListRoute} onEnter={requireAuth} />
            <Route path="data/alignments/active" component={fdata.AlignmentsActiveRoute} onEnter={requireAuth} />
            <Route path="data/alignments/new" component={fdata.AlignmentsNewRoute} onEnter={requireAuth} />
            <Route path="data/alignments/update/:id" component={fdata.AlignmentsNewRoute} onEnter={requireAuth} />

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

        </Route>
    </Router>
);


export default routes;