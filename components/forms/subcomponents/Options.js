import React from 'react';
import AsyncOptionsList from './AsyncOptionsList';


export class PeopleList extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.last_name +" "+ v.first_name]; }
    render() {
        return <AsyncOptionsList table="people" label="Laboratory"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class ProjectAnalysesList extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="project_analysis" label="Project analysis"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class ProjectStatesList extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="project_states" label="Project states"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class InstrumentsList extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="instruments" label="Machine"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class FlowcellTypes extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.version]; }
    render() {
        return <AsyncOptionsList table="flowcell_types" label="Version"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class SequencingKitVersions extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.version]; }
    render() {
        return <AsyncOptionsList table="sequencing_kit_versions" label="Kit"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class SequencingQualities extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="sequencing_qualities"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

export class RunTypesLengths extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name +' '+ v.length]; }
    render() {
        return <AsyncOptionsList table="run_types_lengths" label="Run type"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}


