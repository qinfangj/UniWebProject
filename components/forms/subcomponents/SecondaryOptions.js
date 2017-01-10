import React from 'react';
import AsyncSecondaryOptionsList from './AsyncSecondaryOptionsList';
import dataStoreKeys from '../../constants/dataStoreKeys';


/**
 * List available basecallings output folders for a given run ID.
 */
export class BasecallingsOutputFolders extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.output_dir]; }
    render() {
        return (<AsyncSecondaryOptionsList
            table="basecallings" label="Unaligned data output folder" form={this.props.form}
            referenceField="runs"
            storeKey={dataStoreKeys.BASECALLING_OUTPUT_FOLDERS}
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
            referenceField={this.props.referenceField}
            storeKey={dataStoreKeys.PROJECT_SAMPLES}
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
            referenceField={this.props.referenceField}
            storeKey={this.props.storeKey}
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}
ProjectPools.propTypes = {
    referenceField: React.PropTypes.string.isRequired,
    storeKey: React.PropTypes.string,
};


/**
 * List available libraries for a given project ID.
 */
export class ProjectLibraries extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return (<AsyncSecondaryOptionsList
            table="libraries" label={null} form={this.props.form}
            referenceField={this.props.referenceField}
            storeKey={this.props.storeKey}
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}
ProjectLibraries.propTypes = {
    referenceField: React.PropTypes.string.isRequired,
    storeKey: React.PropTypes.string,
};