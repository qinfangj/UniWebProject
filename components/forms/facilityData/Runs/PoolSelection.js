"use strict";
import React from 'react';
import store from '../../../../core/store';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions} from 'react-redux-form';
import { requestLibrariesFromPool } from '../../../actions/actionCreators/facilityDataActionCreators';
import { requestProjectsHavingAPool } from '../../../actions/actionCreators/optionsActionCreators';
import { requestPoolsForProject, requestLibrariesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';
import poolSelectionModel from './poolSelectionModel';

import RFFInput from '../../bootstrapWrappers/RFFInput.js';
import Icon from 'react-fontawesome';
import Button from 'react-bootstrap/lib/Button';


/**
 * The project + lib pool selection component.
 */
class PoolSelection extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.requestProjectsHavingAPool();
    }

    static propTypes = {
        laneNb: PropTypes.string,
        modelName: PropTypes.string,  // the RRF model name, e.g. "facilityDataForms.runs"
    };

    /**
     * Append a pool of libraries to the lane.
     */
    addPool(laneNb) {
        store.dispatch(requestLibrariesFromPool(this.props.selectedProject, this.props.selectedPool))
            .then((libs) => {
                let modelName = this.props.modelName +`.lanes[${laneNb}].libs`;
                let libsOld = this.props.lanes[laneNb].libs;
                let nlibsOld = libsOld.length;
                let nlibsNew = libs.length;
                let mergedLibs = [...libsOld, ...libs];
                // Change the new projects one by one so that it loads the secondary libraries lists
                for (let k=nlibsOld; k < nlibsOld + nlibsNew; k++) {
                    this.props.requestLibrariesForProject(modelName+`[${k}].projectId`, mergedLibs[k].projectId);
                }
                // Change the whole libs data - libraryIds
                store.dispatch(actions.change(modelName, mergedLibs));
            });
    }

    /**
     * On top of triggering the default 'change' action,
     * request the library pools options list corresponding to the selected project.
     * @param model: RRF model name for the project input field.
     * @param value: projectId.
     */
    onProjectChange(model, value) {
        store.dispatch(actions.change(model, value));
        this.props.requestPoolsForProject(model, value);
    }

    render() {
        let inputs = [];
        let laneNb = this.props.laneNb;
        for (let fieldName of Object.keys(poolSelectionModel)) {
            let model = poolSelectionModel[fieldName];
            let modelName = this.props.modelName +'.poolSelection.'+ fieldName;
            let {inputType, optionsKey, ...otherProps} = model;
            otherProps.options = this.props.options[optionsKey];
            if (fieldName === "projectIdWithPool") {
                otherProps.changeAction = this.onProjectChange.bind(this);
            } else if (fieldName === "pool") {
                otherProps.refModelName = this.props.modelName +".poolSelection.projectIdWithPool";
            }
            inputs.push(
                <td key={fieldName}><RFFInput inputType={inputType} modelName={modelName} {...otherProps} /></td>
            );
        }

        return (
            <tr>
                <td/>
                {inputs}
                <td><Button bsStyle="info" onClick={this.addPool.bind(this, laneNb)}>{"Add pool to lane "+laneNb}</Button></td>
            </tr>
        );
    }

}


const mapStateToProps = (state) => {
    let options = {};
    for (let field of Object.keys(poolSelectionModel)) {
        let model = poolSelectionModel[field];
        if (model.optionsKey) {
            options[model.optionsKey] = state.options[model.optionsKey] || [];
        }
    }
    let librariesFromPool = state.facilityData["LIBRARIES_FROM_POOL"];
    let selectedProject = state.facilityDataForms.runs.poolSelection.projectIdWithPool;
    let selectedPool = state.facilityDataForms.runs.poolSelection.pool;
    let lanes = state.facilityDataForms.runs.lanes;
    return {
        options: options,
        librariesFromPool: librariesFromPool,
        selectedProject: selectedProject,
        selectedPool: selectedPool,
        lanes: lanes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestProjectsHavingAPool,
        requestPoolsForProject,
        requestLibrariesForProject,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(PoolSelection);


