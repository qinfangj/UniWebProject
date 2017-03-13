"use strict";
import React from 'react';
import CommonTable from '../../tables/facilityData/CommonTable';
import AnalysisTypeSubmitForm from '../../forms/adminData/AnalysisTypeSubmitForm';
import CommonAdminForms from '../../forms/adminData/CommonAdminForms';



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
                <CommonAdminForms table="pipeline_analysis_types"/>
            </div>
        );
    }
}

export class AnalysisTypeNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="pipeline_analysis_types"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="analysis_types" table="pipeline_analysis_types" columnsKey="analysis_types" />
                </div>
            </div>
        );
    }
}

export class AnalysisTypeUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="pipeline_analysis_types" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="analysis_types" table="pipeline_analysis_types" columnsKey="analysis_types" />
                </div>
            </div>
        );
    }
}

export class FlowcellTypesNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="flowcell_types"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="flowcell_types" table="flowcell_types" columnsKey="flowcell_types" />
                </div>
            </div>
        );
    }
}

export class FlowcellTypesUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="flowcell_types" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="flowcell_types" table="flowcell_types" columnsKey="flowcell_types" />
                </div>
            </div>
        );
    }
}

export class InstrumentsNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="instruments"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="instruments" table="instruments" columnsKey="instruments" />
                </div>
            </div>
        );
    }
}

export class InstrumentsUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="instruments" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="instruments" table="instruments" columnsKey="instruments" />
                </div>
            </div>
        );
    }
}
export class libAdaptersNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="library_adapters"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="library_adapters" table="library_adapters" columnsKey="library_adapters" />
                </div>
            </div>
        );
    }
}

export class libAdaptersUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="library_adapters" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="library_adapters" table="library_adapters" columnsKey="library_adapters" />
                </div>
            </div>
        );
    }
}
export class libProtocolsNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="lib_protocols"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="lib_protocols" table="lib_protocols" columnsKey="lib_protocols" />
                </div>
            </div>
        );
    }
}

export class libProtocolsUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="lib_protocols" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="lib_protocols" table="lib_protocols" columnsKey="lib_protocols" />
                </div>
            </div>
        );
    }
}

export class libStatesNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="library_states"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="library_states" table="library_states" columnsKey="library_states" />
                </div>
            </div>
        );
    }
}

export class libStatesUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="library_states" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="library_states" table="library_states" columnsKey="library_states" />
                </div>
            </div>
        );
    }
}

export class mappingToolsNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="mapping_tools"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="mapping_tools" table="mapping_tools" columnsKey="mapping_tools" />
                </div>
            </div>
        );
    }
}

export class mappingToolsUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="library_states" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="mapping_tools" table="mapping_tools" columnsKey="mapping_tools" />
                </div>
            </div>
        );
    }
}
export class multiplexIndexesNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="multiplex_indexes"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="multiplex_indexes" table="multiplex_indexes" columnsKey="multiplex_indexes" />
                </div>
            </div>
        );
    }
}

export class multiplexIndexesUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="multiplex_indexes" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="multiplex_indexes" table="multiplex_indexes" columnsKey="multiplex_indexes" />
                </div>
            </div>
        );
    }
}

export class pipelineVersionNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="pipeline_versions"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="pipeline_versions" table="pipeline_versions" columnsKey="pipeline_versions" />
                </div>
            </div>
        );
    }
}

export class pipelineVersionUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="pipeline_versions" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="pipeline_versions" table="pipeline_versions" columnsKey="pipeline_versions" />
                </div>
            </div>
        );
    }
}
export class projectAnalysisNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="project_analysis"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="project_analysis" table="project_analysis" columnsKey="project_analysis" />
                </div>
            </div>
        );
    }
}

export class projectAnalysisUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="project_analysis" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="project_analysis" table="project_analysis" columnsKey="project_analysis" />
                </div>
            </div>
        );
    }
}

export class projectStatesNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="project_states"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="project_states" table="project_states" columnsKey="project_states" />
                </div>
            </div>
        );
    }
}

export class projectStatesUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="project_states" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="project_states" table="project_states" columnsKey="project_states" />
                </div>
            </div>
        );
    }
}
export class quantifMethodsNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="quantif_methods"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="quantif_methods" table="quantif_methods" columnsKey="quantif_methods" />
                </div>
            </div>
        );
    }
}

export class quantifMethodsUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="quantif_methods" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="quantif_methods" table="quantif_methods" columnsKey="quantif_methods" />
                </div>
            </div>
        );
    }
}
export class readLengthsNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="read_lengths"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="read_lengths" table="read_lengths" columnsKey="read_lengths" />
                </div>
            </div>
        );
    }
}

export class readLengthsUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="read_lengths" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="read_lengths" table="read_lengths" columnsKey="read_lengths" />
                </div>
            </div>
        );
    }
}

export class runTypesNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="run_types"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="run_types" table="run_types" columnsKey="run_types" />
                </div>
            </div>
        );
    }
}

export class runTypesUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="run_types" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="run_types" table="run_types" columnsKey="run_types" />
                </div>
            </div>
        );
    }
}
export class runTypesLengthsNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="run_types_lengths"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="run_types_lengths" table="run_types_lengths" columnsKey="run_types_lengths" />
                </div>
            </div>
        );
    }
}

export class runTypesLengthsUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="run_types_lengths" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="run_types_lengths" table="run_types_lengths" columnsKey="run_types_lengths" />
                </div>
            </div>
        );
    }
}

export class sampleTypesNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="sample_types"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="sample_types" table="sample_types" columnsKey="sample_types" />
                </div>
            </div>
        );
    }
}

export class samplesTypesUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="sample_types" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="sample_types" table="sample_types" columnsKey="sample_types" />
                </div>
            </div>
        );
    }
}

export class seqKitVersionNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="sequencing_kit_versions"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="sequencing_kit_versions" table="sequencing_kit_versions" columnsKey="sequencing_kit_versions" />
                </div>
            </div>
        );
    }
}

export class seqKitVersionUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="sequencing_kit_versions" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="sequencing_kit_versions" table="sequencing_kit_versions" columnsKey="sequencing_kit_versions" />
                </div>
            </div>
        );
    }
}

export class seqQualitiesNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="sequencing_qualities"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="sequencing_qualities" table="sequencing_qualities" columnsKey="sequencing_qualities" />
                </div>
            </div>
        );
    }
}

export class seqQualitiesUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="sequencing_qualities" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="sequencing_qualities" table="sequencing_qualities" columnsKey="sequencing_qualities" />
                </div>
            </div>
        );
    }
}

export class taxonomiesNewPage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="taxonomies"/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="taxonomies" table="taxonomies" columnsKey="taxonomies" />
                </div>
            </div>
        );
    }
}

export class taxonomiesUpdatePage extends React.Component {
    render() {
        return (
            <div>
                <CommonAdminForms table="taxonomies" updateId={this.props.params.id}/>
                <div className="clearfix"/>
                <div>
                    <CommonTable dataStoreKey="taxonomies" table="taxonomies" columnsKey="taxonomies" />
                </div>
            </div>
        );
    }
}