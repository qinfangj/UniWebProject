"use strict";
import React from 'react';
import store from '../../../../core/store';
import css from './lanes.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions} from 'react-redux-form';
import { requestProjectsHavingAPool,
         requestProjectsHavingALibrary,
         requestSequencingQualities } from '../../../actions/actionCreators/optionsActionCreators';
import { requestLibrariesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';
import lanesModel from './lanesModel';

import RFFInput from '../../bootstrapWrappers/RFFInput.js';
import Icon from 'react-fontawesome';
import Button from 'react-bootstrap/lib/Button';


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
        this.props.requestProjectsHavingAPool();
        this.props.requestProjectsHavingALibrary();
        this.props.requestSequencingQualities();
    }

    /**
     * Return a new empty library model object.
     */
    makeLib(projectId = "", libraryId = "", volume = "", qualityId = "", isQC = false) {
        return {
            projectId: projectId,
            libraryId: libraryId,
            volume: volume,
            qualityId: qualityId,
            isQC: isQC,
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
        store.dispatch(actions.merge(this.modelName+'.lanes', this.makeLane(laneNb)));
    }

    /**
     * Remove one entire lane.
     */
    removeLane(laneNb) {
        if (confirm("Do you really want to delete the entire lane "+ laneNb +"?")) {
            store.dispatch(actions.omit(this.modelName+'.lanes', laneNb));
        }
    }

    /**
     * Add one library row to the table.
     */
    addLibrary(laneNb) {
        store.dispatch(actions.push(this.modelName+`.lanes[${laneNb}].libs`, this.makeLib()));
    }

    /**
     * Remove a library row from the table.
     */
    removeLibrary(laneNb, library, k) {
        let nlibs = this.props.lanes[laneNb].libs.length;
        if (nlibs > 1) {
            if (confirm("Delete this library?")) {
                store.dispatch(actions.remove(this.modelName+`.lanes[${laneNb}].libs`, k));
            }
        }
    }

    onProjectChange(model, value) {
        store.dispatch(actions.change(model, value));
        this.props.requestLibrariesForProject(model, value);
    }

    /**
     * Construct one row of 4 fields (project, lib, pM, QC).
     * @param lane: lane object.
     * @param lib: library object.
     * @param k: row index inside a lane ("library").
     */
    makeLibRow(lane, lib, k) {
        let laneNb = lane.laneNb;
        let nlibs = this.props.lanes[laneNb].libs.length;
        let qcBsClass = lib.isQC ? cx('form-control', css.qcCell) : 'form-control';
        let prefix = `${this.modelName}.lanes[${laneNb}].libs[${k}]`;

        /* Construct the project-library-volume-quality inputs for one Library row */
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
            // Make onChange load the secondary libraries options list
            if (fieldName === "projectId") {
                otherProps.changeAction = this.onProjectChange.bind(this);
            } else if (fieldName === "libraryId") {
                otherProps.refModelName = prefix +".projectId";
            }
            let input = <RFFInput inputType={inputType} modelName={modelName} {...otherProps} />;
            formFields.push(input);
        }

        let projectInput = formFields[0];
        let libraryInput = formFields[1];
        let volumeInput = formFields[2];
        let qualityInput = formFields[3];

        return (
            <tr key={laneNb+'-'+k}
                className={k === 0 ? css.topRow : null}
            >
                { /* The lane number spans all lib rows + comment */
                    k === 0 ?
                        <td className={css.laneCell} rowSpan={lane.nlibs + 1}>
                            {'L'+laneNb}
                        </td>
                    : null
                }
                <td className={cx(css.libCell, css.projectCell)}>
                    {projectInput}
                </td>
                <td className={cx(css.libCell, css.libraryCell)}>
                    {libraryInput}
                </td>
                <td className={cx(css.libCell, css.quantityCell)}>
                    {volumeInput}
                </td>
                <td className={cx(css.libCell, css.qualityCell)}>
                    {qualityInput}
                </td>
                <td className={cx(css.libCell, css.buttonsCell)}>
                    { /* Cannot delete the only remaining lib in a lane */
                        (nlibs > 1 && !this.props.disabled) ?
                            <div onClick={this.removeLibrary.bind(this, laneNb, lib, k)}>
                                <Icon name='trash' className={css.removeLibrary}/>
                            </div>
                        : null
                    }
                </td>
                    <td className={css.laneCell} rowSpan={lane.nlibs + 1}>
                        { /* The delete lane button spans all lib rows + comment */
                            (k === 0 && !this.props.disabled) ?
                                <div onClick={this.removeLane.bind(this, laneNb)}>
                                    <Icon name="trash" className={css.removeLane}/>
                                </div>
                                : null
                        }
                    </td>
            </tr>);
    }

    /**
     * Build the lane comment row.
     */
    makeLaneCommentRow(laneNb) {
        let commentModelName = `${this.modelName}.lanes[${laneNb}].comment`;
        let commentModel = lanesModel.lane.comment;
        let {inputType, ...otherProps} = commentModel;
        let commentValue = this.props.lanes[laneNb].comment;
        otherProps.disabled = this.props.disabled;
        let commentInput;
        if (this.props.disabled && commentValue === "") {
            commentInput = <span className={css.noComment}>{"No comment"}</span>;
        } else {
            commentInput = <RFFInput inputType={inputType} modelName={commentModelName} {...otherProps} />;
        }
        return (
            <tr key={"comment"+laneNb} className={css.bottomRow}>
                <td className={cx(css.libCell, css.commentCell)} colSpan={4}>
                {commentInput}
                </td>
                <td className={cx(css.libCell, css.buttonsCell)} >
                    { !this.props.disabled ?
                        <div onClick={this.addLibrary.bind(this, laneNb)}>
                            <Icon name='plus-circle' className={css.addLibrary}/>
                        </div>
                      : null
                    }
                </td>
                <td/>
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
            let commentRow = this.makeLaneCommentRow(laneNb);
            libRows.push(commentRow);
            laneRows.push(<tbody key={laneNb} className={css.lanesGroup}>{libRows}</tbody>);
        }
        return (
            <div>
                <Button bsStyle="info" disabled={this.props.disabled} onClick={this.addLane.bind(this)}>Add lane</Button>

                <div className="clearfix"/>

                <table className={css.lanesTable}>
                <thead><tr>
                    <th className={css.laneCell}>{null}</th>
                    <th className={cx(css.libCell, css.projectCell)}>Project</th>
                    <th className={cx(css.libCell, css.libraryCell)}>Library</th>
                    <th className={cx(css.libCell, css.quantityCell)}>[pM]</th>
                    <th className={cx(css.libCell, css.qualityCell)}>QC</th>
                    <th className={css.laneCell}>{null}</th>
                    <th className={css.laneCell}>{null}</th>
                    </tr></thead>
                    {laneRows}
                </table>

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
        requestLibrariesForProject,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(RunsSubForm);

