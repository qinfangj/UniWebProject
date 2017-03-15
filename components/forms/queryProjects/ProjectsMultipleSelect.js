"use strict";
import React from 'react';
import store from '../../../core/store';

import { getOptionsListAsync, getConditionalOptionsListAsync } from '../../actions/actionCreators/formsActionCreators';
import { resetSelection, changeProjectsSelection } from '../../actions/actionCreators/queryProjectsActionCreators';
import dataStoreKeys from '../../constants/dataStoreKeys';
import constants from '../../constants/constants';
import MultipleSelect from '../elements/MultipleSelect';



class ProjectsMultipleSelect extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = "projects";
        this.dataStoreKey = this.getDataStoreKey();
        this.state = {
            options: []
        };
    }

    static propTypes = {
        form: React.PropTypes.string.isRequired,  // form name
        field: React.PropTypes.string.isRequired,  // the store key for the selected values
        suffix: React.PropTypes.string.isRequired,  // route suffix for conditional lists (e.g. "all" in "/table/projects/list/all")
        label: React.PropTypes.string,  // title on top of the input
        filterByProjectIds: React.PropTypes.any,  // set. keep only these ones
    };

    getDataStoreKey() {
        switch(this.props.suffix) {
            case "all":
                return dataStoreKeys.PROJECTS_ALL;
            case "samples":
                return dataStoreKeys.PROJECTS_HAVING_A_SAMPLE;
            case "libs":
                return dataStoreKeys.PROJECTS_HAVING_A_LIBRARY;
        }
    }

    componentWillMount() {
        // Listen to store for changes or initial data
        this.unsubscribe = store.subscribe(() => {
            let options = store.getState().forms[this.dataStoreKey];
            if (options) {
                this.setState({ options });
            }
        });
        // Initialize state
        let options = store.getState().forms[this.dataStoreKey];
        /// ...cached
        if (options) {
            this.setState({ options });
        /// ...fetch from backend
        } else {
            if (this.props.suffix) {
                store.dispatch(getConditionalOptionsListAsync(this.table, this.props.suffix, this.dataStoreKey));
            } else {
                store.dispatch(getOptionsListAsync(this.table, this.dataStoreKey));
            }
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getOptions() {
        let options = this.filterOptions(this.state.options);
        options = options.map(v => {
            return {id: v.id, name: v.lastName +" - "+ v.name};
        });
        options.unshift(constants.NONE_OPTION);
        return options;
    }

    /**
     * Keep only options which id is in the set.
     */
    filterOptions(options) {
        let idsSet = this.props.filterByProjectIds;
        if (idsSet === null) {
            return options;
        } else {
            return options.filter(v => idsSet.has(v.id));
        }
    }

    render() {
        return (
            <MultipleSelect
                {...this.props}
                options={this.getOptions()}
                onResetAction={resetSelection(this.props.form, this.props.field)}
                onSelectActionCreator={changeProjectsSelection}
            />
        );
    }
}


export default ProjectsMultipleSelect;