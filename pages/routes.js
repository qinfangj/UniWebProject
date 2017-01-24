import React from 'react';
import css from './pages.css';
import Layout from '../components/Layout';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import * as fdata from '../pages/facilityData/facilityDataRoutes';
import * as qprojects from '../pages/queryProjects/queryProjectsRoutes';


class App extends React.Component {
    componentDidMount() {
        document.title = "UHTS LIMS Web /index";
    }
    render() {
        return (
            <Layout className={css.content}>
                {this.props.children}
            </Layout>
        );
    }
}

class HomePage extends React.Component {
    render() {
        return (
            <h1>Welcome to the Lausanne Genomic Technologies Facility!</h1>
        );
    }
}

const routes = (
    <Router history={browserHistory} >
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="home" component={HomePage}/>

            {/* FACILITY DATA */}

            <Route path="data" component={fdata.FacilityDataRoute}/>

            <Route path="data/projects" component={fdata.ProjectsListRoute}/>
            <Route path="data/projects/list" component={fdata.ProjectsListRoute}/>
            <Route path="data/projects/active" component={fdata.ProjectsActiveRoute}/>
            <Route path="data/projects/new" component={fdata.ProjectsNewRoute}/>
            <Route path="data/projects/update/:id" component={fdata.ProjectsNewRoute}/>

            <Route path="data/people" component={fdata.PeopleListRoute}/>
            <Route path="data/people/list" component={fdata.PeopleListRoute}/>
            <Route path="data/people/active" component={fdata.PeopleActiveRoute}/>
            <Route path="data/people/new" component={fdata.PeopleNewRoute}/>
            <Route path="data/people/update/:id" component={fdata.ProjectsNewRoute}/>

            <Route path="data/genomes" component={fdata.GenomesListRoute}/>
            <Route path="data/genomes/list" component={fdata.GenomesListRoute}/>
            <Route path="data/genomes/active" component={fdata.GenomesActiveRoute}/>
            <Route path="data/genomes/new" component={fdata.GenomesNewRoute}/>
            <Route path="data/genomes/update/:id" component={fdata.ProjectsNewRoute}/>

            <Route path="data/samples" component={fdata.SamplesListRoute}/>
            <Route path="data/samples/list" component={fdata.SamplesListRoute}/>
            <Route path="data/samples/active" component={fdata.SamplesActiveRoute}/>
            <Route path="data/samples/new" component={fdata.SamplesNewRoute}/>
            <Route path="data/samples/update/:id" component={fdata.ProjectsNewRoute}/>

            <Route path="data/libraries" component={fdata.LibrariesListRoute}/>
            <Route path="data/libraries/list" component={fdata.LibrariesListRoute}/>
            <Route path="data/libraries/active" component={fdata.LibrariesActiveRoute}/>
            <Route path="data/libraries/new" component={fdata.LibrariesNewRoute}/>
            <Route path="data/libraries/update/:id" component={fdata.ProjectsNewRoute}/>

            <Route path="data/runs" component={fdata.RunsListRoute}/>
            <Route path="data/runs/list" component={fdata.RunsListRoute}/>
            <Route path="data/runs/active" component={fdata.RunsActiveRoute}/>
            <Route path="data/runs/new" component={fdata.RunsPreNewRoute}/>
            <Route path="data/runs/postnew" component={fdata.RunsNewRoute}/>
            <Route path="data/runs/update/:id" component={fdata.ProjectsNewRoute}/>

            <Route path="data/user_requests" component={fdata.UserRequestsListRoute}/>
            <Route path="data/user_requests/list" component={fdata.UserRequestsListRoute}/>
            <Route path="data/user_requests/active" component={fdata.UserRequestsActiveRoute}/>
            <Route path="data/user_requests/new" component={fdata.UserRequestsNewRoute}/>
            <Route path="data/user_requests/update/:id" component={fdata.ProjectsNewRoute}/>

            <Route path="data/bioanalysers" component={fdata.BioanalysersListRoute}/>
            <Route path="data/bioanalysers/list" component={fdata.BioanalysersListRoute}/>
            <Route path="data/bioanalysers/active" component={fdata.BioanalysersActiveRoute}/>
            <Route path="data/bioanalysers/new" component={fdata.BioanalysersNewRoute}/>
            <Route path="data/bioanalysers/update/:id" component={fdata.ProjectsNewRoute}/>

            <Route path="data/basecallings" component={fdata.BasecallingsListRoute}/>
            <Route path="data/basecallings/list" component={fdata.BasecallingsListRoute}/>
            <Route path="data/basecallings/active" component={fdata.BasecallingsActiveRoute}/>
            <Route path="data/basecallings/new" component={fdata.BasecallingsNewRoute}/>
            <Route path="data/basecallings/update/:id" component={fdata.ProjectsNewRoute}/>

            <Route path="data/alignments" component={fdata.AlignmentsListRoute}/>
            <Route path="data/alignments/list" component={fdata.AlignmentsListRoute}/>
            <Route path="data/alignments/active" component={fdata.AlignmentsActiveRoute}/>
            <Route path="data/alignments/new" component={fdata.AlignmentsNewRoute}/>
            <Route path="data/alignments/update/:id" component={fdata.ProjectsNewRoute}/>

            {/* QUERY PROJECTS */}

            <Route path="projects" component={qprojects.QueryProjectsRoute} />
            <Route path="projects/sample" component={qprojects.QueryProjectsRoute} />
            <Route path="projects/request" component={qprojects.QueryProjectsRoute} />
            <Route path="projects/library" component={qprojects.QueryProjectsRoute} />
            <Route path="projects/desc" component={qprojects.QueryProjectsRoute} />
            <Route path="projects/sheet" component={qprojects.QueryProjectsRoute} />
            {/*<Route path="projects/ivc" component={qprojects.QueryProjectsRoute} />*/}
            <Route path="projects/demultiplexing" component={qprojects.QueryProjectsRoute} />
            {/*<Route path="projects/alignments" component={qprojects.QueryProjectsRoute} />*/}

        </Route>
    </Router>
);


export default routes;