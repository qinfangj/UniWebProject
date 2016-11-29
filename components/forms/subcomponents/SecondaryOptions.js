import React from 'react';
import AsyncSecondaryOptionsList from './AsyncSecondaryOptionsList';


/**
 * List available basecallings output folders for a given run ID.
 */
export class BasecallingsOutputFolders extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.output_dir]; }
    render() {
        return (<AsyncSecondaryOptionsList
            table="basecallings" label="Unaligned data output folder" form={this.props.form}
            dependsOnField="runs"
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}

/**
 * List available samples for a given project ID.
 */
export class ProjectSamples extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name + (v.short_name ? " ("+v.short_name+")" : "")]; }
    render() {
        return (<AsyncSecondaryOptionsList
            table="samples" label="Sample" form={this.props.form}
            dependsOnField="projects"
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}

/**
 * List available library pools for a given project ID.
 * Used in Pre-Runs insert.
 */
export class ProjectPools extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.pool]; }
    render() {
        return (<AsyncSecondaryOptionsList
            table="user_requests" label={null} form={this.props.form}
            dependsOnField={this.props.dependsOnField}
            storeKey={this.props.storeKey}
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}
ProjectPools.propTypes = {
    dependsOnField: React.PropTypes.string.isRequired,
    storeKey: React.PropTypes.string,
};

