"use strict";
import React from 'react';
import store from '../../../../core/store';
import css from './runs.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, actions} from 'react-redux-form';
import { requestProjectsHavingAPool, requestProjectsHavingALibrary, requestSequencingQualities } from '../../../actions/actionCreators/optionsActionCreators';

import * as forms from '../../forms.js';
import lanesModel from './lanesModel';
import { makeRRFInput } from '../../bootstrapWrappers/bs.js';

import {Button, Col} from 'react-bootstrap/lib';
// import Feedback from '../../../utils/Feedback';

/**
 * The Project-library-[pM]-QC mini form of variable length
 * where the user enters the libraries to add.
 * It is part of `RunsInsertForm`.
 * Each lane is a group of rows with 4 inputs each, spaced and surrounded by a border.
 */
class RunsSubForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.modelName = "facilityDataForms.runs";
    }

    componentWillMount() {
        forms.newOrUpdate2(this.modelName, this.table, this.props.updateId);
        this.props.requestProjectsHavingAPool();
        this.props.requestProjectsHavingALibrary();
        this.props.requestSequencingQualities();
        this.addLane()
    }

    /**
     * Return a new empty library model object.
     */
    makeLib(projectId, libraryId, concentration, qualityId, isQC) {
        return {
            projectId: projectId || "",
            libraryId: libraryId || "",
            concentration: concentration || "",
            qualityId: qualityId || "",
            isQC: isQC || false,
        };
    }

    /**
     * Return a new empty lane model object.
     */
    makeLane(laneNb, comment) {
        return {
            [laneNb]: {
                libs: [this.makeLib(),],
                comment: comment || "",
            }
        };
    }

    /**
     * Add one lane row to the table.
     */
    addLane() {
        /* Find the min positive integer that is not contained in laneNbs */
        let laneNbs = new Set(Object.keys(this.props.lanes).map(x => parseInt(x)));
        let max = Math.max(...laneNbs);
        let laneNb = 0;
        for (let k=1; k < max; k++) {
            if (! laneNbs.has(k)) {
                laneNb = k;
            }
        }
        if (laneNb === 0) {
            laneNb = max + 1;
        }
        store.dispatch(actions.merge(this.modelName+'.lanes', this.makeLane(laneNb)));
    }

    /**
     * Remove one entire lane.
     */
    removeLane(laneNb) {
        if (confirm("Do you really want to delete entire lane "+ laneNb +"?")) {
            store.dispatch(actions.remove(this.modelName+'.lanes', laneNb));
        }
    }

    /**
     * Remove a library row from the table.
     */
    removeLibrary(library) {

    }

    /**
     * Construct one row of 4 fields (project, lib, pM, QC).
     * @param lane: lane object.
     * @param lib: library object.
     * @param k: row index inside a lane ("library").
     */
    makeLibRow(lane, lib, k) {
        let laneNb = lane.laneNb;
        let qcBsClass = lib.isQC ? cx('form-control', css.qcCell) : 'form-control';
        let prefix = `${this.modelName}.lanes[${laneNb}].${lib.isQC ? "libsQC": "libs"}[${k}]`;

        // Construct the project-library-concentration-quality inputs for one Library row
        let formFields = [];
        for (let fieldName of Object.keys(lanesModel.lib)) {
            let model = lanesModel.lib[fieldName];
            let modelName = prefix +'.'+ fieldName;
            let {inputType, optionsKey, ...otherProps} = model;
            otherProps.key = fieldName + k;
            otherProps.disabled = model.disabled || this.props.disabled;
            if (optionsKey) {
                otherProps.options = this.props.options[optionsKey];
            }
            let input = makeRRFInput(inputType, modelName, otherProps);
            formFields.push(input);
        }

        let projectInput = formFields[0];
        let libraryInput = formFields[1];
        let concentrationInput = formFields[2];
        let qualityInput = formFields[3];

        return (
            <tr key={laneNb+'-'+k}
                className={k === 0 ? css.topRow : null}
            >
                { /* The lane number spans all lib rows + comment */
                    k === 0 ?
                        <td className={css.laneCell} rowSpan={lane.nlibs + 1}>{'L'+laneNb}</td>
                    : null
                }
                <td className={cx(css.libCell, css.projectCell, css.leftCell)}>
                    {projectInput}
                </td>
                <td className={cx(css.libCell, css.libraryCell)}>
                    {libraryInput}
                </td>
                <td className={cx(css.libCell, css.quantityCell)}>
                    {concentrationInput}
                </td>
                <td className={cx(css.libCell, css.qualityCell, css.rightCell)}>
                    {qualityInput}
                </td>
            </tr>);
    }

    /**
     * Build the lane comment row.
     */
    makeCommentRow(laneNb) {
        let commentModelName = `${this.modelName}.lanes[${laneNb}].comment`;
        let commentModel = lanesModel.lane.comment;
        let {inputType, ...otherProps} = commentModel;
        otherProps.disabled = this.props.disabled;
        let commentInput = makeRRFInput(inputType, commentModelName, otherProps);
        return (
            <tr key={"comment"+laneNb} className={css.bottomRow}>
                <td className={cx(css.libCell, css.commentCell, css.leftRow, css.rightRow)} colSpan={4}>
                {commentInput}
                </td>
            </tr>
        );
    }

    render() {
        let lanes = this.props.lanes;
        //console.debug(lanes)
        let laneRows = [];
        for (let laneNb of Object.keys(lanes)) {
            let lane = lanes[laneNb];
            let nlibs = lane.libs.length;
            /* Report some info to the lane object we pass to makeLibRow */
            lane = {...lane, laneNb, nlibs};
            /* Construct lib rows */
            let libRows = [];
            for (let k=0; k < nlibs; k++) {
                let row = this.makeLibRow(lane, lane.libs[k], k);
                libRows.push(row);
            }
            let commentRow = this.makeCommentRow(laneNb);
            libRows.push(commentRow);
            laneRows.push(<tbody key={laneNb} className={css.lanesGroup}>{libRows}</tbody>);
        }
        return (
            <div>
                <Button bsStyle="warning" disabled={this.props.disabled} onClick={this.addLane.bind(this)}>Add lane</Button>

                <div className="clearfix"/>

                <Col sm={10}>
                    <table className={css.lanesTable}>
                    <thead><tr>
                        <th className={css.laneCell}>{null}</th>
                        <th className={cx(css.libCell, css.projectCell)}>Project</th>
                        <th className={cx(css.libCell, css.libraryCell)}>Library</th>
                        <th className={cx(css.libCell, css.quantityCell)}>[pM]</th>
                        <th className={cx(css.libCell, css.qualityCell)}>QC</th>
                        </tr></thead>
                        {laneRows}
                    </table>
                </Col>
                <Col sm={2}>
                    aaa
                </Col>

                <div className="clearfix"/>

            </div>
        );
    }
}



const mapStateToProps = (state) => {
    let options = {};
    for (let field of Object.keys(lanesModel.lib)) {
        let model = lanesModel.lib[field];
        if (model.optionsKey) {
            options[model.optionsKey] = state.options[model.optionsKey] || [];
        }
    }
    let formData = state.facilityDataForms.runs;
    return {
        lanes: formData.lanes,
        options: options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestProjectsHavingAPool,
        requestProjectsHavingALibrary,
        requestSequencingQualities,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(RunsSubForm);

