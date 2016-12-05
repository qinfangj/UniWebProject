import React from 'react';
import FacilityDataHome from '../../components/pages/FacilityDataHome';
import FacilityData from '../../components/pages/FacilityData';
import CommonTable from '../../components/tables/CommonTable';

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
            <CommonTable activeOnly={false} dataStoreKey="projects" table="projects" columnsKey="projects" />
        } />
    );}
}

export class ProjectsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable activeOnly={true} dataStoreKey="projects" table="projects" columnsKey="projects" />
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


export class PeopleListRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable activeOnly={false} dataStoreKey="people" table="people" columnsKey="people" />
        } />
    );}
}

export class PeopleActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable activeOnly={true} dataStoreKey="people" table="people" columnsKey="people" />
        } />
    );}
}

export class PeopleNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <PeopleInsertForm />
        } />
    );}
}


export class GenomesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable activeOnly={false} dataStoreKey="genomes" table="genomes" columnsKey="genomes" />
        } />
    );}
}

export class GenomesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable activeOnly={true} dataStoreKey="genomes" table="genomes" columnsKey="genomes" />
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


export class SamplesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable activeOnly={false} dataStoreKey="samples" table="samples" columnsKey="samples" />
        } />
    );}
}

export class SamplesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable activeOnly={true} dataStoreKey="samples" table="samples" columnsKey="samples" />
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


export class LibrariesListRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <CommonTable activeOnly={false} dataStoreKey="libraries" table="libraries" columnsKey="libraries" />
        } />
    );}
}

export class LibrariesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <CommonTable activeOnly={true} dataStoreKey="libraries" table="libraries" columnsKey="libraries" />
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


export class RunsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <CommonTable activeOnly={false} dataStoreKey="runs" table="runs" columnsKey="runs" />
        } />
    );}
}

export class RunsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <CommonTable activeOnly={true} dataStoreKey="runs" table="runs" columnsKey="runs" />
        } />
    );}
}

export class RunsPreNewRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <RunsPreInsertForm/>
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
            <CommonTable activeOnly={false} dataStoreKey="user_requests" table="user_requests" columnsKey="user_requests" />
        } />
    );}
}

export class UserRequestsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <CommonTable activeOnly={true} dataStoreKey="user_requests" table="user_requests" columnsKey="user_requests" />
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


export class BioanalysersListRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <CommonTable activeOnly={false} dataStoreKey="bioanalysers" table="bioanalysers" columnsKey="bioanalysers" />
        } />
    );}
}

export class BioanalysersActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <CommonTable activeOnly={true} dataStoreKey="bioanalysers" table="bioanalysers" columnsKey="bioanalysers" />
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


export class BasecallingsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <CommonTable activeOnly={false} dataStoreKey="basecallings" table="basecallings" columnsKey="basecallings" />
        } />
    );}
}

export class BasecallingsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <CommonTable activeOnly={true} dataStoreKey="basecallings" table="basecallings" columnsKey="basecallings" />
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


export class AlignmentsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <CommonTable activeOnly={false} dataStoreKey="alignments" table="alignments" columnsKey="alignments" />
        } />
    );}
}

export class AlignmentsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <CommonTable activeOnly={true} dataStoreKey="alignments" table="alignments" columnsKey="alignments" />
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


