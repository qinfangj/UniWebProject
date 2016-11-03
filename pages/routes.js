import React from 'react';
import css from './pages.css';
import Layout from '../components/Layout';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import * as fdata from '../pages/facilityData/facilityDataRoutes';


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
            <Route path="data" component={fdata.FacilityDataRoute}/>

            <Route path="data/projects" component={fdata.ProjectsListRoute}/>
            <Route path="data/projects/list" component={fdata.ProjectsListRoute}/>
            <Route path="data/projects/active" component={fdata.ProjectsActiveRoute}/>
            <Route path="data/projects/new" component={fdata.ProjectsNewRoute}/>

            <Route path="data/people" component={fdata.PeopleListRoute}/>
            <Route path="data/people/list" component={fdata.PeopleListRoute}/>
            <Route path="data/people/active" component={fdata.PeopleActiveRoute}/>
            <Route path="data/people/new" component={fdata.PeopleNewRoute}/>

            <Route path="data/genomes" component={fdata.GenomesListRoute}/>
            <Route path="data/genomes/list" component={fdata.GenomesListRoute}/>
            <Route path="data/genomes/active" component={fdata.GenomesActiveRoute}/>
            <Route path="data/genomes/new" component={fdata.GenomesNewRoute}/>

            <Route path="data/samples" component={fdata.SamplesListRoute}/>
            <Route path="data/samples/list" component={fdata.SamplesListRoute}/>
            <Route path="data/samples/active" component={fdata.SamplesActiveRoute}/>
            <Route path="data/samples/new" component={fdata.SamplesNewRoute}/>

            <Route path="data/libraries" component={fdata.LibrariesListRoute}/>
            <Route path="data/libraries/list" component={fdata.LibrariesListRoute}/>
            <Route path="data/libraries/active" component={fdata.LibrariesActiveRoute}/>
            <Route path="data/libraries/new" component={fdata.LibrariesNewRoute}/>
        </Route>
    </Router>
);


export default routes;