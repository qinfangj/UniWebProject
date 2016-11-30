import React from 'react';
import FacilityDataHome from '../../components/pages/FacilityDataHome';
import FacilityData from '../../components/pages/FacilityData';
import CommonTable from '../../components/tables/CommonTable';

import ProjectsInsertForm from '../../components/forms/ProjectsInsertForm';
import PeopleInsertForm from '../../components/forms/PeopleInsertForm';
import GenomesInsertForm from '../../components/forms/GenomesInsertForm';
import SamplesInsertForm from '../../components/forms/SamplesInsertForm';
import LibrariesInsertForm from '../../components/forms/LibrariesInsertForm';
import RunsPreInsertForm from '../../components/forms/Runs/RunsPreInsertForm';
import RunsInsertForm from '../../components/forms/Runs/RunsInsertForm';
import UserRequestsInsertForm from '../../components/forms/UserRequestsInsertForm';
import BioanalysersInsertForm from '../../components/forms/Bioanalysers/BioanalysersInsertForm';
import BasecallingsInsertForm from '../../components/forms/BasecallingsInsertForm';
import AlignmentsInsertForm from '../../components/forms/AlignmentsInsertForm';


export class FacilityDataRoute extends React.Component {
    render() {return (
        <FacilityDataHome />
    );}
}

export class ProjectsListRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable activeOnly={false} name="projects" />
        } />
    );}
}

export class ProjectsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Projects" name="projects" content={
            <CommonTable activeOnly={true} name="projects" />
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
            <CommonTable activeOnly={false} name="people" />
        } />
    );}
}

export class PeopleActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Laboratories" name="people" content={
            <CommonTable activeOnly={true} name="people" />
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
            <CommonTable activeOnly={false} name="genomes" />
        } />
    );}
}

export class GenomesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Genomes" name="genomes" content={
            <CommonTable activeOnly={true} name="genomes" />
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
            <CommonTable activeOnly={false} name="samples" />
        } />
    );}
}

export class SamplesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Samples" name="samples" content={
            <CommonTable activeOnly={true} name="samples" />
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
            <CommonTable activeOnly={false} name="libraries" />
        } />
    );}
}

export class LibrariesActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Libraries" name="libraries" content={
            <CommonTable activeOnly={true} name="libraries" />
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
            <CommonTable activeOnly={false} name="runs" />
        } />
    );}
}

export class RunsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Runs" name="runs" content={
            <CommonTable activeOnly={true} name="runs" />
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
            <CommonTable activeOnly={false} name="user_requests" />
        } />
    );}
}

export class UserRequestsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="User requests" name="user_requests" content={
            <CommonTable activeOnly={true} name="user_requests" />
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
            <CommonTable activeOnly={false} name="bioanalysers" />
        } />
    );}
}

export class BioanalysersActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Bioanalysers" name="bioanalysers" content={
            <CommonTable activeOnly={true} name="bioanalysers" />
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
            <CommonTable activeOnly={false} name="basecallings" />
        } />
    );}
}

export class BasecallingsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Basecallings" name="basecallings" content={
            <CommonTable activeOnly={true} name="basecallings" />
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
            <CommonTable activeOnly={false} name="alignments" />
        } />
    );}
}

export class AlignmentsActiveRoute extends React.Component {
    render() {return (
        <FacilityData title="Alignments" name="alignments" content={
            <CommonTable activeOnly={true} name="alignments" />
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


