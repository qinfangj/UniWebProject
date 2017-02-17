"use strict";
import React from 'react';
import FacilityDataHome from '../../components/pages/FacilityDataHome';
import FacilityData from '../../components/pages/FacilityData';
import CommonTable from '../../components/tables/facilityData/CommonTable';

import ProjectsInsertForm from '../../components/forms/facilityData/ProjectsInsertForm';
import PeopleInsertForm from '../../components/forms/facilityData/PeopleInsertForm';
import GenomesInsertForm from '../../components/forms/facilityData/GenomesInsertForm';
import SamplesInsertForm from '../../components/forms/facilityData/SamplesInsertForm';
import LibrariesInsertForm from '../../components/forms/facilityData/LibrariesInsertForm';
import RunsPreInsertForm from '../../components/forms/facilityData/Runs/RunsPreInsertForm';
import RunsInsertForm from '../../components/forms/facilityData/Runs/RunsInsertForm';
import UserRequestsInsertForm from '../../components/forms/facilityData/UserRequestsInsertForm';
import BioanalysersInsertForm from '../../components/forms/facilityData/Bioanalysers/BioanalysersInsertForm';
import BasecallingsInsertForm from '../../components/forms/facilityData/BasecallingsInsertForm';
import AlignmentsInsertForm from '../../components/forms/facilityData/AlignmentsInsertForm';


export class FacilityDataRoute extends React.Component {
    render() {return (
        <FacilityDataHome />
    );}
}

export class ProjectsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable dataStoreKey="projects" table="projects" columnsKey="projects" />
        } />
    );}
}

export class ProjectsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable activeOnly dataStoreKey="projectsActive" table="projects" columnsKey="projects" />
        } />
    );}
}

export class ProjectsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <ProjectsInsertForm updateId={this.props.params.id}/>
        } />
    );}
}


export class PeopleListRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable dataStoreKey="people" table="people" columnsKey="people" />
        } />
    );}
}

export class PeopleActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable activeOnly dataStoreKey="peopleActive" table="people" columnsKey="people" />
        } />
    );}
}

export class PeopleNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <PeopleInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class GenomesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable dataStoreKey="genomes" table="genomes" columnsKey="genomes" />
        } />
    );}
}

export class GenomesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable activeOnly dataStoreKey="genomesActive" table="genomes" columnsKey="genomes" />
        } />
    );}
}

export class GenomesNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <GenomesInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class SamplesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable dataStoreKey="samples" table="samples" columnsKey="samples" />
        } />
    );}
}

export class SamplesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable activeOnly dataStoreKey="samplesActive" table="samples" columnsKey="samples" />
        } />
    );}
}

export class SamplesNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <SamplesInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class LibrariesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <CommonTable dataStoreKey="libraries" table="libraries" columnsKey="libraries" />
        } />
    );}
}

export class LibrariesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <CommonTable activeOnly dataStoreKey="librariesActive" table="libraries" columnsKey="libraries" />
        } />
    );}
}

export class LibrariesNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <LibrariesInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class RunsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <CommonTable dataStoreKey="runs" table="runs" columnsKey="runs" />
        } />
    );}
}

export class RunsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <CommonTable activeOnly dataStoreKey="runsActive" table="runs" columnsKey="runs" />
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
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <RunsInsertForm/>
        } />
    );}
}


export class UserRequestsListRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <CommonTable dataStoreKey="user_requests" table="user_requests" columnsKey="user_requests" />
        } />
    );}
}

export class UserRequestsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <CommonTable activeOnly dataStoreKey="user_requestsActive" table="user_requests" columnsKey="user_requests" />
        } />
    );}
}

export class UserRequestsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <UserRequestsInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class BioanalysersListRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <CommonTable dataStoreKey="bioanalysers" table="bioanalysers" columnsKey="bioanalysers" />
        } />
    );}
}

export class BioanalysersActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <CommonTable activeOnly dataStoreKey="bioanalysersActive" table="bioanalysers" columnsKey="bioanalysers" />
        } />
    );}
}

export class BioanalysersNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <BioanalysersInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class BasecallingsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <CommonTable dataStoreKey="basecallings" table="basecallings" columnsKey="basecallings" />
        } />
    );}
}

export class BasecallingsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <CommonTable activeOnly dataStoreKey="basecallingsActive" table="basecallings" columnsKey="basecallings" />
        } />
    );}
}

export class BasecallingsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <BasecallingsInsertForm updateId={this.props.params.id} />
        } />
    );}
}


export class AlignmentsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <CommonTable dataStoreKey="alignments" table="alignments" columnsKey="alignments" />
        } />
    );}
}

export class AlignmentsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <CommonTable activeOnly dataStoreKey="alignmentsActive" table="alignments" columnsKey="alignments" />
        } />
    );}
}

export class AlignmentsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <AlignmentsInsertForm updateId={this.props.params.id} />
        } />
    );}
}


