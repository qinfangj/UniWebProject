import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './runs.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Select from '../elements/Select';
import validators from '../validators';
import * as options from '../options';
import * as Options from '../subcomponents/Options';

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
        //console.debug(props)
        //console.debug(this.props.lanes)
        this.lanes = { 3:
            {
                "lane_nb": 3,
                "nlibs": 2,
                "nqc": 0,
                "projectId": 1,
                "libraryPoolId": 1
            },
            6: {
                "lane_nb": 6,
                "nlibs": 4,
                "nqc": 0,
                "projectId": 1,
                "libraryPoolId": 1
            }
        };
        this.librariesRefs = {};
        this.state = {invalid: {1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}}};
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
            let N = parseInt(laneNb);  // or keys are read as strings in for loops
            let libsArray = this.librariesRefs[N];
            lanes[N].libraries = [];
            invalid[N] = {};
            libsArray.map((lib, libIdx) => {
                let project = lib.project.getValue();
                let library = lib.library.getValue();
                let quantity = lib.quantity.getValue();
                let quality = lib.quality.getValue();
                lanes[N].libraries.push({
                    idx: libIdx,
                    lane_nb: N,
                    project_id: project,
                    library_id: library,
                    quantity_loaded: parseFloat(quantity),
                    quality_id: quality,
                });
                invalid[laneNb][libIdx] = quantity === null;
            });
        }
        this.setState({invalid});
        return {lanes, invalid};
    }

    /**
     * One row of 4 fields (project, lib, pM, QC).
     * @param lane: lane object, as in this.lanes.
     * @param libIdx: row index inside a lane ("library").
     */
    makeLibRow(lane, libIdx) {
        let N = lane.lane_nb;
        return (<tr key={N +'-'+ libIdx}
                    className={libIdx===0 ? css.topRow : (libIdx===lane.nlibs-1 ? css.bottomRow : null)}>

            { /* The lane number spans nlibs rows */
                libIdx === 0 ?
                <td className={css.laneCell} rowSpan={lane.nlibs}>{'L'+ N}</td>
            : null}

            <td className={cx(css.libCell, css.projectCell)}>
                <Select name="project"
                        options={options.getProjectsList()}
                        ref={(c) => this.librariesRefs[N][libIdx]["project"] = c}
                />
            </td>
            <td className={cx(css.libCell, css.libraryCell)}>
                <Select name="library"
                        options={options.getLibrariesList()}
                        ref={(c) => this.librariesRefs[N][libIdx]["library"] = c}
                />
            </td>
            <td className={cx(css.libCell, css.quantityCell)}>
                <TextField name="pM" required
                           validator = {validators.numberValidator}
                           invalid = {this.state.invalid[N][libIdx]}
                           ref={(c) => this.librariesRefs[N][libIdx]["quantity"] = c}
                           inputProps={{autoComplete: "off"}}
                />
            </td>
            <td className={cx(css.libCell, css.qualityCell)}>
                <Options.SequencingQualities ref={(c) => this.librariesRefs[N][libIdx]["quality"] = c} />
            </td>
        </tr>);
    }

    render() {
        let lanes = this.lanes;
        let laneRows = [];
        for (let laneNb of Object.keys(lanes)) {
            let lane = lanes[laneNb];
            let N = lane.lane_nb;
            this.librariesRefs[N] = [];
            let libRows = [];
            for (let j=0; j<lane.nlibs; j++) {
                this.librariesRefs[N].push({});
                let row = this.makeLibRow(lane, j);
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