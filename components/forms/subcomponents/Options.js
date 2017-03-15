"use strict";
import React from 'react';
import AsyncOptionsList from './AsyncOptionsList';
import dataStoreKeys from '../../constants/dataStoreKeys';
import fields from '../fields';



/** In Runs */
export class Instruments extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.INSTRUMENT_ID} table="instruments" label="Machine"
                                 storeKey={dataStoreKeys.INSTRUMENTS}
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
                                 storeKey={dataStoreKeys.LIB_PROTOCOLS}
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
                                 storeKey={dataStoreKeys.LIB_ADAPTERS}
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
                                 storeKey={dataStoreKeys.LIB_STATES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Runs */
export class FlowcellTypes extends React.Component {
    formatter(v) { return [v.id, v.version]; }
    render() {
        return <AsyncOptionsList field={fields.FLOWCELL_TYPE_ID} table="flowcell_types" label="Version"
                                 storeKey={dataStoreKeys.FLOWCELL_TYPES}
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
                                 storeKey={dataStoreKeys.MAPPING_TOOLS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Libraries (twice: 5'-3') */
export class MultiplexIndexes extends React.Component {
    formatter(v) { return [v.id, v.name +" - "+ v.sequence]; }
    render() {
        return <AsyncOptionsList field={fields.MULTIPLEX_INDEX_ID} table="multiplex_indexes"
                                 storeKey={dataStoreKeys.MULTIPLEX_INDEXES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}
MultiplexIndexes.propTypes = {
    suffix: React.PropTypes.string.isRequired,
};

/** In Projects */
export class People extends React.Component {
    formatter(v) { return [v.id, v.lastName +" "+ v.firstName]; }
    render() {
        return <AsyncOptionsList field={fields.PERSON_ID} table="people" label="Laboratory"
                                 storeKey={dataStoreKeys.PEOPLE}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** In Basecallings and Alignments */
export class PipelineAnalysisTypes extends React.Component {
    formatter(v) { return [v.id, v.description]; }
    render() {
        return <AsyncOptionsList field={fields.ANALYSIS_TYPE_ID} table="pipeline_analysis_types" label="Analysis type"
                                 storeKey={dataStoreKeys.PIPELINE_ANALYSIS_TYPES}
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
                                 storeKey={dataStoreKeys.PIPELINE_VERSIONS}
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
                                 storeKey={dataStoreKeys.PROJECT_ANALYSES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}

/** Projects with samples, for User requests and Libraries */
export class ProjectsWithSamples extends React.Component {
    render() {
        return <Projects suffix="samples" {...this.props} />;
    }
}
ProjectsWithSamples.defaultProps = {
    storeKey: dataStoreKeys.PROJECTS_HAVING_A_SAMPLE,
    field: fields.PROJECT_ID,
};

/** Projects with libraries, in Runs and Bioanalysers.
  * In Bioanalysers it is used in many rows, so we must set a special form key + data key.
  */
export class ProjectsWithLibraries extends React.Component {
    render() {
        return <Projects suffix="libs" label={null} {...this.props} />;
    }
}
ProjectsWithLibraries.defaultProps = {
    storeKey: dataStoreKeys.PROJECTS_HAVING_A_LIBRARY,
    field: fields.PROJECT_ID,
};

/** Projects with pool, in pre-Runs.
  * In pre-Runs it is used in many rows, so we must set a special form key.
  */
export class ProjectsWithPool extends React.Component {
    render() {
        return <Projects suffix="pools" label={null} {...this.props} />;
    }
}
ProjectsWithPool.defaultProps = {
    storeKey: dataStoreKeys.PROJECTS_HAVING_A_POOL,
    field: fields.PROJECT_ID,
};

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
    field: React.PropTypes.string.isRequired,
    form: React.PropTypes.string.isRequired,
    suffix: React.PropTypes.string.isRequired,  // url arg for conditional list
    storeKey: React.PropTypes.string,  // store key for the result list
};
Projects.defaultProps = {
    field: fields.PROJECT_ID,
    storeKey: dataStoreKeys.PROJECTS,
    suffix: "all",
    label: "Project",
};


/** In Projects */
export class ProjectStates extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.PROJECT_STATE_ID} table="project_states" label="Project state"
                                 storeKey={dataStoreKeys.PROJECT_STATES}
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
                                 storeKey={dataStoreKeys.QUANTIF_METHODS}
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
                                 storeKey={dataStoreKeys.RUNS_OUTPUT_FOLDERS}
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
                                 storeKey={dataStoreKeys.RUN_TYPES_LENGTHS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}
RunTypesLengths.propTypes = {
    suffix: React.PropTypes.string.isRequired,
};

/** In Samples */
export class SampleTypes extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.SAMPLE_TYPE_ID} table="sample_types" label="Sample type"
                                 storeKey={dataStoreKeys.SAMPLE_TYPES}
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
                                 storeKey={dataStoreKeys.SEQUENCING_KIT_VERSIONS}
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
                                 storeKey={dataStoreKeys.SEQUENCING_QUALITIES}
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
                                 storeKey={dataStoreKeys.TAXONOMIES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}


