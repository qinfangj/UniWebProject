"use strict";
import React from 'react';
import CommonTable from '../../tables/facilityData/CommonTable';
import AnalysisTypeSubmitForm from '../../forms/adminData/AnalysisTypeSubmitForm';
import CommonAdminForms from '../../forms/adminData/CommonAdminForms';
import ProjectSharingsForm from '../../forms/adminData/ProjectSharingSubmitForm';
import AdminData from '../../pages/AdminData';




export class UserPage extends React.Component {

    render() {
        return (
            <div>Account page in construction</div>
        );
    }

}

export class LimsUserPage extends React.Component {
    render() {
        return (
            <div>
                Account page in construction
            </div>
        );
    }
}

export class AnalysisTypeListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Analysis Types" name="analysis_types" content={
                <CommonTable dataStoreKey="analysis_types" table="pipeline_analysis_types" columnsKey="analysis_types" />
            } />
        );
    }
}

export class AnalysisTypeNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Analysis Types" name="analysis_types"  content={
                <CommonAdminForms table="pipeline_analysis_types"/>
            } />
        );
    }
}

export class AnalysisTypeUpdatePage extends React.Component {
    render() {
        return (
             <AdminData title="Analysis Types" name="analysis_types"  content={
                <CommonAdminForms table="pipeline_analysis_types" updateId={this.props.params.id}/>
             } />
        );
    }
}

export class FlowcellTypesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Flowcell Types" name="flowcell_types" content={
                <CommonTable dataStoreKey="flowcell_types" table="flowcell_types" columnsKey="flowcell_types" />
            } />
        );
    }
}

export class FlowcellTypesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Flowcell Types" name="flowcell_types" content={
                    <CommonAdminForms table="flowcell_types"  />
            } />
        );
    }
}

export class FlowcellTypesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Flowcell Types" name="flowcell_types" content={
                <CommonAdminForms table="flowcell_types"  updateId={this.props.params.id}/>
            } />
        );
    }
}

export class InstrumentsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Instruments" name="instruments" content={
                <CommonTable dataStoreKey="instruments" table="instruments" columnsKey="instruments" />
            } />
        );
    }
}

export class InstrumentsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Instruments" name="instruments" content={
                <CommonAdminForms table="instruments"  />
            } />
        );
    }
}

export class InstrumentsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Instruments" name="instruments" content={
                <CommonAdminForms table="instruments"  updateId={this.props.params.id}/>
            } />
        );
    }
}

export class libAdaptersListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Library Adapter" name="library_adapters" content={
                <CommonTable dataStoreKey="library_adapters" table="library_adapters" columnsKey="library_adapters" />
            } />
        );
    }
}

export class libAdaptersNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Library Adapter" name="library_adapters" content={
                <CommonAdminForms table="library_adapters" />
            } />
        );
    }
}

export class libAdaptersUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Library Adapter" name="library_adapters" content={
                <CommonAdminForms table="library_adapters" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class libProtocolsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Library Protocols" name="library_protocols" content={
                <CommonTable dataStoreKey="lib_protocols" table="lib_protocols" columnsKey="lib_protocols" />
            } />
        );
    }
}

export class libProtocolsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Library Protocols" name="library_protocols" content={
                <CommonAdminForms table="lib_protocols" />
            } />
        );
    }
}

export class libProtocolsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Library Protocols" name="library_protocols" content={
                <CommonAdminForms table="lib_protocols" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class libStatesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Library States" name="library_states" content={
                <CommonTable dataStoreKey="library_states" table="library_states" columnsKey="library_states" />
            } />
        );
    }
}

export class libStatesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Library States" name="library_states" content={
                <CommonAdminForms table="library_states" />
            } />
        );
    }
}

export class libStatesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Library States" name="library_states" content={
                <CommonAdminForms table="library_states" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class mappingToolsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Mapping Tools" name="mapping_tools" content={
                <CommonTable dataStoreKey="mapping_tools" table="mapping_tools" columnsKey="mapping_tools" />
            } />
        );
    }
}

export class mappingToolsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Mapping Tools" name="mapping_tools" content={
                <CommonAdminForms table="mapping_tools" />
            } />
        );
    }
}

export class mappingToolsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Mapping Tools" name="mapping_tools" content={
                <CommonAdminForms table="mapping_tools" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class multiplexIndexesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Multiplex Indexes" name="multiplex_indexes" content={
                <CommonTable dataStoreKey="multiplex_indexes" table="multiplex_indexes" columnsKey="multiplex_indexes" />
            } />
        );
    }
}

export class multiplexIndexesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Multiplex Indexes" name="multiplex_indexes" content={
                <CommonAdminForms table="multiplex_indexes" />
            } />
        );
    }
}

export class multiplexIndexesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Multiplex Indexes" name="multiplex_indexes" content={
                <CommonAdminForms table="multiplex_indexes" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class pipelineVersionListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Pipeline Version" name="pipeline_versions" content={
                <CommonTable dataStoreKey="pipeline_versions" table="pipeline_versions" columnsKey="pipeline_versions" />
            } />
        );
    }
}

export class pipelineVersionNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Pipeline Version" name="pipeline_versions" content={
                <CommonAdminForms table="pipeline_versions" />
            } />
        );
    }
}

export class pipelineVersionUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Pipeline Version" name="pipeline_versions" content={
                <CommonAdminForms table="pipeline_versions" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class projectAnalysisListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Project Analysis" name="project_analysis" content={
                <CommonTable dataStoreKey="project_analysis" table="project_analysis" columnsKey="project_analysis" />
            } />
        );
    }
}

export class projectAnalysisNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Project Analysis" name="project_analysis" content={
                <CommonAdminForms table="project_analysis" />
            } />
        );
    }
}

export class projectAnalysisUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Project Analysis" name="project_analysis" content={
                <CommonAdminForms table="project_analysis" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class projectStatesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Project States" name="project_states" content={
                <CommonTable dataStoreKey="project_states" table="project_states" columnsKey="project_states" />
            } />
        );
    }
}

export class projectStatesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Project States" name="project_states" content={
                <CommonAdminForms table="project_states" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class projectStatesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Project States" name="project_states" content={
                <CommonAdminForms table="project_states" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class quantifMethodsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Quantification Methods" name="quantif_methods" content={
                <CommonTable dataStoreKey="quantif_methods" table="quantif_methods" columnsKey="quantif_methods" />
            } />
        );
    }
}

export class quantifMethodsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Quantification Methods" name="quantif_methods" content={
                <CommonAdminForms table="quantif_methods" />
            } />
        );
    }
}

export class quantifMethodsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Quantification Methods" name="quantif_methods" content={
                <CommonAdminForms table="quantif_methods" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class readLengthsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Read Lengths" name="read_lengths" content={
                <CommonTable dataStoreKey="read_lengths" table="read_lengths" columnsKey="read_lengths" />
            } />
        );
    }
}

export class readLengthsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Read Lengths" name="read_lengths" content={
                <CommonAdminForms table="read_lengths" />
            } />
        );
    }
}

export class readLengthsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Read Lengths" name="read_lengths" content={
                <CommonAdminForms table="read_lengths" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class runTypesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Run Types" name="run_types" content={
                <CommonTable dataStoreKey="run_types" table="run_types" columnsKey="run_types" />
            } />
        );
    }
}

export class runTypesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Run Types" name="run_types" content={
                <CommonAdminForms table="run_types" />
            } />
        );
    }
}

export class runTypesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Run Types" name="run_types" content={
                <CommonAdminForms table="run_types" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class runTypesLengthsListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Run Types Lengths" name="run_types_lengths" content={
                <CommonTable dataStoreKey="run_types_lengths" table="run_types_lengths" columnsKey="run_types_lengths" />
            } />
        );
    }
}

export class runTypesLengthsNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Run Types Lengths" name="run_types_lengths" content={
                <CommonAdminForms table="run_types_lengths" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class runTypesLengthsUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Run Types Lengths" name="run_types_lengths" content={
                <CommonAdminForms table="run_types_lengths" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class sampleTypesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Sample Types" name="sample_types" content={
                <CommonTable dataStoreKey="sample_types" table="sample_types" columnsKey="sample_types" />
            } />
        );
    }
}

export class sampleTypesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Sample Types" name="sample_types" content={
                <CommonAdminForms table="sample_types" />
            } />
        );
    }
}

export class samplesTypesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Sample Types" name="sample_types" content={
                <CommonAdminForms table="sample_types" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class seqKitVersionListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Kit Version" name="sequencing_kit_versions" content={
                <CommonTable dataStoreKey="sequencing_kit_versions" table="sequencing_kit_versions" columnsKey="sequencing_kit_versions" />
            } />
        );
    }
}

export class seqKitVersionNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Kit Version" name="sequencing_kit_versions" content={
                <CommonAdminForms table="sequencing_kit_versions" />
            } />
        );
    }
}

export class seqKitVersionUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Kit Version" name="sequencing_kit_versions" content={
                <CommonAdminForms table="sequencing_kit_versions" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class seqQualitiesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Qualities" name="sequencing_qualities" content={
                <CommonTable dataStoreKey="sequencing_qualities" table="sequencing_qualities" columnsKey="sequencing_qualities" />
            } />
        );
    }
}

export class seqQualitiesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Qualities" name="sequencing_qualities" content={
                <CommonAdminForms table="sequencing_qualities" />
            } />
        );
    }
}

export class seqQualitiesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Sequencing Qualities" name="sequencing_qualities" content={
                <CommonAdminForms table="sequencing_qualities" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class taxonomiesListRoute extends React.Component {
    render() {
        return (
            <AdminData title="Taxonomies" name="taxonomies" content={
                <CommonTable dataStoreKey="taxonomies" table="taxonomies" columnsKey="taxonomies" />
            } />
        );
    }
}

export class taxonomiesNewPage extends React.Component {
    render() {
        return (
            <AdminData title="Taxonomies" name="taxonomies" content={
                <CommonAdminForms table="taxonomies" />
            } />
        );
    }
}

export class taxonomiesUpdatePage extends React.Component {
    render() {
        return (
            <AdminData title="Taxonomies" name="taxonomies" content={
                <CommonAdminForms table="taxonomies" updateId={this.props.params.id}/>
            } />
        );
    }
}

export class projectSharingsNewPage extends React.Component {
    render() {
        return (
            <div>
                <ProjectSharingsForm table="project_sharings"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="project_sharings" table="project_sharings" columnsKey="project_sharings" />
                </div>
            </div>
        );
    }
}

export class projectSharingsUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <ProjectSharingsForm table="project_sharings" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="project_sharings" table="project_sharings" columnsKey="project_sharings" />
                </div>
            </div>
        );
    }
}