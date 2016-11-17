import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './runs.css';
import formsCss from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Select from '../elements/Select';
import validators from '../validators';
import * as forms from '../forms.js';
import * as options from '../options';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';


/**
 * The Project-library-[pM]-QC mini form of variable length
 * where the user enters the libraries to add.
 */
class RunsSubForm extends React.Component {
    constructor(props) {
        super(props);
        // Test
        console.debug(this.props)
        this.lanes = [
            {
                "id": 2,
                "nlibs": 2,
                "nqc": 0,
                "projectId": 1,
                "libraryPoolId": 1
            },
            {
                "id": 5,
                "nlibs": 4,
                "nqc": 0,
                "projectId": 1,
                "libraryPoolId": 1
            }
        ];
        this.librariesRefs = {};
    }

    static propTypes() {
        return {
            lanes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        };
    }

    makeLibRow(lane, lib) {
        return (<tr key={lane.id +'-'+ lib}
                    className={lib===0 ? css.topRow : (lib===lane.nlibs-1 ? css.bottomRow : null)}>

            { /* The lane number spans nlibs rows */
             lib === 0 ?
                <td className={css.laneCell} rowSpan={lane.nlibs}>{'L'+ (lane.id + 1)}</td>
            : null}

            <td className={cx(css.libCell, css.projectCell)}>
                <Select name="project"
                        options={options.getProjectsList()}
                        ref={(c) => this.librariesRefs[lane.id][lib]["project"] = c}
                />
            </td>
            <td className={cx(css.libCell, css.libraryCell)}>
                <Select name="library"
                        options={options.getLibrariesList()}
                        ref={(c) => this.librariesRefs[lane.id][lib]["library"] = c}
                />
            </td>
            <td className={cx(css.libCell, css.quantityCell)}>
                <TextField name="pM" required
                           validator = {validators.numberValidator}
                           ref={(c) => this.librariesRefs[lane.id][lib]["pM"] = c}
                />
            </td>
            <td className={cx(css.libCell, css.qualityCell)}>
                <Select name="QC"
                        options={options.getQualitiesList()}
                        ref={(c) => this.librariesRefs[lane.id][lib]["QC"] = c}
                />
            </td>
        </tr>);
    }

    render() {
        let lanes = this.lanes.map((lane) => {
            this.librariesRefs[lane.id] = [];
            let laneRows = [];
            for (let j=0; j<lane.nlibs; j++) {
                this.librariesRefs[lane.id].push({});
                let row = this.makeLibRow(lane, j);
                laneRows.push(row);
            }
            return <tbody key={lane.id} className={css.lanesGroup}>{laneRows}</tbody>;
        });
        return <table className={css.lanesTable}>
            <thead><tr>
                <th className={css.laneCell}>{null}</th>
                <th className={cx(css.libCell, css.projectCell)}>Project</th>
                <th className={cx(css.libCell, css.libraryCell)}>Library</th>
                <th className={cx(css.libCell, css.quantityCell)}>[pM]</th>
                <th className={cx(css.libCell, css.qualityCell)}>QC</th>
            </tr></thead>
            {lanes}
        </table>;
    }
}


export default RunsSubForm;