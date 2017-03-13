"use strict";
import React from 'react';
import store from '../../../core/store';

import { getSecondaryOptionsListAsync } from '../../actions/actionCreators/formsActionCreators';
import dataStoreKeys from '../../constants/dataStoreKeys';
import MultipleSelect from '../elements/MultipleSelect';


class SamplesSecondaryMultipleSelect extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            options: []  // an array of objects of the type {id: .., name: ..}
        };
        this.table = "samples";
        this.dataStoreKey = dataStoreKeys.SAMPLES_FOR_PROJECTS;
        this.projectIds = null; // not in state because not used for display. Only the callback updates the component.
    }

    static propTypes = {
        referenceField: React.PropTypes.string.isRequired,  // the store key for the other input's form value, which should have been specified via `storeKey`!
        form: React.PropTypes.string.isRequired,  // form name
        field: React.PropTypes.string.isRequired,  // the store key for the selected values
        label: React.PropTypes.string,  // title on top of the input
        formatter: React.PropTypes.func,  // ex: object => [id, name]
        filterByProjectIds: React.PropTypes.any,  // set. keep only these ones
        filterBySampleIds: React.PropTypes.any,  // set. keep only these ones
        searchTerm: React.PropTypes.string,
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let storeState = store.getState();
            let options = storeState.forms[this.dataStoreKey];   // this options list
            let referenceFormValues = storeState.forms[this.props.form];  // to get the projects that are currently selected
            // Since it depends on another field of the same form, no need to
            //  do anything if the other field has not yet sent its value to the store.
            if (referenceFormValues !== undefined) {
                let referenceValue = referenceFormValues[this.props.referenceField];
                let projectIds = referenceValue ? Object.keys(referenceValue).join(",") : [];
                if (projectIds.length === 0) {
                    this.setState({ options: [] });
                }
                // The value it depends on changed, ask for new data
                else if (projectIds && projectIds !== this.projectIds) {
                    this.projectIds = projectIds;  // avoids infinite callback loop
                    store.dispatch(getSecondaryOptionsListAsync(this.table, projectIds, this.dataStoreKey));
                }
                // New data received, update options
                else if (options) {
                    let referenceProjects = storeState.forms[dataStoreKeys.PROJECTS_HAVING_A_SAMPLE];  // the projects options list
                    referenceProjects = referenceProjects.filter(p => p.id in referenceValue);  // the selected projects
                    options = this.filterOptions(options, referenceProjects);
                    this.setState({ options });
                }
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    /**
     * Filter and format options.
     */
    getOptions() {
        return this.state.options.map(v => {
            return {id: v.id, name: v.shortName +" ("+ v.name +")", project_id: v.projectId};
        });
    }

    /**
     * Keep only options which id is in the set.
     */
    filterOptions(options, referenceProjects) {
        let sampleIdsSet = this.props.filterBySampleIds;
        if (sampleIdsSet === null) {
            return options;
        } else {
            return options.filter(v => {
                if (sampleIdsSet.has(v.id)) {
                    return true;
                } else {
                    let project = referenceProjects.filter(p => p.id === v.projectId)[0];
                    let term = this.props.searchTerm;
                    return project.name.toLowerCase().indexOf(term) >= 0
                        || project.lastName.toLowerCase().indexOf(term) >= 0;
                }
            });
        }
    }

    render() {
        return (
            <MultipleSelect
                {...this.props}
                options={this.getOptions()}
            />
        );
    }
}


export default SamplesSecondaryMultipleSelect;