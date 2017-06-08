"use strict";
import React from 'react';
import FacilityDataHome from '../pages/FacilityDataHome';
import FacilityData from '../pages/FacilityData';
import CommonTable from '../tables/facilityData/CommonTable';
import facilityDataColumns from '../tables/facilityData/columns';

import formNames from '../constants/formNames';
import tableNames from '../tables/tableNames';
import ProjectsInsertForm from '../forms/facilityData/ProjectsInsertForm';
import PeopleInsertForm from '../forms/facilityData/PeopleInsertForm';
import GenomesInsertForm from '../forms/facilityData/GenomesInsertForm';
import SamplesInsertForm from '../forms/facilityData/SamplesInsertForm';
import LibrariesInsertForm from '../forms/facilityData/LibrariesInsertForm';
import RunsInsertForm from '../forms/facilityData/Runs/RunsInsertForm';
import UserRequestsInsertForm from '../forms/facilityData/UserRequestsInsertForm';
import BioanalysersInsertForm from '../forms/facilityData/Bioanalysers/BioanalysersInsertForm';
import BasecallingsInsertForm from '../forms/facilityData/BasecallingsInsertForm';
import AlignmentsInsertForm from '../forms/facilityData/AlignmentsInsertForm';


export class FacilityDataRoute extends React.Component {
    render() {return (
        <FacilityDataHome />
    );}
}

/*****************************************************************************/

export class ProjectsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable
                table={tableNames.PROJECTS}
                dataStoreKey={tableNames.PROJECTS}
                columns={facilityDataColumns[tableNames.PROJECTS]}
                form={formNames.PROJECTS_INSERT_FORM}
            />
        } />
    );}
}

export class ProjectsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable
                activeOnly
                table={tableNames.PROJECTS}
                dataStoreKey={tableNames.PROJECTS_ACTIVE}
                columns={facilityDataColumns[tableNames.PROJECTS]}
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

/*****************************************************************************/

export class PeopleListRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable
                table={tableNames.PEOPLE}
                dataStoreKey={tableNames.PEOPLE}
                columns={facilityDataColumns[tableNames.PEOPLE]}
                form={formNames.PEOPLE_INSERT_FORM}
            />
        } />
    );}
}

export class PeopleActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable
                activeOnly
                table={tableNames.PEOPLE}
                dataStoreKey={tableNames.PEOPLE_ACTIVE}
                columns={facilityDataColumns[tableNames.PEOPLE]}
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

/*****************************************************************************/

export class GenomesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable
                table={tableNames.GENOMES}
                dataStoreKey={tableNames.GENOMES}
                columns={facilityDataColumns[tableNames.GENOMES]}
                form={formNames.GENOMES_INSERT_FORM}
            />
        } />
    );}
}

export class GenomesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable
                activeOnly
                table={tableNames.GENOMES}
                dataStoreKey={tableNames.GENOMES_ACTIVE}
                columns={facilityDataColumns[tableNames.GENOMES]}
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

/*****************************************************************************/

export class SamplesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable
                table={tableNames.SAMPLES}
                dataStoreKey={tableNames.SAMPLES}
                columns={facilityDataColumns[tableNames.SAMPLES]}
                form={formNames.SAMPLES_INSERT_FORM}
            />
        } />
    );}
}

export class SamplesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable
                activeOnly
                table={tableNames.SAMPLES}
                dataStoreKey={tableNames.SAMPLES_ACTIVE}
                columns={facilityDataColumns[tableNames.SAMPLES]}
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

/*****************************************************************************/

export class LibrariesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <CommonTable
                table={tableNames.LIBRARIES}
                dataStoreKey={tableNames.LIBRARIES}
                columns={facilityDataColumns[tableNames.LIBRARIES]}
                form={formNames.LIBRARIES_INSERT_FORM}
            />
        } />
    );}
}

export class LibrariesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <CommonTable
                activeOnly
                table={tableNames.LIBRARIES}
                dataStoreKey={tableNames.LIBRARIES_ACTIVE}
                columns={facilityDataColumns[tableNames.LIBRARIES]}
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

/*****************************************************************************/

export class RunsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <CommonTable
                table={tableNames.RUNS}
                dataStoreKey={tableNames.RUNS}
                columns={facilityDataColumns[tableNames.RUNS]}
                form={formNames.RUNS_INSERT_FORM}
            />
        } />
    );}
}

export class RunsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <CommonTable
                activeOnly
                table={tableNames.RUNS}
                dataStoreKey={tableNames.RUNS_ACTIVE}
                columns={facilityDataColumns[tableNames.RUNS]}
                form={formNames.RUNS_INSERT_FORM}
            />
        } />
    );}
}

export class RunsNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <RunsInsertForm />
        } />
    );}
}

export class RunsUpdateRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <RunsInsertForm updateId={this.props.params.id} />
        } />
    );}
}

export class RunsFromTrackingRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <RunsInsertForm />
        } />
    );}
}

/*****************************************************************************/

export class UserRequestsListRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <CommonTable
                table={tableNames.USER_REQUESTS}
                dataStoreKey={tableNames.USER_REQUESTS}
                columns={facilityDataColumns[tableNames.USER_REQUESTS]}
                form={formNames.USER_REQUESTS_INSERT_FORM}
            />
        } />
    );}
}

export class UserRequestsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <CommonTable
                activeOnly
                table={tableNames.USER_REQUESTS}
                dataStoreKey={tableNames.USER_REQUESTS_ACTIVE}
                columns={facilityDataColumns[tableNames.USER_REQUESTS]}
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

/*****************************************************************************/

export class BioanalysersListRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <CommonTable
                table={tableNames.BIOANALYSERS}
                dataStoreKey={tableNames.BIOANALYSERS}
                columns={facilityDataColumns[tableNames.BIOANALYSERS]}
                form={formNames.BIOANALYSERS_INSERT_FORM}
            />
        } />
    );}
}

export class BioanalysersActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <CommonTable
                activeOnly
                table={tableNames.BIOANALYSERS}
                dataStoreKey={tableNames.BIOANALYSERS_ACTIVE}
                columns={facilityDataColumns[tableNames.BIOANALYSERS]}
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

/*****************************************************************************/

export class BasecallingsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <CommonTable
                table={tableNames.BASECALLINGS}
                dataStoreKey={tableNames.BASECALLINGS}
                columns={facilityDataColumns[tableNames.BASECALLINGS]}
                form={formNames.BASECALLINGS_INSERT_FORM}
            />
        } />
    );}
}

export class BasecallingsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <CommonTable
                activeOnly
                table={tableNames.BASECALLINGS}
                dataStoreKey={tableNames.BASECALLINGS_ACTIVE}
                columns={facilityDataColumns[tableNames.BASECALLINGS]}
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

/*****************************************************************************/

export class AlignmentsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <CommonTable
                table={tableNames.ALIGNMENTS}
                dataStoreKey={tableNames.ALIGNMENTS}
                columns={facilityDataColumns[tableNames.ALIGNMENTS]}
                form={formNames.ALIGNMENTS_INSERT_FORM}
            />
        } />
    );}
}

export class AlignmentsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <CommonTable
                activeOnly
                table={tableNames.ALIGNMENTS}
                dataStoreKey={tableNames.ALIGNMENTS_ACTIVE}
                columns={facilityDataColumns[tableNames.ALIGNMENTS]}
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
