import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './runs.css';
import cx from 'classnames';
import _ from 'lodash';

import TextField from '../elements/TextField';
import Select from '../elements/Select';
import validators from '../validators';
import * as options from '../options';

import Button from 'react-bootstrap/lib/Button';


/**
 * The Project-library-[pM]-QC mini form of variable length
 * where the user enters the libraries to add.
 * It is part of `RunsInsertForm`.
 * Each lane is a group of rows with 4 inputs, soaced and surrounded by a border.
 */
class RunsSubForm extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // Test
        this.lanes = { 2:
            {
                "id": 2,
                "nlibs": 2,
                "nqc": 0,
                "projectId": 1,
                "libraryPoolId": 1
            },
            5: {
                "id": 5,
                "nlibs": 4,
                "nqc": 0,
                "projectId": 1,
                "libraryPoolId": 1
            }
        };
        this.librariesRefs = {};
        this.state = {invalid: {0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}}};
    }

    /**
     * Return an object `lanes = {laneId: [library, ...]}`,
     * and an object `invalid = {laneId: {libId: bool}}`.
     * @returns {{lanes: {}, invalid: {}}}
     */
    getFormValues() {
        let lanes = this.lanes;
        let invalid = {};
        // Fill the `lanes` with a `libs` array attribute.
        _.forOwn(this.librariesRefs, (libsArray, laneId) => {
            lanes[laneId].libs = [];
            invalid[laneId] = {};
            libsArray.map((lib, libIdx) => {
                let project = lib.project.getValue();
                let library = lib.library.getValue();
                let quantity = lib.quantity.getValue();
                let quality = lib.quality.getValue();
                lanes[laneId].libs.push({
                    idx: libIdx,
                    lane_nb: laneId + 1,
                    project_id: project,
                    library_id: library,
                    quantity_loaded: parseFloat(quantity),
                    quality_id: quality,
                });
                invalid[laneId][libIdx] = quantity === null;
            });
        });
        //console.info(JSON.stringify(lanes, null, 2));
        this.setState({invalid});
        return {lanes, invalid};
    }

    /**
     * One row of 4 fields (project, lib, pM, QC).
     * @param lane: lane object, as in this.lanes.
     * @param libIdx: row index inside a lane ("library").
     */
    makeLibRow(lane, libIdx) {
        return (<tr key={lane.id +'-'+ libIdx}
                    className={libIdx===0 ? css.topRow : (libIdx===lane.nlibs-1 ? css.bottomRow : null)}>

            { /* The lane number spans nlibs rows */
                libIdx === 0 ?
                <td className={css.laneCell} rowSpan={lane.nlibs}>{'L'+ (lane.id + 1)}</td>
            : null}

            <td className={cx(css.libCell, css.projectCell)}>
                <Select name="project"
                        options={options.getProjectsList()}
                        ref={(c) => this.librariesRefs[lane.id][libIdx]["project"] = c}
                />
            </td>
            <td className={cx(css.libCell, css.libraryCell)}>
                <Select name="library"
                        options={options.getLibrariesList()}
                        ref={(c) => this.librariesRefs[lane.id][libIdx]["library"] = c}
                />
            </td>
            <td className={cx(css.libCell, css.quantityCell)}>
                <TextField name="pM" required
                           validator = {validators.numberValidator}
                           invalid = {this.state.invalid[lane.id][libIdx]}
                           ref={(c) => this.librariesRefs[lane.id][libIdx]["quantity"] = c}
                />
            </td>
            <td className={cx(css.libCell, css.qualityCell)}>
                <Select name="QC"
                        options={options.getQualitiesList()}
                        ref={(c) => this.librariesRefs[lane.id][libIdx]["quality"] = c}
                />
            </td>
        </tr>);
    }

    render() {
        let lanes = this.lanes;
        let laneRows = [];
        for (let laneId in lanes) {
            let lane = lanes[laneId];
            this.librariesRefs[lane.id] = [];
            let libRows = [];
            for (let j=0; j<lane.nlibs; j++) {
                this.librariesRefs[lane.id].push({});
                let row = this.makeLibRow(lane, j);
                libRows.push(row);
            }
            laneRows.push(<tbody key={lane.id} className={css.lanesGroup}>{libRows}</tbody>);
        };
        return <table className={css.lanesTable}>
            <thead><tr>
                <th className={css.laneCell}>{null}</th>
                <th className={cx(css.libCell, css.projectCell)}>Project</th>
                <th className={cx(css.libCell, css.libraryCell)}>Library</th>
                <th className={cx(css.libCell, css.quantityCell)}>[pM]</th>
                <th className={cx(css.libCell, css.qualityCell)}>QC</th>
            </tr></thead>
            {laneRows}
            <tbody><tr><td><Button onClick={this.getFormValues.bind(this)}/></td></tr></tbody>
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