"use strict";
import React from 'react';
import CommonTable from '../tables/CommonTable';
import CommonAdminForms from '../forms/adminData/CommonAdminForms';
import adminDataColumns from '../tables/adminData/columns';
import tableNames from '../tables/tableNames';

import AdminData from '../pages/AdminData';
import AdminDataHome from '../pages/AdminDataHome';
//import ProjectSharingSubmitForm from '../forms/adminData/ProjectSharingSubmitForm';
//import LimsUsersSubmitForm from '../forms/adminData/LimsUserSubmitForm';


export class AdminDataPage extends React.Component {
    render() {
        return (
            <AdminDataHome />
        );
    }
}

export class LimsUsersListRoute extends React.Component {
    render() {
        return (
            <AdminData title="LIMS Users" name="users" content={
                <CommonTable dataStoreKey={tableNames.USERS} table={tableNames.USERS}
                              domain="admin" name="users" columns={adminDataColumns[tableNames.USERS]} />
            }/>
        );
    }
}

export class LimsUsersNewPage extends React.Component {
    render() {
        return (
            <AdminData title="LIMS Users" name="users" content={
                //<LimsUsersSubmitForm table={tableNames.USERS}  updateId={this.props.params.id}/>
                <CommonAdminForms table={tableNames.USERS} />
            } />
        );
    }
}

export class LimsUsersUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="LIMS Users" name="users" content={
                //<LimsUsersSubmitForm table={tableNames.USERS}  updateId={this.props.params.id}/>
                <CommonAdminForms table={tableNames.USERS}  updateId={this.props.params.id}/>
            } />
        );
    }
}


export class AnalysisTypeListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Analysis Types" name="analysis_types" content={
                <CommonTable dataStoreKey={tableNames.ANALYSIS_TYPES} table={tableNames.ANALYSIS_TYPES}
                              domain="admin" name="analysis_types" columns={adminDataColumns[tableNames.ANALYSIS_TYPES]} />
            } />
        );
    }
}

export class AnalysisTypeNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Analysis Types" name="analysis_types"  content={
                <CommonAdminForms table={tableNames.ANALYSIS_TYPES}/>
            } />
        );
    }
}

export class AnalysisTypeUpdatePage extends React.Component {
    render() {
        return (
             <AdminData title="Analysis Types" name="analysis_types"  content={
                <CommonAdminForms table={tableNames.ANALYSIS_TYPES} updateId={this.props.params.id}/>
             } />
        );
    }
}

export class FlowcellTypesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Flowcell Types" name="flowcell_types" content={
                <CommonTable dataStoreKey={tableNames.FLOWCELL_TYPES} table={tableNames.FLOWCELL_TYPES}
                              domain="admin" name="flowcell_types" columns={adminDataColumns[tableNames.FLOWCELL_TYPES]} />
            } />
        );
    }
}

export class FlowcellTypesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Flowcell Types" name="flowcell_types" content={
                <CommonAdminForms table={tableNames.FLOWCELL_TYPES} />
            } />
        );
    }
}

export class FlowcellTypesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Flowcell Types" name="flowcell_types" content={
                <CommonAdminForms table={tableNames.FLOWCELL_TYPES} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class InstrumentsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Instruments" name="instruments" content={
                <CommonTable dataStoreKey={tableNames.INSTRUMENTS} table={tableNames.INSTRUMENTS}
                              domain="admin" name="instruments" columns={adminDataColumns[tableNames.INSTRUMENTS]} />
            } />
        );
    }
}

export class InstrumentsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Instruments" name="instruments" content={
                <CommonAdminForms table={tableNames.INSTRUMENTS} />
            } />
        );
    }
}

export class InstrumentsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Instruments" name="instruments" content={
                <CommonAdminForms table={tableNames.INSTRUMENTS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class libAdaptersListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Library Adapters" name="library_adapters" content={
                <CommonTable dataStoreKey={tableNames.LIBRARY_ADAPTERS} table={tableNames.LIBRARY_ADAPTERS}
                              domain="admin" name="library_adapters" columns={adminDataColumns[tableNames.LIBRARY_ADAPTERS]} />
            } />
        );
    }
}

export class libAdaptersNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Library Adapters" name="library_adapters" content={
                <CommonAdminForms table={tableNames.LIBRARY_ADAPTERS} />
            } />
        );
    }
}

export class libAdaptersUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Library Adapters" name="library_adapters" content={
                <CommonAdminForms table={tableNames.LIBRARY_ADAPTERS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class libProtocolsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Library Protocols" name="library_protocols" content={
                <CommonTable dataStoreKey={tableNames.LIB_PROTOCOLS} table={tableNames.LIB_PROTOCOLS}
                              domain="admin" name="library_protocols" columns={adminDataColumns[tableNames.LIB_PROTOCOLS]} />
            } />
        );
    }
}

export class libProtocolsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Library Protocols" name="library_protocols" content={
                <CommonAdminForms table={tableNames.LIB_PROTOCOLS} />
            } />
        );
    }
}

export class libProtocolsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Library Protocols" name="library_protocols" content={
                <CommonAdminForms table={tableNames.LIB_PROTOCOLS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class libStatesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Library States" name="library_states" content={
                <CommonTable dataStoreKey={tableNames.LIBRARY_STATES} table={tableNames.LIBRARY_STATES}
                              domain="admin" name="library_states" columns={adminDataColumns[tableNames.LIBRARY_STATES]} />
            } />
        );
    }
}

export class libStatesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Library States" name="library_states" content={
                <CommonAdminForms table={tableNames.LIBRARY_STATES} />
            } />
        );
    }
}

export class libStatesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Library States" name="library_states" content={
                <CommonAdminForms table={tableNames.LIBRARY_STATES} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class mappingToolsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Mapping Tools" name="mapping_tools" content={
                <CommonTable dataStoreKey={tableNames.MAPPING_TOOLS} table={tableNames.MAPPING_TOOLS}
                              domain="admin" name="mapping_tools" columns={adminDataColumns[tableNames.MAPPING_TOOLS]} />
            } />
        );
    }
}

export class mappingToolsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Mapping Tools" name="mapping_tools" content={
                <CommonAdminForms table={tableNames.MAPPING_TOOLS} />
            } />
        );
    }
}

export class mappingToolsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Mapping Tools" name="mapping_tools" content={
                <CommonAdminForms table={tableNames.MAPPING_TOOLS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class multiplexIndexesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Multiplex Indexes" name="multiplex_indexes" content={
                <CommonTable dataStoreKey={tableNames.MULTIPLEX_INDEXES} table={tableNames.MULTIPLEX_INDEXES}
                              domain="admin" name="multiplex_indexes" columns={adminDataColumns[tableNames.MULTIPLEX_INDEXES]} />
            } />
        );
    }
}

export class multiplexIndexesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Multiplex Indexes" name="multiplex_indexes" content={
                <CommonAdminForms table={tableNames.MULTIPLEX_INDEXES} />
            } />
        );
    }
}

export class multiplexIndexesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Multiplex Indexes" name="multiplex_indexes" content={
                <CommonAdminForms table={tableNames.MULTIPLEX_INDEXES} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class pipelineVersionListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Pipeline Versions" name="pipeline_versions" content={
                <CommonTable dataStoreKey={tableNames.PIPELINE_VERSIONS} table={tableNames.PIPELINE_VERSIONS}
                              domain="admin" name="pipeline_versions" columns={adminDataColumns[tableNames.PIPELINE_VERSIONS]} />
            } />
        );
    }
}

export class pipelineVersionNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Pipeline Versions" name="pipeline_versions" content={
                <CommonAdminForms table={tableNames.PIPELINE_VERSIONS} />
            } />
        );
    }
}

export class pipelineVersionUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Pipeline Versions" name="pipeline_versions" content={
                <CommonAdminForms table={tableNames.PIPELINE_VERSIONS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class projectAnalysisListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Project Analysis" name="project_analysis" content={
                <CommonTable dataStoreKey={tableNames.PROJECT_ANALYSIS} table={tableNames.PROJECT_ANALYSIS}
                              domain="admin" name="project_analysis" columns={adminDataColumns[tableNames.PROJECT_ANALYSIS]} />
            } />
        );
    }
}

export class projectAnalysisNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Project Analysis" name="project_analysis" content={
                <CommonAdminForms table={tableNames.PROJECT_ANALYSIS} />
            } />
        );
    }
}

export class projectAnalysisUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Project Analysis" name="project_analysis" content={
                <CommonAdminForms table={tableNames.PROJECT_ANALYSIS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class projectStatesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Project States" name="project_states" content={
                <CommonTable dataStoreKey={tableNames.PROJECT_STATES} table={tableNames.PROJECT_STATES}
                             domain="admin" name="project_states" columns={adminDataColumns[tableNames.PROJECT_STATES]} />
            } />
        );
    }
}

export class projectStatesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Project States" name="project_states" content={
                <CommonAdminForms table={tableNames.PROJECT_STATES} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class projectStatesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Project States" name="project_states" content={
                <CommonAdminForms table={tableNames.PROJECT_STATES} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class quantifMethodsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Quantification Methods" name="quantif_methods" content={
                <CommonTable dataStoreKey={tableNames.QUANTIF_METHODS} table={tableNames.QUANTIF_METHODS}
                              domain="admin" name="quantif_methods" columns={adminDataColumns[tableNames.QUANTIF_METHODS]} />
            } />
        );
    }
}

export class quantifMethodsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Quantification Methods" name="quantif_methods" content={
                <CommonAdminForms table={tableNames.QUANTIF_METHODS} />
            } />
        );
    }
}

export class quantifMethodsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Quantification Methods" name="quantif_methods" content={
                <CommonAdminForms table={tableNames.QUANTIF_METHODS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class readLengthsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Read Lengths" name="read_lengths" content={
                <CommonTable dataStoreKey={tableNames.READ_LENGTHS} table={tableNames.READ_LENGTHS}
                              domain="admin" name="read_lengths" columns={adminDataColumns[tableNames.READ_LENGTHS]} />
            } />
        );
    }
}

export class readLengthsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Read Lengths" name="read_lengths" content={
                <CommonAdminForms table={tableNames.READ_LENGTHS} />
            } />
        );
    }
}

export class readLengthsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Read Lengths" name="read_lengths" content={
                <CommonAdminForms table={tableNames.READ_LENGTHS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class runTypesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Run Types" name="run_types" content={
                <CommonTable dataStoreKey={tableNames.RUN_TYPES} table={tableNames.RUN_TYPES}
                             domain="admin" name="run_types" columns={adminDataColumns[tableNames.RUN_TYPES]} />
            } />
        );
    }
}

export class runTypesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Run Types" name="run_types" content={
                <CommonAdminForms table={tableNames.RUN_TYPES} />
            } />
        );
    }
}

export class runTypesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Run Types" name="run_types" content={
                <CommonAdminForms table={tableNames.RUN_TYPES} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class runTypesLengthsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Run Types Lengths" name="run_types_lengths" content={
                <CommonTable dataStoreKey={tableNames.RUN_TYPES_LENGTHS} table={tableNames.RUN_TYPES_LENGTHS}
                             domain="admin" name="run_types_lengths" columns={adminDataColumns[tableNames.RUN_TYPES_LENGTHS]} />
            } />
        );
    }
}

export class runTypesLengthsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Run Types Lengths" name="run_types_lengths" content={
                <CommonAdminForms table={tableNames.RUN_TYPES_LENGTHS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class runTypesLengthsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Run Types Lengths" name="run_types_lengths" content={
                <CommonAdminForms table={tableNames.RUN_TYPES_LENGTHS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class sampleTypesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Sample Types" name="sample_types" content={
                <CommonTable dataStoreKey={tableNames.SAMPLE_TYPES} table={tableNames.SAMPLE_TYPES}
                             domain="admin" name="sample_types" columns={adminDataColumns[tableNames.SAMPLE_TYPES]} />
            } />
        );
    }
}

export class sampleTypesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Sample Types" name="sample_types" content={
                <CommonAdminForms table={tableNames.SAMPLE_TYPES} />
            } />
        );
    }
}

export class samplesTypesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Sample Types" name="sample_types" content={
                <CommonAdminForms table={tableNames.SAMPLE_TYPES} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class seqKitVersionListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Kit Versions" name="sequencing_kit_versions" content={
                <CommonTable dataStoreKey={tableNames.SEQUENCING_KIT_VERSIONS} table={tableNames.SEQUENCING_KIT_VERSIONS}
                              domain="admin" name="sequencing_kit_versions" columns={adminDataColumns[tableNames.SEQUENCING_KIT_VERSIONS]} />
            } />
        );
    }
}

export class seqKitVersionNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Kit Versions" name="sequencing_kit_versions" content={
                <CommonAdminForms table={tableNames.SEQUENCING_KIT_VERSIONS} />
            } />
        );
    }
}

export class seqKitVersionUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Kit Versions" name="sequencing_kit_versions" content={
                <CommonAdminForms table={tableNames.SEQUENCING_KIT_VERSIONS} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class seqQualitiesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Qualities" name="sequencing_qualities" content={
                <CommonTable dataStoreKey={tableNames.SEQUENCING_QUALITIES} table={tableNames.SEQUENCING_QUALITIES}
                              domain="admin" name="sequencing_qualities" columns={adminDataColumns[tableNames.SEQUENCING_QUALITIES]} />
            } />
        );
    }
}

export class seqQualitiesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Qualities" name="sequencing_qualities" content={
                <CommonAdminForms table={tableNames.SEQUENCING_QUALITIES} />
            } />
        );
    }
}

export class seqQualitiesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Qualities" name="sequencing_qualities" content={
                <CommonAdminForms table={tableNames.SEQUENCING_QUALITIES} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class taxonomiesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Taxonomies" name="taxonomies" content={
                <CommonTable dataStoreKey={tableNames.TAXONOMIES} table={tableNames.TAXONOMIES}
                              domain="admin" name="taxonomies" columns={adminDataColumns[tableNames.TAXONOMIES]} />
            } />
        );
    }
}

export class taxonomiesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Taxonomies" name="taxonomies" content={
                <CommonAdminForms table={tableNames.TAXONOMIES} />
            } />
        );
    }
}

export class taxonomiesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Taxonomies" name="taxonomies" content={
                <CommonAdminForms table={tableNames.TAXONOMIES} updateId={this.props.params.id}/>
            } />
        );
    }
}

export class projectSharingsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Project Sharings" name="project_sharings" content={
                <CommonTable dataStoreKey={tableNames.PROJECT_SHARINGS} table={tableNames.PROJECT_SHARINGS}
                             domain="admin" name="project_sharings" columns={adminDataColumns[tableNames.PROJECT_SHARINGS]} />
                //<CommonTable dataStoreKey={tableNames.PROJECT_SHARINGS} table={tableNames.PROJECT_SHARINGS}
                                //columns={adminDataColumns[tableNames.PROJECT_SHARINGS]} />
            }/>
        );
    }
}

export class projectSharingsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Project Sharings" name="project_sharings" content={
                <CommonAdminForms table={tableNames.PROJECT_SHARINGS} />
            } />
        );
    }
}

export class projectSharingsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Project Sharings" name="project_sharings" content={
                <CommonAdminForms table={tableNames.PROJECT_SHARINGS} updateId={this.props.params.id}/>
            } />
        );
    }
}
