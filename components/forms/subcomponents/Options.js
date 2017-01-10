import React from 'react';
import AsyncOptionsList from './AsyncOptionsList';
import dataStoreKeys from '../../constants/dataStoreKeys';


export function getControlLanes() {
    return [[0,'No'], [1,'1'], [2,'2'], [3,'3'], [4,'4'], [5,'5'], [6,'6'], [7,'7'], [8,'8']];
}

export function getRunStages() {
    return [[1,'--'], [2,'A'], [3,'B']];
}


export class Instruments extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="instruments" label="Machine" form={this.props.form}
                                 storeKey={dataStoreKeys.INSTRUMENTS}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class LibProtocols extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.short_name]; }
    render() {
        return <AsyncOptionsList table="lib_protocols" label="Library type" form={this.props.form}
                                 storeKey={dataStoreKeys.LIB_PROTOCOLS}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class LibraryAdapters extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="library_adapters" label="Adapter" form={this.props.form}
                                 storeKey={dataStoreKeys.LIB_ADAPTERS}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class LibraryStates extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.state_order +" - "+ v.name]; }
    render() {
        return <AsyncOptionsList table="library_states" label="Library state" form={this.props.form}
                                 storeKey={dataStoreKeys.LIB_STATES}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class FlowcellTypes extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.version]; }
    render() {
        return <AsyncOptionsList table="flowcell_types" label="Version" form={this.props.form}
                                 storeKey={dataStoreKeys.FLOWCELL_TYPES}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class MappingTools extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="mapping_tools" label="Mapping tool" form={this.props.form}
                                 storeKey={dataStoreKeys.MAPPING_TOOLS}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class MultiplexIndexes extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name +" - "+ v.sequence]; }
    render() {
        return <AsyncOptionsList table="multiplex_indexes" form={this.props.form}
                                 label={this.props.label}
                                 suffix = {this.props.suffix}
                                 storeKey={dataStoreKeys.MULTIPLEX_INDEXES}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}
MultiplexIndexes.propTypes = {
    suffix: React.PropTypes.string.isRequired,
};

export class People extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.last_name +" "+ v.first_name]; }
    render() {
        return <AsyncOptionsList table="people" label="Laboratory" form={this.props.form}
                                 storeKey={dataStoreKeys.PEOPLE}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class PipelineAnalysisTypes extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.description]; }
    render() {
        return <AsyncOptionsList table="pipeline_analysis_types" label="Analysis type" form={this.props.form}
                                 storeKey={dataStoreKeys.PIPELINE_ANALYSIS_TYPES}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class PipelineVersions extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.software_name +" - "+ v.number]; }
    render() {
        return <AsyncOptionsList table="pipeline_versions" label="Pipeline version" form={this.props.form}
                                 storeKey={dataStoreKeys.PIPELINE_VERSIONS}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class ProjectAnalyses extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="project_analysis" label="Project analysis" form={this.props.form}
                                 storeKey={dataStoreKeys.PROJECT_ANALYSES}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

/* Projects with libraries, for Runs and Bioanalysers */
export function ProjectsWithLibraries(form, storeKey, props) {
    return <Projects suffix="libs" label={null} form={form} storeKey={storeKey} {...props} />;
}

/* Projects with samples, for User requests and Libraries */
export function ProjectsWithSamples(form, storeKey, props) {
    return <Projects suffix="samples" form={form} storeKey={storeKey} {...props} />;
}

/* Projects with pool, for pre-Runs */
export function ProjectsWithPool(form, storeKey, props) {
    return <Projects suffix="pools" label={null} form={form} storeKey={storeKey} {...props} />;
}

/* All projects */
export class Projects extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.last_name +" - "+ v.name]; }
    render() {
        return <AsyncOptionsList table="projects"
            label={this.props.label}
            form={this.props.form}
            suffix={this.props.suffix}
            storeKey={this.props.storeKey}
            selectProps={this.props.selectProps}
            formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}
Projects.propTypes = {
    suffix: React.PropTypes.string.isRequired,  // url arg for conditional list
    storeKey: React.PropTypes.string,  // store key for the result list
    selectProps: React.PropTypes.object,  // other props to pass to the Select lower-level component
};
Projects.defaultProps = {
    suffix: "all",
    label: "Project",
    storeKey: dataStoreKeys.PROJECTS,
};


export class ProjectStates extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="project_states" label="Project states" form={this.props.form}
                                 storeKey={dataStoreKeys.PROJECT_STATES}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class QuantifMethods extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="quantif_methods" label="Quantification" form={this.props.form}
                                 storeKey={dataStoreKeys.QUANTIF_METHODS}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class RunsOutputFolders extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.run_folder]; }
    render() {
        return <AsyncOptionsList table="runs" label="Run" form={this.props.form}
                                 storeKey={dataStoreKeys.RUNS_OUTPUT_FOLDERS}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class RunTypesLengths extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name +' '+ v.length]; }
    render() {
        return <AsyncOptionsList table="run_types_lengths" label="Run type" form={this.props.form}
                                 suffix={this.props.suffix}
                                 storeKey={dataStoreKeys.RUN_TYPES_LENGTHS}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}
Projects.propTypes = {
    suffix: React.PropTypes.string.isRequired,
};

export class SampleTypes extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="sample_types" label="Sample type" form={this.props.form}
                                 storeKey={dataStoreKeys.SAMPLE_TYPES}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class SequencingKitVersions extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.version]; }
    render() {
        return <AsyncOptionsList table="sequencing_kit_versions" label="Kit" form={this.props.form}
                                 storeKey={dataStoreKeys.SEQUENCING_KIT_VERSIONS}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class SequencingQualities extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="sequencing_qualities" form={this.props.form}
                                 selectProps={this.props.selectProps}
                                 storeKey={dataStoreKeys.SEQUENCING_QUALITIES}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}
Projects.propTypes = {
    selectProps: React.PropTypes.object,
};

export class Taxonomies extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="taxonomies" label="Organism" form={this.props.form}
                                 storeKey={dataStoreKeys.TAXONOMIES}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}


