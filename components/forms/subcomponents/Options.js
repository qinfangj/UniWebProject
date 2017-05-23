"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import AsyncOptionsList from './AsyncOptionsList';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import fields from '../fields';



/** In Runs */
export class FlowcellTypes extends React.Component {
    formatter(v) { return [v.id, v.version]; }
    render() {
        return <AsyncOptionsList field={fields.FLOWCELL_TYPE_ID} table="flowcell_types" label="Version"
                                 storeKey={optionsStoreKeys.FLOWCELL_TYPES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Runs */
export class Instruments extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.INSTRUMENT_ID} table="instruments" label="Machine"
                                 storeKey={optionsStoreKeys.INSTRUMENTS}
                                 formatter={this.formatter}
                                 {...this.props}
                                  />;
    }
}

/** In Libraries */
export class LibraryAdapters extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.ADAPTER_ID} table="library_adapters" label="Adapter"
                                 storeKey={optionsStoreKeys.LIB_ADAPTERS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Libraries and UserRequests ("Library type") */
export class LibProtocols extends React.Component {
    formatter(v) { return [v.id, v.shortName]; }
    render() {
        return <AsyncOptionsList field={fields.LIB_PROTOCOL_ID} table="lib_protocols" label="Library type"
                                 storeKey={optionsStoreKeys.LIB_PROTOCOLS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Libraries */
export class LibraryStates extends React.Component {
    formatter(v) { return [v.id, v.stateOrder +" - "+ v.name]; }
    render() {
        return <AsyncOptionsList field={fields.LIBRARY_STATE_ID} table="library_states" label="Library state"
                                 storeKey={optionsStoreKeys.LIB_STATES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Runs */
export class MappingTools extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.MAPPING_TOOL_ID} table="mapping_tools" label="Mapping tool"
                                 storeKey={optionsStoreKeys.MAPPING_TOOLS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Libraries (twice: 5'-3') */
export class MultiplexIndexes extends React.Component {
    formatter(v) { return [v.id, v.name +" - "+ v.sequence]; }
    render() {
        return <AsyncOptionsList table="multiplex_indexes"
                                 storeKey={optionsStoreKeys.MULTIPLEX_INDEXES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}
MultiplexIndexes.propTypes = {
    suffix: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
};

/** In Project sharings(?) */
export class People extends React.Component {
    formatter(v) { return [v.id, v.lastName +" "+ v.firstName]; }
    render() {
        return <AsyncOptionsList field={fields.PERSON_ID} table="people" label="Collaborator"
                                 storeKey={optionsStoreKeys.PEOPLE}
                                 formatter={this.formatter}
                                 suffix="all"
                                 {...this.props}
        />;
    }
}

/** In Projects. Rows from the people table that represent a lab/PI. */
export class Laboratories extends React.Component {
    formatter(v) { return [v.id, v.lastName +" "+ v.firstName]; }
    render() {
        return <AsyncOptionsList field={fields.PERSON_ID} table="people" label="Laboratory"
                                 storeKey={optionsStoreKeys.PEOPLE}
                                 formatter={this.formatter}
                                 suffix="labs"
                                 {...this.props}
        />;
    }
}

/** In Basecallings and Alignments */
export class PipelineAnalysisTypes extends React.Component {
    formatter(v) { return [v.id, v.description]; }
    render() {
        return <AsyncOptionsList field={fields.ANALYSIS_TYPE_ID} table="pipeline_analysis_types" label="Analysis type"
                                 storeKey={optionsStoreKeys.PIPELINE_ANALYSIS_TYPES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Basecallings */
export class PipelineVersions extends React.Component {
    formatter(v) { return [v.id, v.softwareName +" - "+ v.number]; }
    render() {
        return <AsyncOptionsList field={fields.PIPELINE_VERSION_ID} table="pipeline_versions" label="Pipeline version"
                                 storeKey={optionsStoreKeys.PIPELINE_VERSIONS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Projects */
export class ProjectAnalyses extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.PROJECT_ANALYSIS_ID} table="project_analysis" label="Project analysis"
                                 storeKey={optionsStoreKeys.PROJECT_ANALYSES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** All projects */
export class Projects extends React.Component {
    formatter(v) { return [v.id, v.lastName +" - "+ v.name]; }
    render() {
        return <AsyncOptionsList table="projects"
                                 formatter={this.formatter}
                                 {...this.props}
               />;
    }
}
Projects.propTypes = {
    field: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,  // url arg for conditional list
    storeKey: PropTypes.string,  // store key for the result list
};
Projects.defaultProps = {
    field: fields.PROJECT_ID,
    storeKey: optionsStoreKeys.PROJECTS,
    suffix: "all",
    label: "Project",
};


/** In Projects */
export class ProjectStates extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.PROJECT_STATE_ID} table="project_states" label="Project state"
                                 storeKey={optionsStoreKeys.PROJECT_STATES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Samples and Libraries */
export class QuantifMethods extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.QUANTIF_METHOD_ID} table="quantif_methods" label="Quantification"
                                 storeKey={optionsStoreKeys.QUANTIF_METHODS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Alignments and Basecallings */
export class RunsOutputFolders extends React.Component {
    formatter(v) { return [v.id, v.runFolder]; }
    render() {
        return <AsyncOptionsList field={fields.RUN_ID} table="runs" label="Run"
                                 storeKey={optionsStoreKeys.RUNS_OUTPUT_FOLDERS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Runs and UserRequests */
export class RunTypesLengths extends React.Component {
    formatter(v) { return [v.id, v.name +' '+ v.length]; }
    render() {
        return <AsyncOptionsList field={fields.RUN_TYPES_LENGTH_ID} table="run_types_lengths" label="Run type"
                                 suffix={this.props.suffix}
                                 storeKey={optionsStoreKeys.RUN_TYPES_LENGTHS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}
RunTypesLengths.propTypes = {
    suffix: PropTypes.string.isRequired,
};

/** In Samples */
export class SampleTypes extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.SAMPLE_TYPE_ID} table="sample_types" label="Sample type"
                                 storeKey={optionsStoreKeys.SAMPLE_TYPES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Runs */
export class SequencingKitVersions extends React.Component {
    formatter(v) { return [v.id, v.version]; }
    render() {
        return <AsyncOptionsList field={fields.SEQUENCING_KIT_VERSION_ID} table="sequencing_kit_versions" label="Kit"
                                 storeKey={optionsStoreKeys.SEQUENCING_KIT_VERSIONS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Runs sub-form (QC column) */
export class SequencingQualities extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.QUALITY_ID} table="sequencing_qualities"
                                 storeKey={optionsStoreKeys.SEQUENCING_QUALITIES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Genomes and Samples */
export class Taxonomies extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.TAXO_ID} table="taxonomies" label="Organism"
                                 storeKey={optionsStoreKeys.TAXONOMIES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}


