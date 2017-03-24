"use strict";
import React from 'react';
import AsyncSecondaryOptionsList from './AsyncSecondaryOptionsList';
import dataStoreKeys from '../../constants/dataStoreKeys';
import fields from '../fields';


/*
 * These dropdown lists also get their options from the backend,
 * but they depend on a value selected in another dropdown of the same form ("referenceField").
 * Also because of that, they need to have the storeKey specific to the form.
 */

/**
 * List available basecallings output folders for a given run ID.
 */
export class BasecallingsOutputFolders extends React.Component {
    formatter(v) { return [v.id, v.outputDir]; }
    render() {
        let {form, ...otherProps} = this.props;
        return (<AsyncSecondaryOptionsList
            form={form}
            field={fields.BASECALLING_ID}
            table="basecallings"
            label="Unaligned data output folder"
            referenceField={fields.RUN_ID}
            storeKey={form + '_' + dataStoreKeys.BASECALLINGS_OUTPUT_FOLDERS}
            formatter={this.formatter}
            {...otherProps}
        />);
    }
}
BasecallingsOutputFolders.propTypes = {
    form: React.PropTypes.string.isRequired,
};


/**
 * List available samples for a given project ID.
 * Used in UserRequests and Librairies insert forms.
 */
export class SamplesForProject extends React.Component {
    formatter(v) { return [v.id, v.name + (v.shortName ? " ("+v.shortName+")" : "")]; }
    render() {
        let {form, ...otherProps} = this.props;
        return (<AsyncSecondaryOptionsList
            form={form}
            field={fields.SAMPLE_ID}
            table="samples"
            label="Sample"
            referenceField={this.props.referenceField}
            storeKey={form + '_' + dataStoreKeys.SAMPLES_FROM_PROJECT}
            formatter={this.formatter}
            {...otherProps}
        />);
    }
}
SamplesForProject.propTypes = {
    form: React.PropTypes.string.isRequired,
    referenceField: React.PropTypes.string.isRequired,
};
SamplesForProject.defaultProps = {
    referenceField: fields.PROJECT_ID,
};


/**
 * List available library pools for a given project ID.
 * Used in Pre-Runs insert.
 */
export class ProjectPools extends React.Component {
    formatter(v) { return [v.id, v.pool]; }
    render() {
        let {field, form, referenceField, ...otherProps} = this.props;
        return (<AsyncSecondaryOptionsList
            form={form}
            field={field}
            referenceField={referenceField}
            table="user_requests"
            label={null}
            storeKey={this.props.storeKey ? this.props.storeKey : form + '_' + dataStoreKeys.POOLS_FROM_PROJECT}
            formatter={this.formatter}
            {...otherProps}
        />);
    }
}
ProjectPools.propTypes = {
    form: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    referenceField: React.PropTypes.string.isRequired,
};
ProjectPools.defaultProps = {
    field: "userRequestId",
    referenceField: fields.PROJECT_ID,
};


/**
 * List available libraries for a given project ID.
 */
export class ProjectLibraries extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        let {field, form, ...otherProps} = this.props;
        return (<AsyncSecondaryOptionsList
            form={form}
            field={field}
            table="libraries" label={null}
            referenceField={this.props.referenceField}
            storeKey={this.props.storeKey ? this.props.storeKey : this.props.form +'_'+ dataStoreKeys.LIBRAIRIES_FROM_PROJECT}
            formatter={this.formatter}
            {...otherProps}
        />);
    }
}
ProjectLibraries.propTypes = {
    form: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    referenceField: React.PropTypes.string.isRequired,
};
ProjectLibraries.defaultProps = {
    field: "libraryId",
    referenceField: fields.PROJECT_ID,
};