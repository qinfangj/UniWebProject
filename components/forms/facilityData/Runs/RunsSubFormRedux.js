"use strict";
import React from 'react';
import css from './runs.css';
import cx from 'classnames';
import store from '../../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, actions} from 'react-redux-form';
import { requestProjectsHavingAPool, requestProjectsHavingALibrary, requestSequencingQualities } from '../../../actions/actionCreators/optionsActionCreators';

import * as forms from '../../forms.js';
import lanesModel from './lanesModel';
import inputTypes from '../../inputTypes';
import { makeRRFInput } from '../../bootstrapWrappers/bs.js';

import Button from 'react-bootstrap/lib/Button';
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
        this.form = "runs";
        this.modelName = "facilityDataForms.subruns";
        this.lanes = {
            6: {
                "lane_nb": 6,
                "nlibs": 4,
                "nqc": 2,
                "projectId": 3,
                "libraryPoolId": 1
            }
        };
        this.state = {
            lanes: [],
            disabled: false,
        };
    }

    componentWillMount() {
        forms.newOrUpdate2(this.modelName, this.table, this.props.updateId);
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestProjectsHavingAPool();
        this.props.requestProjectsHavingALibrary();
        this.props.requestSequencingQualities();
    }

    addLane() {
        let model = {...this.state.model};
        model.newField = {
            width: 5,
            type: inputTypes.CHECKBOX,
            label: "New Field",
            initValue: "AAAAA",
        };
        this.setState({ model: model });
    }

    /**
     * One row of 4 fields (project, lib, pM, QC).
     * @param lane: lane object.
     * @param k: row index inside a lane ("library").
     * @param isQC: [boolean] quality control library or not.
     */
    makeLibRow(lane, lib, k, isQC) {
        let laneNb = lane.laneNb;
        let qcBsClass = isQC ? cx('form-control', css.qcCell) : 'form-control';
        let prefix = `${this.modelName}.lanes[${laneNb}].${isQC ? "libsQC": "libs"}[${k}]`;

        let formFields = [];
        for (let fieldName of Object.keys(lanesModel.lib)) {
            let model = lanesModel.lib[fieldName];
            let modelName = prefix +'.'+ fieldName;
            let {inputType, optionsKey, ...otherProps} = model;
            otherProps.key = fieldName + k;
            otherProps.disabled = model.disabled || this.state.disabled;
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

        let commentModelName = `${this.modelName}.lanes[${laneNb}].comment`;
        let commentModel = lanesModel.lane.comment;
        let {inputType, ...otherProps} = commentModel;
        let commentInput = makeRRFInput(inputType, commentModelName, otherProps);

        return (
            <tr key={laneNb+'-'+k}
                className={cx(k === 0 ? css.topRow : null,
                             (k === (lane.nlibs + lane.nqc - 1) ? css.bottomRow : null)
                           )}
            >
                { /* The lane number spans nlibs rows */
                    k === 0 ?
                        <td className={css.laneCell} rowSpan={lane.nlibs + lane.nqc}>{'L'+laneNb}</td>
                    : null
                }
                <td className={cx(css.libCell, css.projectCell)}>
                    {projectInput}
                </td>
                <td className={cx(css.libCell, css.libraryCell)}>
                    {libraryInput}
                </td>
                <td className={cx(css.libCell, css.quantityCell)}>
                    {concentrationInput}
                </td>
                <td className={cx(css.libCell, css.qualityCell)}>
                    {qualityInput}
                </td>
                { /* The lane comment spans nlibs rows */
                    k === 0 ?
                        <td className={cx(css.libCell, css.commentCell)} rowSpan={lane.nlibs + lane.nqc}>
                            {commentInput}
                        </td>
                    : null
                }
            </tr>);
    }

    render() {
        let lanes = this.props.lanes;
        let laneRows = [];
        for (let laneNb of Object.keys(lanes)) {
            let lane = lanes[laneNb];
            let nlibs = lane.libs.length;
            let nqc = lane.libsQC.length;
            // Report some info to the lane object we pass to makeLibRow
            lane = {...lane, laneNb, nlibs, nqc};
            // Construct lib rows
            let libRows = [];
            for (let k=0; k < nlibs; k++) {
                let row = this.makeLibRow(lane, lane.libs[k], k);
                libRows.push(row);
            }
            for (let k=nlibs; k < nlibs + nqc; k++) {
                let row = this.makeLibRow(lane, lane.libsQC[k], k, true);
                libRows.push(row);
            }
            laneRows.push(<tbody key={laneNb} className={css.lanesGroup}>{libRows}</tbody>);
        }
        return (
            <Form model={this.modelName} >
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
                <Button onClick={this.addLane.bind(this)}>Add lane</Button>
            </Form>
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
    let formData = state.facilityDataForms.subruns;
    //let formModel = state.facilityDataForms.forms.subruns;
    return {
        lanes: formData.lanes,
        //formModel: formModel,
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

