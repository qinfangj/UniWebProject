import React from 'react';
import AsyncOptionsList from './AsyncOptionsList';


class PeopleList extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.last_name +" "+ v.first_name]; }
    render() {
        return <AsyncOptionsList table="people" label="Laboratory"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

class ProjectAnalysesList extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="project_analysis" label="Project analysis"
                                formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}

class ProjectStatesList extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList table="project_states" label="Project states"
                                 formatter={this.formatter} ref={(c) => {this._select = c;}} />;
    }
}


export {
    PeopleList,
    ProjectAnalysesList,
    ProjectStatesList,
}