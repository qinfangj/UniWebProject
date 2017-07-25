"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import store from '../../../../core/store';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import { bindActionCreators } from 'redux';
import { queryProjectsAsync } from '../../../actions/actionCreators/queryProjectsActionCreators';

import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import RRFInput from '../../bootstrapWrappers/RRFInput';
import inputTypes from '../../../forms/inputTypes';



class SamplesSecondaryMultipleSelect extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    filterByTerm = (options) => {
        let term = this.props.searchTerm.toLowerCase();
        if (term === "") {
            return options;
        } else {
            return options.filter((v) => v[1].toLowerCase().indexOf(term) >= 0);
        }
    };

    render() {
        let {options, ...otherProps} = this.props;
        options = this.filterByTerm(this.props.options);
        let modelName = "queryProjectsForms.queryProjects.samples";

        return (
            <RRFInput
                inputType={inputTypes.MULTIPLE_SELECT}
                modelName={modelName}
                label="Samples"
                options={[...options]}
                hasNoneValue={true}
                changeAction = {(model, value) => {
                    // If the "-" option is in the selection
                    if (value.indexOf("") >= 0) {
                        value = [""];
                    }
                    store.dispatch(actions.change(model, value));
                    this.props.queryProjectsAsync(value, this.props.queryType);  // the default storeKey is "tableData"
                }}
                style = {{height: "200px"}}
            />
        );
    }
}



const mapStateToProps = (state) => {
    return {
        options: state.secondaryOptions[optionsStoreKeys.SAMPLES_FOR_PROJECT],
        searchTerm: state.queryProjects.searchTerm,
        queryType: state.queryProjects.queryType,
        selectedProjects: state.queryProjects.selectedProjects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        queryProjectsAsync,
    }, dispatch);
};



export default connect(mapStateToProps, mapDispatchToProps)(SamplesSecondaryMultipleSelect);