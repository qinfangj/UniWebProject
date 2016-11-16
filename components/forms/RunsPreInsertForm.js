import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './runs.css';
import formsCss from './forms.css';
import commonCss from '../../styles/common.css';
import cx from 'classnames';
import store from '../../core/store';
import { goTo } from '../actions/actionCreators/commonActionCreators';

import TextField from './elements/TextField';
import Select from './elements/Select';
import validators from './validators';
import * as forms from './forms.js';
import * as options from './options';

import Button from 'react-bootstrap/lib/Button';

const range8 = Array.from(new Array(8).keys());  // idiotic JS - range(8)


/**
 * The table-shaped form where we select how many libraries to add
 */
class RunsPreInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "runs";
        this.required = [""];
        this.state = forms.defaultFormState;
        this.lanes = range8.map((laneId) => {
            return {
                id: laneId,
                nlibs: null,
                nqc: null,
                project: null,
                pool: null,
            }
        });
    }

    onSubmit() {
        let formData = this.getFormValues();
        let validation = this.validateFormData(formData);
        if (validation.isValid) {
            let data = this.formatFormData(formData);
            console.info(JSON.stringify(data, null, 2));
            store.dispatch(goTo("/data/runs/postnew", {}, {}, data));
        }
        this.setState({submissionError: validation.isValid, invalid: validation.invalid});
    }

    validateFormData(formData) {
        let invalid = {};
        for (let lane of formData) {
            if (lane.nlibs === null) { invalid[lane.id] = {}; invalid[lane.id].nlibs = true; }
            if (lane.nqc === null) { invalid[lane.id] = {}; invalid[lane.id].nqc = true; }
        }
        return {isValid: Object.keys(invalid).length === 0, invalid};
    }

    formatFormData(formData) {
        // Filter out lanes with 0 libraries to insert
        let data = formData.filter((lane) => { return lane.nlibs > 0; });
        // Cast numeric strings to int
        data = data.map((lane) => {
            lane.nlibs = parseInt(lane.nlibs);
            lane.nqc = parseInt(lane.nqc);
            return lane;
        });
        return data;
    }

    getFormValues() {
        return this.lanes.map((lane) => {
            return {
                id: lane.id,
                nlibs: lane.nlibs.getValue(),
                nqc: lane.nqc.getValue(),
                projectId: lane.project.getValue(),
                libraryPoolId: lane.pool.getValue(),
            };
        });
    }

    render() {
        let makeRow = (laneId) => {
            let invalid = this.state.invalid[laneId];
            return <tr key={laneId} className={css.preRunsInsertRow}>
                <td key="id" className={css.laneId}>{laneId + 1}</td>
                <td key="nlibs" className={css.numeric}>
                    <TextField name="nlibs" defaultValue="0" required
                               validator = {validators.integerValidator}
                               invalid = {invalid && invalid.nlibs}
                               ref={(c) => this.lanes[laneId]["nlibs"] = c} />
                </td>
                <td key="nqc" className={css.numeric}>
                    <TextField name="nqc" defaultValue="0" required
                               validator = {validators.integerValidator}
                               invalid = {invalid && invalid.nqc}
                               ref={(c) => this.lanes[laneId]["nqc"] = c} />
                </td>
                <td key="project">
                    <Select name="project"
                            options={options.getProjectsList()}
                            ref={(c) => this.lanes[laneId]["project"] = c}
                    />
                </td>
                <td key="pool">
                    <Select name="pool"
                            options={options.getLibraryPools()}
                            ref={(c) => this.lanes[laneId]["pool"] = c}
                    />
                </td>
            </tr>;
        };

        let rows = range8.map(makeRow);

        return (
            <form className={formsCss.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />

                <table className={css.preRunsInsertTable}>
                    <thead><tr>
                        <th className={css.laneId}>Lane</th>
                        <th className={css.numeric}>#Libraries</th>
                        <th className={css.numeric}>#QC Libraries</th>
                        <th>Project</th>
                        <th>Library pool</th>
                    </tr></thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                {/* Submit */}

                <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)}
                        className={cx(commonCss.centerH, css.submitButton)}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default RunsPreInsertForm;

