"use strict";
import React from 'react';
import FacilityDataHome from '../../pages/FacilityDataHome';
import FacilityData from '../../pages/FacilityData';
import CommonTable from '../../tables/facilityData/CommonTable';

import formNames from '../../constants/formNames';
import ProjectsInsertForm from '../../forms/facilityData/ProjectsInsertForm';
import PeopleInsertForm from '../../forms/facilityData/PeopleInsertForm';
import GenomesInsertForm from '../../forms/facilityData/GenomesInsertForm';
import SamplesInsertForm from '../../forms/facilityData/SamplesInsertForm';
import LibrariesInsertForm from '../../forms/facilityData/LibrariesInsertForm';
import RunsPreInsertForm from '../../forms/facilityData/Runs/RunsPreInsertForm';
import RunsInsertForm from '../../forms/facilityData/Runs/RunsInsertForm';
import UserRequestsInsertForm from '../../forms/facilityData/UserRequestsInsertForm';
import BioanalysersInsertForm from '../../forms/facilityData/Bioanalysers/BioanalysersInsertForm';
import BioanalysersInsertFormTest from '../../forms/facilityData/Bioanalysers/BioanalysersInsertFormTest';

import BasecallingsInsertForm from '../../forms/facilityData/BasecallingsInsertForm';
import AlignmentsInsertForm from '../../forms/facilityData/AlignmentsInsertForm';


export class FacilityDataRoute extends React.Component {
    render() {return (
        <FacilityDataHome />
    );}
}

export class ProjectsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable dataStoreKey="projects" table="projects" columnsKey="projects"
                         form={formNames.PROJECTS_INSERT_FORM}
            />
        } />
    );}
}

export class ProjectsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable activeOnly dataStoreKey="projectsActive" table="projects" columnsKey="projects"
                         form={formNames.PROJECTS_INSERT_FORM}
            />
        } />
    );}
}

export class ProjectsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <ProjectsInsertForm/>
        } />
    );}
}

export class ProjectsUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <ProjectsInsertForm updateId={this.props.params.id}/>
        } />
    );}
}


export class PeopleListRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable dataStoreKey="people" table="people" columnsKey="people"
                         form={formNames.PEOPLE_INSERT_FORM}
            />
        } />
    );}
}

export class PeopleActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable activeOnly dataStoreKey="peopleActive" table="people" columnsKey="people"
                         form={formNames.PEOPLE_INSERT_FORM}
            />
        } />
    );}
}

export class PeopleNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <PeopleInsertForm/>
        } />
    );}
}

export class PeopleUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <PeopleInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class GenomesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable dataStoreKey="genomes" table="genomes" columnsKey="genomes"
                         form={formNames.GENOMES_INSERT_FORM}
            />
        } />
    );}
}

export class GenomesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable activeOnly dataStoreKey="genomesActive" table="genomes" columnsKey="genomes"
                         form={formNames.GENOMES_INSERT_FORM}
            />
        } />
    );}
}

export class GenomesNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <GenomesInsertForm/>
        } />
    );}
}

export class GenomesUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <GenomesInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class SamplesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable dataStoreKey="samples" table="samples" columnsKey="samples"
                         form={formNames.SAMPLES_INSERT_FORM}
            />
        } />
    );}
}

export class SamplesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable activeOnly dataStoreKey="samplesActive" table="samples" columnsKey="samples"
                         form={formNames.SAMPLES_INSERT_FORM}
            />
        } />
    );}
}

export class SamplesNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <SamplesInsertForm/>
        } />
    );}
}

export class SamplesUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <SamplesInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class LibrariesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <CommonTable dataStoreKey="libraries" table="libraries" columnsKey="libraries"
                         form={formNames.LIBRARIES_INSERT_FORM}
            />
        } />
    );}
}

export class LibrariesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <CommonTable activeOnly dataStoreKey="librariesActive" table="libraries" columnsKey="libraries"
                         form={formNames.LIBRARIES_INSERT_FORM}
            />
        } />
    );}
}

export class LibrariesNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <LibrariesInsertForm/>
        } />
    );}
}

export class LibrariesUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <LibrariesInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class RunsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <CommonTable dataStoreKey="runs" table="runs" columnsKey="runs"
                         form={formNames.RUNS_INSERT_FORM}
            />
        } />
    );}
}

export class RunsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <CommonTable activeOnly dataStoreKey="runsActive" table="runs" columnsKey="runs"
                         form={formNames.RUNS_INSERT_FORM}
            />
        } />
    );}
}

export class RunsPreNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <RunsPreInsertForm updateId={this.props.params.id} />
        } />
    );}
}
export class RunsNewRoute extends React.Component {
    render() {
        console.log("hello");

        return (

        <FacilityData title="Runs" name="runs" content={
            <RunsInsertForm form={formNames.RUNS_INSERT_FORM}/>
        } />
    );}
}

export class RunsUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <RunsInsertForm/>
        } />
    );}
}


export class UserRequestsListRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <CommonTable dataStoreKey="user_requests" table="user_requests" columnsKey="user_requests"
                         form={formNames.USER_REQUESTS_INSERT_FORM}
            />
        } />
    );}
}

export class UserRequestsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <CommonTable activeOnly dataStoreKey="user_requestsActive" table="user_requests" columnsKey="user_requests"
                         form={formNames.USER_REQUESTS_INSERT_FORM}
            />
        } />
    );}
}

export class UserRequestsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <UserRequestsInsertForm/>
        } />
    );}
}

export class UserRequestsUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <UserRequestsInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class BioanalysersListRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <CommonTable dataStoreKey="bioanalysers" table="bioanalysers" columnsKey="bioanalysers"
                         form={formNames.BIOANALYSERS_INSERT_FORM}
            />
        } />
    );}
}

export class BioanalysersActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <CommonTable activeOnly dataStoreKey="bioanalysersActive" table="bioanalysers" columnsKey="bioanalysers"
                         form={formNames.BIOANALYSERS_INSERT_FORM}
            />
        } />
    );}
}

export class BioanalysersNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <BioanalysersInsertForm/>
        } />
    );}
}

export class BioanalysersUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <BioanalysersInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class BasecallingsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <CommonTable dataStoreKey="basecallings" table="basecallings" columnsKey="basecallings"
                         form={formNames.BASECALLINGS_INSERT_FORM}
            />
        } />
    );}
}

export class BasecallingsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <CommonTable activeOnly dataStoreKey="basecallingsActive" table="basecallings" columnsKey="basecallings"
                         form={formNames.BASECALLINGS_INSERT_FORM}
            />
        } />
    );}
}

export class BasecallingsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <BasecallingsInsertForm/>
        } />
    );}
}

export class BasecallingsUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <BasecallingsInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class AlignmentsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <CommonTable dataStoreKey="alignments" table="alignments" columnsKey="alignments"
                         form={formNames.ALIGNMENTS_INSERT_FORM}
            />
        } />
    );}
}

export class AlignmentsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <CommonTable activeOnly dataStoreKey="alignmentsActive" table="alignments" columnsKey="alignments"
                         form={formNames.ALIGNMENTS_INSERT_FORM}
            />
        } />
    );}
}

export class AlignmentsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <AlignmentsInsertForm/>
        } />
    );}
}

export class AlignmentsUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <AlignmentsInsertForm updateId={this.props.params.id} />
        } />
    );}
}
