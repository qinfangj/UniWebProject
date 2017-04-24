"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { getSecondaryOptionsListAsync } from '../../actions/actionCreators/formsActionCreators';
import { changeSamplesSelection } from '../../actions/actionCreators/queryProjectsActionCreators';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import MultipleSelect from '../elements/MultipleSelect';
import { assertIsArray } from '../../../utils/common';


class SamplesSecondaryMultipleSelect extends React.PureComponent {
    constructor(props) {
        super(props);
        this.projectIds = null; // not in state because not used for display. Only the callback updates the component.
    }

    static propTypes = {
        referenceField: React.PropTypes.string.isRequired,  // the store key for the other input's form value, which should have been specified via `storeKey`!
        form: React.PropTypes.string.isRequired,  // form name
        field: React.PropTypes.string.isRequired,  // the store key for the selected values
        options: React.PropTypes.array.isRequired,  // the list of options
        label: React.PropTypes.string,  // title on top of the input
        formatter: React.PropTypes.func,  // ex: object => [id, name]
        filterBySampleIds: React.PropTypes.any,  // set. keep only these ones
        searchTerm: React.PropTypes.string,
    };

    /**
     * Filter and format options.
     */
    getOptions() {
        let options = this.filterOptions(this.props.options);
        assertIsArray(options, "getOptions::this.props.options");
        return options.map(v => {
            return {id: v.id, name: v.shortName +" ("+ v.name +")", project_id: v.projectId};
        });
    }

    /**
     * Keep only options which id is in the set.
     */
    filterOptions(options) {
        let selectedProjectIds = this.props.selectedProjectIds;
        if (!selectedProjectIds) {
            return [];
        } else {
            /* No projects selected: emtpy samples list */
            if (Object.keys(selectedProjectIds).length === 0) {
                return [];
            /* 'Any' project selected: show all samples in list
             -- none for now because it is too slow without pagination */
            } else if (-1 in selectedProjectIds) {
                return [];
            /* Some projects are selected */
            } else {
                let referenceProjects = this.props.referenceProjects.filter(p => p.id in selectedProjectIds);  // the selected projects
                let sampleIdsSet = this.props.filterBySampleIds;
                /* No samples selected: don't filter, i.e. show all samples of the project(s) */
                if (sampleIdsSet === null) {
                    return options;
                } else {
                    return options.filter(v => {
                        if (sampleIdsSet.has(v.id)) {
                            return true;
                        } else {
                            let project = referenceProjects.filter(p => p.id === v.projectId)[0];
                            let term = this.props.searchTerm;
                            return project && (
                                   project.name.toLowerCase().indexOf(term) >= 0
                                || project.lastName.toLowerCase().indexOf(term) >= 0);
                        }
                    });
                }
            }
        }
    }

    componentWillReceiveProps(newProps) {
        let selectedProjectIds = newProps.selectedProjectIds;
        if (selectedProjectIds) {
            let projectIds = Object.keys(selectedProjectIds).join(",");
            /* The value it depends on changed, ask for new data */
            if (projectIds !== this.projectIds && projectIds.length > 0) {
                this.projectIds = projectIds;  // avoids infinite callback loop
                this.props.getSecondaryOptionsListAsync(projectIds);
            }
        }
    }

    render() {
        return (
            <MultipleSelect
                {...this.props}
                options={this.getOptions()}
                onSelectActionCreator={changeSamplesSelection}
            />
        );
    }
}


SamplesSecondaryMultipleSelect.defaultProps = {
    options: [],
    selectedProjectIds: [], // list fo the ids of selected projects in the reference list
    referenceProjects: [], // list of projects to select from
};


const mapStateToProps = (state) => {
    return {
        options: state.queryProjects[optionsStoreKeys.SAMPLES_FOR_PROJECTS],
        selectedProjectIds: state.queryProjects.projectIds,
        referenceProjects: state.queryProjects[optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSecondaryOptionsListAsync: (id) =>
            dispatch(getSecondaryOptionsListAsync("samples", id, optionsStoreKeys.SAMPLES_FOR_PROJECTS)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(SamplesSecondaryMultipleSelect);