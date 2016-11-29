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

export class Projects extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.last_name +" - "+ v.name]; }
    render() {
        return <AsyncOptionsList table="projects" label="Project" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

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
        return <AsyncOptionsList table="run_types_lengths" label="Run type" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

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
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class Taxonomies extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="taxonomies" label="Organism" form={this.props.form}
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}


