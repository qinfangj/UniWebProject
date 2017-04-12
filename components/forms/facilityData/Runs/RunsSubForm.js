"use strict";
import React from 'react';
import css from './runs.css';
import cx from 'classnames';
import store from '../../../../core/store';

import TextField from '../../elements/TextField';
import validators from '../../validators';
import * as Options from '../../subcomponents/Options';
import fields from '../../fields';
import LibrariesForProject from '../../subcomponents/secondarySelects/LibrariesForProject';


/**
 * The Project-library-[pM]-QC mini form of variable length
 * where the user enters the libraries to add.
 * It is part of `RunsInsertForm`.
 * Each lane is a group of rows with 4 inputs each, spaced and surrounded by a border.
 */
class RunsSubForm extends React.PureComponent {
    constructor(props) {
        super(props);
        // Test
        //console.debug(props)
        //console.debug(this.props.lanes)
        this.form = "runs";
        this.lanes = { 3:
            {
                "lane_nb": 3,
                "nlibs": 2,
                "nqc": 0,
                "projectId": 12,
                "libraryPoolId": 1
            },
            6: {
                "lane_nb": 6,
                "nlibs": 4,
                "nqc": 2,
                "projectId": 3,
                "libraryPoolId": 1
            }
        };
        this.librariesRefs = {};
        this.state = {
            invalid: {1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}},
        };
    }

    /**
     * Return an object `lanes = {laneId: [library, ...]}`,
     * and an object `invalid = {laneId: {libId: bool}}`.
     * @returns {{lanes: {}, invalid: {}}}
     */
    getFormValues() {
        let lanes = this.lanes;
        let invalid = {};
        // Fill the `lanes` with a `libraries` array attribute.
        for (let laneNb of Object.keys(this.librariesRefs)) {
            // One lane
            let N = parseInt(laneNb);  // otherwise keys are read as strings in for loops
            let libsArray = this.librariesRefs[N];  // array[nlibs] of react refs for this lane
            // Init
            lanes[N].libraries = [];
            invalid[N] = {};
            let nlibs = lanes[N].nlibs;
            // fill
            libsArray.map((lib, libIdx) => {
                // One library
                let project = store.getState().forms[this.form][this._projectsFormKey(N, libIdx)];
                let library = lib.library.getValue();
                let quantity = lib.quantity.getValue();
                let quality = lib.quality.getValue();
                lanes[N].libraries.push(
                {
                    idx: libIdx,
                    lane_nb: N,
                    project_id: project,
                    library_id: library,
                    quantity_loaded: parseFloat(quantity),
                    quality_id: quality,
                    isQClib: nlibs < libIdx,
                });
                invalid[laneNb][libIdx] = quantity === null;
            });
        }
        this.setState({invalid});
        return {lanes, invalid};
    }

    _projectsFormKey(laneNb, libIdx) {
        return this.form +'_'+ fields.PROJECT_ID +'_'+ libIdx +"_"+ laneNb;
    }

    /**
     * One row of 4 fields (project, lib, pM, QC).
     * @param lane: lane object, as in this.lanes.
     * @param libIdx: row index inside a lane ("library").
     * @param isQC: [boolean] quality control library or not.
     */
    makeLibRow(lane, libIdx, isQC) {
        let N = lane.lane_nb;
        let qcBsClass = isQC ? cx('form-control', css.qcCell) : 'form-control';
        let projectFormKey = this._projectsFormKey(N, libIdx);
        let libFormKey = this.form +'_'+ fields.LIBRARY_ID +'_'+ libIdx +"_"+ N;
        return (<tr key={N +'-'+ libIdx}
                    className={libIdx===0 ? css.topRow : (libIdx===lane.nlibs + lane.nqc -1 ? css.bottomRow : null)}>

            { /* The lane number spans nlibs rows */
                libIdx === 0 ?
                <td className={css.laneCell} rowSpan={lane.nlibs + lane.nqc}>{'L'+ N}</td>
            : null}

            <td className={cx(css.libCell, css.projectCell)}>
                <Options.ProjectsWithLibraries
                    form={this.form}
                    field={projectFormKey}
                />
            </td>
            <td className={cx(css.libCell, css.libraryCell)}>
                <LibrariesForProject
                    form={this.form}
                    field={libFormKey}
                    refFieldName={projectFormKey}
                />
            </td>
            <td className={cx(css.libCell, css.quantityCell)}>
                <TextField form={this.form} field="pM" required
                           validator = {validators.numberValidator}
                           invalid = {this.state.invalid[N][libIdx]}
                           ref={(c) => this.librariesRefs[N][libIdx]["quantity"] = c}
                           inputProps={{
                               autoComplete: "off",
                               bsClass: qcBsClass,
                           }}
                />
            </td>
            <td className={cx(css.libCell, css.qualityCell)}>
                <Options.SequencingQualities
                    form={this.form}
                    ref={(c) => this.librariesRefs[N][libIdx]["quality"] = c}
                    selectProps={{
                        inputProps: {bsClass: qcBsClass},   // add the blue background
                    }}
                />
            </td>
        </tr>);
    }

    render() {
        let lanes = this.lanes;
        let laneRows = [];
        for (let laneNb of Object.keys(lanes)) {
            // Build one lane row
            let lane = lanes[laneNb];
            let N = lane.lane_nb;
            this.librariesRefs[N] = [];
            let libRows = [];
            let nlibs = lane.nlibs;
            let nqc = lane.nqc;
            for (let j=0; j < nlibs; j++) {
                // Build one library row
                this.librariesRefs[N].push({});
                let row = this.makeLibRow(lane, j);
                libRows.push(row);
            }
            for (let k=nlibs; k < nlibs + nqc; k++) {
                // Build one QC library row
                this.librariesRefs[N].push({});
                let row = this.makeLibRow(lane, k, true);
                libRows.push(row);
            }
            laneRows.push(<tbody key={N} className={css.lanesGroup}>{libRows}</tbody>);
        }
        return <table className={css.lanesTable}>
            <thead><tr>
                <th className={css.laneCell}>{null}</th>
                <th className={cx(css.libCell, css.projectCell)}>Project</th>
                <th className={cx(css.libCell, css.libraryCell)}>Library</th>
                <th className={cx(css.libCell, css.quantityCell)}>[pM]</th>
                <th className={cx(css.libCell, css.qualityCell)}>QC</th>
            </tr></thead>
            {laneRows}
        </table>;
    }
}

RunsSubForm.propTypes = {
    lanes: React.PropTypes.object.isRequired,
};
RunsSubForm.defaultProps = {
    lanes: [],
};


export default RunsSubForm;