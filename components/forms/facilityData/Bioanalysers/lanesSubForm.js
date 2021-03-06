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
import fields from '../../../constants/fields';

import RRFInput from '../../bootstrapWrappers/RRFInput.js';
import Icon from 'react-fontawesome';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap/lib';



class LanesSubForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.formModelName = "facilityDataForms.bioanalysers";
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
        let modelName = `${this.formModelName}.lanes[${laneNb}]`;
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

        let DelLaneTooltip = <Tooltip id="delLane">{"Delete lane"}</Tooltip>;

        let deleteLaneButton = !this.props.disabled ?
            <div onClick={this.removeLane.bind(this, laneNb)}>
                <OverlayTrigger placement="left" overlay={DelLaneTooltip}>
                    <Icon name='trash' className={css.removeLane}/>
                </OverlayTrigger>
            </div> : null;

        return(
            <tr key={laneNb}>
                <td className={cx(css.cell, css.laneCell)}>
                    {"L"+laneNb}
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
                    {deleteLaneButton}
                </td>
            </tr>
        );
    }

    /**
     * Return a new empty lane model object.
     */
    makeLane(laneNb, comment) {
        return {
            [laneNb]: {
                [fields.PROJECT_ID]: "",
                [fields.LIBRARY_ID]: "",
                [fields.COMMENT]: comment || "",
            }
        };
    }

    /**
     * Add one lane row to the table.
     */
    addLane() {
        let laneNb = 0;
        if (Object.keys(this.props.lanes).length === 0) {
            laneNb = 1;
        } else {
            /* Find the min positive integer that is not contained in laneNbs */
            let laneNbs = new Set(Object.keys(this.props.lanes).map(x => parseInt(x)));
            let max = Math.max(...laneNbs);
            for (let k=1; k < max; k++) {
                if (! laneNbs.has(k)) {
                    laneNb = k;
                }
            }
            if (laneNb === 0) {
                laneNb = max + 1;
            }
        }
        store.dispatch(actions.merge(this.formModelName+'.lanes', this.makeLane(laneNb)));
    }

    /**
     * Remove a lane.
     */
    removeLane(laneNb) {
        store.dispatch(actions.omit(this.formModelName+'.lanes', laneNb));
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
                <div className="clearfix"/>

                <Button className={css.addLaneButton} bsStyle="info" disabled={this.props.disabled} onClick={this.addLane.bind(this)}>Add lane</Button>

                <div className="clearfix"/>

                <table className={css.lanesTable}>
                    <thead><tr>
                        <th className={cx(css.headerCell)}>{""}</th>
                        <th className={cx(css.headerCell, css.projectCell)}>Project</th>
                        <th className={cx(css.headerCell, css.libraryCell)}>Library</th>
                        <th className={cx(css.headerCell, css.commentCell)}>Comment</th>
                        <th className={css.headerCell}>{null}</th>
                    </tr></thead>
                    <tbody>
                        {laneRows}
                    </tbody>
                </table>

                <div className="clearfix"/>

            </div>
        );
    }

}



const mapStateToProps = (state) => {
    let formData = state.facilityDataForms.bioanalysers;
    return {
        lanes: formData.lanes,
        options: state.options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestProjectsHavingALibrary,
        requestLibrariesForProject,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LanesSubForm);

