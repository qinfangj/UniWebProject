"use strict";
import React from 'react';
import css from './lanes.css';
import cx from 'classnames';

import store from '../../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions} from 'react-redux-form';
import { requestProjectsHavingALibrary } from '../../../actions/actionCreators/optionsActionCreators';
import { requestLibrariesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';
import bioanalysersLaneModel from '../formModels/bioanalysersLaneModel';
import * as forms from '../../forms';

import RRFInput from '../../bootstrapWrappers/RRFInput.js';
import Icon from 'react-fontawesome';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap/lib';



class LanesSubForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.modelName = "facilityDataForms.bioanalysers.lanes";
        this.model = bioanalysersLaneModel;
    }

    componentWillMount() {
        this.props.requestProjectsHavingALibrary();
    }

    /**
     * On top of triggering the default 'change' action,
     * request the libraries options list corresponding to the selected project.
     * @param model: RRF model name for the project input field.
     * @param value: projectId.
     */
    onProjectChange(model, value) {
        store.dispatch(actions.change(model, value));
        this.props.requestLibrariesForProject(model, value);
    }

    makeInputs(laneNb) {
        let modelName = `${this.formModelName}.${laneNb}`;
        /* Construct the project-library-volume-quality inputs for one Library row */
        let inputs = [];
        for (let fieldName of Object.keys(this.model)) {
            let fieldModel = this.model[fieldName];
            let fieldModelName = modelName +'.'+ fieldName;
            let {inputType, optionsKey, ...otherProps} = fieldModel;
            otherProps.key = fieldName + laneNb;
            otherProps.disabled = fieldModel.disabled || this.props.disabled;
            if (optionsKey) {
                otherProps.options = this.props.options[optionsKey];
            }
            // Make onChange load the secondary libraries options list
            if (fieldName === "projectId") {
                otherProps.changeAction = this.onProjectChange.bind(this);
            } else if (fieldName === "libraryId") {
                otherProps.refModelName = modelName +".projectId";
            }
            let input = <RRFInput inputType={inputType} modelName={fieldModelName} {...otherProps} />;
            inputs.push(input);
        }
        return inputs;
    }

    makeRow(laneNb) {
        let formFields = this.makeInputs(laneNb);
        let projectInput = formFields[0];
        let libraryInput = formFields[1];
        let commentInput = formFields[2];

        return(
            <tr>
                <td className={cx(css.cell, css.laneCell)}>
                    {laneNb}
                </td>
                <td className={cx(css.cell, css.projectCell)}>
                    {projectInput}
                </td>
                <td className={cx(css.cell, css.libraryCell)}>
                    {libraryInput}
                </td>
                <td className={cx(css.cell, css.commentCell)}>
                    {commentInput}
                </td>
                <td className={css.cell}>

                </td>
            </tr>
        );
    }

    addLane() {

    }

    render() {
        let lanes = this.props.lanes;
        //console.debug(lanes)
        let laneRows = [];
        for (let laneNb of Object.keys(lanes)) {
            laneRows.push(this.makeRow(laneNb))
        }

        return (
            <div>
                <Button className={css.addLaneButton} bsStyle="info" disabled={this.props.disabled} onClick={this.addLane.bind(this)}>Add lane</Button>

                <div className="clearfix"/>

                <table className={css.lanesTable}>
                    <thead><tr>
                        <th className={css.headerCell}>{null}</th>
                        <th className={cx(css.headerCell, css.laneCell)}>Lane</th>
                        <th className={cx(css.headerCell, css.projectCell)}>Project</th>
                        <th className={cx(css.headerCell, css.libraryCell)}>Library</th>
                        <th className={cx(css.headerCell, css.commentCell)}>Comment</th>
                        <th className={css.headerCell}>{null}</th>
                    </tr></thead>
                    {laneRows}
                </table>

                <div className="clearfix"/>

            </div>
        );
    }

}





const mapStateToProps = (state) => {
    let options = forms.optionsFromModel(state, bioanalysersLaneModel);
    let formData = state.facilityDataForms.bioanalysers;
    return {
        lanes: formData.lanes,
        options: options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestProjectsHavingALibrary,
        requestLibrariesForProject,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LanesSubForm);

