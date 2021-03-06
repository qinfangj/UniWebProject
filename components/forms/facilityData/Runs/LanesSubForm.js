"use strict";
import React from 'react';
import store from '../../../../core/store';
import css from './lanes.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions} from 'react-redux-form';
import { requestProjectsHavingALibrary,
         requestSequencingQualities } from '../../../actions/actionCreators/optionsActionCreators';
import { requestLibrariesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';
import { removeLibFromRuns } from '../../../actions/actionCreators/secondaryOptionsActionCreators';
import runLanesModel from '../formModels/runLanesModel';
import inputTypes from '../../../constants/inputTypes';

import RRFInput from '../../bootstrapWrappers/RRFInput.js';
import Icon from 'react-fontawesome';
import PoolSelection from './PoolSelection';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap/lib';



/**
 * The Project-library-[pM]-QC mini form of variable length
 * where the user enters the libraries to add.
 * It is part of `RunsInsertForm`.
 * Each lane is a group of rows with 4 inputs each, spaced and surrounded by a border.
 */
class LanesSubForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.modelName = "facilityDataForms.runs";
        this.state = {
            showPoolSelection: 0,  // lane number for which to show it
        }
    }

    componentWillMount() {
        this.props.requestProjectsHavingALibrary();
        this.props.requestSequencingQualities();
    }

    /**
     * Return a new empty library model object.
     */
    makeLib = (projectId = "", libraryId = "", volume = "", qualityId = 1, isQC = false) => {
        return {
            projectId: projectId,
            libraryId: libraryId,
            volume: volume,
            qualityId: qualityId,
            isQCLib: isQC,
        };
    };

    /**
     * Return a new empty lane model object.
     */
    makeLane = (laneNb, comment) => {
        return {
            [laneNb]: {
                libs: [this.makeLib(),],
                comment: comment || "",
            }
        };
    };

    /**
     * Add one lane row to the table.
     */
    addLane = () => {
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
    };

    /**
     * Remove one entire lane.
     */
    removeLane = (laneNb) => (e) => {
        if (confirm("Do you really want to delete the entire lane "+ laneNb +"?")) {
            store.dispatch(actions.omit(this.modelName+'.lanes', laneNb));
        }
    };

    /**
     * Add one library row to the table.
     */
    addLibrary = (laneNb) => (e) => {
        store.dispatch(actions.push(this.modelName+`.lanes[${laneNb}].libs`, this.makeLib()));
    };

    /**
     * Add one QC library row to the table.
     */
    addQCLibrary = (laneNb) => (e) => {
        store.dispatch(actions.push(this.modelName+`.lanes[${laneNb}].libs`, this.makeLib("","","", 1, true)));
    };

    /**
     * Remove a library row from the table.
     * Careful! Since we remove an array element, it shifts every index, so the secondaryOptions don't
     * correspond anymore! Rename the secondaryOptions keys accordingly.
     */
    removeLibrary = (laneNb, k) => {
        let nbLibs = this.props.lanes[laneNb].libs.length;
        this.props.removeLibFromRuns(laneNb, k, nbLibs);
        store.dispatch(actions.remove(this.modelName+`.lanes[${laneNb}].libs`, k));
    };

    /**
     * Call the function `removeLibrary` above but asks for confirmation if the fields are not empty.
     */
    confirmRemoveLibrary = (laneNb, library, k) => (e) => {
        /* No need to confirm to delete an empty lib row */
        if (library.projectId === "" && library.libraryId === "") {
            this.removeLibrary(laneNb, k);
        } else {
            if (confirm("Delete this library?")) {
                this.removeLibrary(laneNb, k);
            }
        }
    };

    /**
     * Display a small form to select a pool of libraries to add to the lane.
     */
    showPoolSelection = (laneNb) => (e) => {
        this.setState({ showPoolSelection: laneNb });
    };

    /**
     * On top of triggering the default 'change' action,
     * request the libraries options list corresponding to the selected project.
     * @param model: RRF model name for the project input field.
     * @param value: projectId.
     */
    onProjectChange = (model, value) => {
        store.dispatch(actions.change(model, value));
        this.props.requestLibrariesForProject(model, value);
    };

    /**
     * Construct one row of 4 fields (project, lib, pM, QC).
     * @param lane: lane object.
     * @param lib: library object.
     * @param k: row index inside a lane ("library").
     */
    makeLibRow(lane, lib, k) {
        let laneNb = lane.laneNb;
        let nlibs = this.props.lanes[laneNb].libs.length;
        let qcClass = lib.isQC ? css.qcCell : '';
        let prefix = `${this.modelName}.lanes[${laneNb}].libs[${k}]`;

        /* Construct the project-library-volume-quality inputs for one Library row */
        let formFields = [];
        for (let fieldName of Object.keys(runLanesModel.lib)) {
            let model = runLanesModel.lib[fieldName];
            let modelName = prefix +'.'+ fieldName;
            let {inputType, optionsKey, ...otherProps} = model;
            otherProps.key = fieldName + k;
            otherProps.disabled = model.disabled || this.props.disabled;

            /* Load the options list */
            if (inputType === inputTypes.DROPDOWN && optionsKey) {
                otherProps.options = this.props.options[optionsKey];
            }

            /* Make onChange load the secondary libraries options list */
            if (fieldName === "projectId") {
                otherProps.changeAction = this.onProjectChange;
            } else if (fieldName === "libraryId") {
                otherProps.refModelName = prefix +".projectId";
            }

            let input = <RRFInput className={qcClass} inputType={inputType} modelName={modelName} {...otherProps} />;
            formFields.push(input);
        }

        let projectInput = formFields[0];
        let libraryInput = formFields[1];
        let volumeInput = formFields[2];
        let qualityInput = formFields[3];

        let DelLibTooltip = <Tooltip id="delLib">{"Delete library"}</Tooltip>;
        let DelLaneTooltip = <Tooltip id="delLane">{"Delete lane"}</Tooltip>;
        let AddLibTooltip = <Tooltip id="addLib">{"Add a library"}</Tooltip>;
        let AddQCLibTooltip = <Tooltip id="addLib">{"Add a QC library"}</Tooltip>;
        let AddPoolTooltip = <Tooltip id="addPool">{"Add a pool of libraries"}</Tooltip>;

        let laneNbCell = k === 0 ?
            <td className={css.laneCell} rowSpan={lane.nlibs + 1}>
                {'L'+laneNb}
            </td> : null;

        let deleteLibraryButton = (nlibs > 1 && !this.props.disabled) ?
            <div onClick={this.confirmRemoveLibrary(laneNb, lib, k)}>
                <OverlayTrigger placement="left" overlay={DelLibTooltip}>
                    <Icon name='trash' className={css.removeLibrary}/>
                </OverlayTrigger>
            </div> : null;

        let laneButtonsCell = (k === 0 && !this.props.disabled) ?
            <td className={css.laneCell} rowSpan={lane.nlibs + 1}>
                <div onClick={this.removeLane(laneNb)}>
                    <OverlayTrigger placement="left" overlay={DelLaneTooltip}>
                        <Icon name="trash" className={css.removeLane}/>
                    </OverlayTrigger>
                </div>
                <div onClick={this.addLibrary(laneNb)}>
                    <OverlayTrigger placement="left" overlay={AddLibTooltip}>
                        <Icon name='plus-circle' className={css.addLibrary}/>
                    </OverlayTrigger>
                </div>
                <div onClick={this.addQCLibrary(laneNb)}>
                    <OverlayTrigger placement="left" overlay={AddQCLibTooltip}>
                        <Icon name='plus-circle' className={css.addQCLibrary}/>
                    </OverlayTrigger>
                </div>
                <div onClick={this.showPoolSelection(laneNb)}>
                    <OverlayTrigger placement="left" overlay={AddPoolTooltip}>
                        <Button className={css.addPool}>{"P"}</Button>
                    </OverlayTrigger>
                </div>
            </td> : null;

        return (
            <tr key={laneNb+'-'+k}
                className={k === 0 ? css.topRow : null}
            >
                {laneNbCell}
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
                    {deleteLibraryButton}
                </td>
                {laneButtonsCell}
            </tr>);
    }

    /**
     * Build the lane comment row.
     */
    makeLaneCommentRow(laneNb) {
        let commentModelName = `${this.modelName}.lanes[${laneNb}].comment`;
        let commentModel = runLanesModel.lane.comment;
        let {inputType, ...otherProps} = commentModel;
        let commentValue = this.props.lanes[laneNb].comment;
        otherProps.disabled = this.props.disabled;
        let commentInput;
        if (this.props.disabled && commentValue === "") {
            commentInput = <span className={css.noComment}>{"No comment"}</span>;
        } else {
            commentInput = <RRFInput inputType={inputType} modelName={commentModelName} {...otherProps} />;
        }

        return (
            <tr key={"comment"+laneNb} className={css.bottomRow}>
                <td className={cx(css.libCell, css.commentCell)} colSpan={4}>
                    {commentInput}
                </td>
                <td className={cx(css.libCell, css.buttonsCell)} />
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
            /* Show pool selection form after the lane if requested */
            if (this.state.showPoolSelection === laneNb) {
                laneRows.push(
                    <tbody key="poolSelection">
                        <PoolSelection laneNb={laneNb} modelName={this.modelName} />
                    </tbody>
                );
            }
        }
        return (
            <div>
                <Button className={css.addLaneButton} bsStyle="info" disabled={this.props.disabled} onClick={this.addLane}>Add lane</Button>

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
    let formData = state.facilityDataForms.runs;
    return {
        lanes: formData.lanes,
        options: state.options,
        secondaryOptions: state.secondaryOptions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestProjectsHavingALibrary,
        requestSequencingQualities,
        requestLibrariesForProject,
        removeLibFromRuns,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LanesSubForm);

