"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from '../query.css';
import store from '../../../../core/store';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import { bindActionCreators } from 'redux';
import { resetSelection } from '../../../actions/actionCreators/queryProjectsActionCreators';
import { requestProjectsHavingASample } from '../../../actions/actionCreators/optionsActionCreators';
import { requestSamplesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';

import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import RRFInput from '../../bootstrapWrappers/RRFInput';
import inputTypes from '../../../constants/inputTypes';



class ProjectsMultipleSelect extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
    };

    componentWillMount() {
        this.props.requestProjectsHavingASample();
    }

    filterByTerm(options) {
        let term = this.props.searchTerm.toLowerCase();
        if (term === "") {
            return options;
        } else {
            return options.filter((v) => v[1].toLowerCase().indexOf(term) >= 0);
        }
    }

    render() {
        let {options, ...otherProps} = this.props;
        options = this.filterByTerm(this.props.options);
        let modelName = "queryProjectsForms.queryProjects.projects";
        let refModelName = "queryProjectsForms.queryProjects.samples";

        return (
            <RRFInput
                inputType={inputTypes.MULTIPLE_SELECT}
                modelName={modelName}
                label="Projects"
                options={[...options]}
                hasNoneValue={true}
                changeAction = {(model, value) => {
                    // If the "-" option is in the selection
                    if (value.indexOf("") >= 0) {
                        value = [""];
                        this.props.resetSelection();
                        store.dispatch(actions.change(modelName, [])); // reset projects selection
                        store.dispatch(actions.change(refModelName, [])); // reset samples selection
                    } else {
                        this.props.requestSamplesForProject(optionsStoreKeys.SAMPLES_FOR_PROJECT, value);
                    }
                    store.dispatch(actions.change(model, value));
                }}
                style = {{height: "200px"}}
            />
        );
    }
}



const mapStateToProps = (state) => {
    return {
        searchTerm: state.queryProjects.searchTerm,
        options: state.options[optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE],
        selectedProjects: state.queryProjects.selectedProjects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetSelection,
        requestProjectsHavingASample,
        requestSamplesForProject,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsMultipleSelect);

