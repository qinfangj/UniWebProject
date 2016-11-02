import React from 'react';
import FacilityDataHome from '../../components/pages/FacilityDataHome';
import FacilityData from '../../components/pages/FacilityData';
import CommonTable from '../../components/tables/CommonTable';

import ProjectInsertForm from '../../components/forms/ProjectInsertForm';
import PeopleInsertForm from '../../components/forms/PeopleInsertForm';
import GenomesInsertForm from '../../components/forms/GenomesInsertForm';
import SamplesInsertForm from '../../components/forms/SamplesInsertForm';


class FacilityDataRoute extends React.Component {
    render() {return (
        <FacilityDataHome />
    );}
}

class ProjectsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable activeOnly={false} name="projects" />
        } />
    );}
}

class ProjectsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable activeOnly={true} name="projects" />
        } />
    );}
}

class ProjectsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <ProjectInsertForm/>
        } />
    );}
}


class PeopleListRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable activeOnly={false} name="people" />
        } />
    );}
}

class PeopleActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable activeOnly={true} name="people" />
        } />
    );}
}

class PeopleNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <PeopleInsertForm />
        } />
    );}
}


class GenomesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable activeOnly={false} name="genomes" />
        } />
    );}
}

class GenomesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable activeOnly={true} name="genomes" />
        } />
    );}
}

class GenomesNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <GenomesInsertForm/>
        } />
    );}
}


class SamplesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable activeOnly={false} name="samples" />
        } />
    );}
}

class SamplesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable activeOnly={true} name="samples" />
        } />
    );}
}

class SamplesNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <SamplesInsertForm/>
        } />
    );}
}



export {
    FacilityDataRoute,
    ProjectsListRoute,
    ProjectsActiveRoute,
    ProjectsNewRoute,
    PeopleListRoute,
    PeopleActiveRoute,
    PeopleNewRoute,
    GenomesListRoute,
    GenomesActiveRoute,
    GenomesNewRoute,
    SamplesListRoute,
    SamplesActiveRoute,
    SamplesNewRoute,
}
