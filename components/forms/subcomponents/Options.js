import React from 'react';
import AsyncOptionsList from './AsyncOptionsList';



export class Instruments extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="instruments" label="Machine" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class LibProtocols extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.short_name]; }
    render() {
        return <AsyncOptionsList table="lib_protocols" label="Library type" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class LibraryAdapters extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="library_adapters" label="Adapter" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class LibraryStates extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.state_order +" - "+ v.name]; }
    render() {
        return <AsyncOptionsList table="library_states" label="Library state" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class FlowcellTypes extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.version]; }
    render() {
        return <AsyncOptionsList table="flowcell_types" label="Version" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class MappingTools extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="mapping_tools" label="Mapping tool" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class MutliplexIndexes extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name +" - "+ v.sequence]; }
    render() {
        return <AsyncOptionsList table="multiplex_indexes" form={this.props.form}
                                 label={this.props.label}
                                 all = {this.props.all}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class People extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.last_name +" "+ v.first_name]; }
    render() {
        return <AsyncOptionsList table="people" label="Laboratory" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class PipelineAnalysisTypes extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.description]; }
    render() {
        return <AsyncOptionsList table="pipeline_analysis_types" label="Analysis type" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class PipelineVersions extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.software_name +" - "+ v.number]; }
    render() {
        return <AsyncOptionsList table="pipeline_versions" label="Pipeline version" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class ProjectAnalyses extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="project_analysis" label="Project analysis" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

/* Projects with libraries, for the pre-runs insert form */
export class ProjectsWithLibraries extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="projects" label={null} form={this.props.form}
                                 storeKey={this.props.storeKey}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

/* With the parameter `all`, which calls a different view */
export class Projects extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.last_name +" - "+ v.name]; }
    render() {
        return <AsyncOptionsList table="projects"
            label={this.props.label === undefined ? "Project" : this.props.label}
            form={this.props.form}
            all={this.props.all}
            storeKey={this.props.storeKey}
            selectProps={this.props.selectProps}
            formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}
Projects.propTypes = {
    all: React.PropTypes.bool.isRequired,
    storeKey: React.PropTypes.string,  // store key for the result list
    selectProps: React.PropTypes.object,  // other props to pass to the Select lower-level component
};

export class ProjectStates extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="project_states" label="Project states" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class QuantifMethods extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="quantif_methods" label="Quantification" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class RunsOutputFolders extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.run_folder]; }
    render() {
        return <AsyncOptionsList table="runs" label="Run" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class RunTypesLengths extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name +' '+ v.length]; }
    render() {
        console.debug(this.props.form, "run_types_lengths")
        return <AsyncOptionsList table="run_types_lengths" label="Run type" form={this.props.form}
                                 all={this.props.all}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}
Projects.propTypes = {
    all: React.PropTypes.bool.isRequired,
};

export class SampleTypes extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="sample_types" label="Sample type" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class SequencingKitVersions extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.version]; }
    render() {
        return <AsyncOptionsList table="sequencing_kit_versions" label="Kit" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class SequencingQualities extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="sequencing_qualities" form={this.props.form}
                                 selectProps={this.props.selectProps}
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
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}


