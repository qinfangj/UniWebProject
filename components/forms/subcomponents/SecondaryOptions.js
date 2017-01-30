import React from 'react';
import AsyncSecondaryOptionsList from './AsyncSecondaryOptionsList';
import dataStoreKeys from '../../constants/dataStoreKeys';
import fields from '../fields';


/**
 * List available basecallings output folders for a given run ID.
 */
export class BasecallingsOutputFolders extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.outputDir]; }
    render() {
        return (<AsyncSecondaryOptionsList
            field={this.props.field}
            table="basecallingId"
            label="Unaligned data output folder"
            form={this.props.form}
            referenceField="runs"
            storeKey={dataStoreKeys.BASECALLING_OUTPUT_FOLDERS}
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}
BasecallingsOutputFolders.propTypes = {
    field: React.PropTypes.string.isRequired,
};
BasecallingsOutputFolders.defaultProps = {
    field: fields.BASECALLING_ID,  // "run" (output folder)
};


/**
 * List available samples for a given project ID.
 */
export class ProjectSamples extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name + (v.shortName ? " ("+v.shortName+")" : "")]; }
    render() {
        return (<AsyncSecondaryOptionsList
            field={this.props.field}
            table="samples"
            label="Sample"
            form={this.props.form}
            referenceField={this.props.referenceField}
            storeKey={dataStoreKeys.SAMPLES_FROM_PROJECT}
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}
ProjectSamples.propTypes = {
    field: React.PropTypes.string.isRequired,
    referenceField: React.PropTypes.string.isRequired,
    storeKey: React.PropTypes.string.isRequired,
};
ProjectSamples.defaultProps = {
    field: "sampleId",
    referenceField: fields.PROJECT_ID,
};


/**
 * List available library pools for a given project ID.
 * Used in Pre-Runs insert.
 */
export class ProjectPools extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.pool]; }
    render() {
        return (<AsyncSecondaryOptionsList
            field={this.props.field}
            table="user_requests"
            label={null}
            form={this.props.form}
            referenceField={this.props.referenceField}
            storeKey={this.props.storeKey}
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}
ProjectPools.propTypes = {
    field: React.PropTypes.string.isRequired,
    referenceField: React.PropTypes.string.isRequired,
    storeKey: React.PropTypes.string.isRequired,
};
ProjectPools.defaultProps = {
    field: "userRequestId",
    referenceField: fields.PROJECT_ID,
};


/**
 * List available libraries for a given project ID.
 */
export class ProjectLibraries extends React.Component {
    getValue() { return this._select.getValue(); }
    formatter(v) { return [v.id, v.name]; }
    render() {
        return (<AsyncSecondaryOptionsList
            field={this.props.field}
            table="libraries" label={null} form={this.props.form}
            referenceField={this.props.referenceField}
            storeKey={this.props.storeKey}
            formatter={this.formatter} ref={(c) => {this._select = c;}}
        />);
    }
}
ProjectLibraries.propTypes = {
    field: React.PropTypes.string.isRequired,
    referenceField: React.PropTypes.string.isRequired,
    storeKey: React.PropTypes.string.isRequired,
};
ProjectLibraries.defaultProps = {
    field: "libraryId",
    referenceField: fields.PROJECT_ID,
};