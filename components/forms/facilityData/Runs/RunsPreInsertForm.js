import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './runs.css';
import formsCss from '../../forms.css';
import commonCss from '../../../../styles/common.css';
import cx from 'classnames';
import store from '../../../../core/store';
import { goTo } from '../../../actions/actionCreators/commonActionCreators';

import TextField from '../../elements/TextField';
import validators from '../../validators';
import * as forms from '../../forms.js';
import * as Options from '../../subcomponents/Options';
import * as SecondaryOptions from '../../subcomponents/SecondaryOptions';

import Button from 'react-bootstrap/lib/Button';

const range8 = Array.from(new Array(8).keys());  // idiotic JS - range(8)


/**
 * The table-shaped form where we select how many libraries to add.
 * Either you select a Project and a Library,
 * or you give a number of libraries and QC libraries to fill manually.
 * It passes this data to `RunsInsertForm` -> `RunsSubForm` to build a table of the lanes.
 */
class RunsPreInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "runs";
        this.form = "pre-runs";
        this.required = [""];
        this.state = forms.defaultFormState;
        this.lanesRefs = range8.map((i) => {
            return {
                lane_nb: i + 1,
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
            let dataObj = this.formatFormData(formData);
            console.info(JSON.stringify(dataObj, null, 2));
            store.dispatch(goTo("/data/runs/postnew", {}, {}, dataObj));
        }
        this.setState({submissionError: validation.isValid, invalid: validation.invalid});
    }

    validateFormData(formData) {
        let invalid = {};
        for (let lane of formData) {
            let N = lane.lane_nb - 1;
            if (lane.nlibs === null) { invalid[N] = {}; invalid[N].nlibs = true; }
            if (lane.nqc === null) { invalid[N] = {}; invalid[N].nqc = true; }
        }
        return {isValid: Object.keys(invalid).length === 0, invalid};
    }

    /**
     * Turn form data into an object ```
     *  {lane_nb: {lane_nb, nlibs, nqc, project, pool}, ...}
     * ```
     */
    formatFormData(formData) {
        // Filter out lanes with 0 libraries to insert
        let data = formData.filter((lane) => { return lane.nlibs > 0; });
        // Cast numeric strings to int
        data = data.map((lane) => {
            lane.nlibs = parseInt(lane.nlibs);
            lane.nqc = parseInt(lane.nqc);
            return lane;
        });
        // Turn the sublist into an indexed object
        let dataObj = {};
        data.forEach((lane) => {
            dataObj[lane.lane_nb] = lane;
        });
        return dataObj;
    }

    getFormValues() {
        return this.lanesRefs.map((lane, i) => {
            return {
                lane_nb: lane.lane_nb,
                nlibs: lane.nlibs.getValue(),
                nqc: lane.nqc.getValue(),
                projectId: forms.getFormValue(this.form, this._projectsStoreKey(i)),
                libraryPoolId: lane.pool.getValue(),
            };
        });
    }

    _projectsFormKey(i) {
        return this.form + i +"_project";
    }

    render() {
        let makeRow = (i) => {
            let invalid = this.state.invalid[i];
            let projectsFromKey = this._projectsFormKey(i);
            return (
                <tr key={i}>
                    <td key="id" className={css.laneId}>
                        {i + 1}
                    </td>
                    <td key="nlibs" className={css.numeric}>
                        <TextField name="nlibs" defaultValue="0" required
                                   validator = {validators.integerValidator}
                                   invalid = {invalid && invalid.nlibs}
                                   ref={(c) => this.lanesRefs[i]["nlibs"] = c}
                        />
                    </td>
                    <td key="nqc" className={css.numeric}>
                        <TextField name="nqc" defaultValue="0" required
                                   validator = {validators.integerValidator}
                                   invalid = {invalid && invalid.nqc}
                                   ref={(c) => this.lanesRefs[i]["nqc"] = c}
                        />
                    </td>
                    <td key="project">
                        {Options.ProjectsWithPool(this.form, projectsFromKey)}

                    </td>
                    <td key="pool">
                        <SecondaryOptions.ProjectPools form={this.form}
                                referenceField={projectsFromKey}     // the store key to the form value
                                storeKey={this.form + i +"_pool"}           // the store key for the result list
                                ref={(c) => this.lanesRefs[i]["pool"] = c} />
                    </td>
                </tr>
            );
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
                        className={cx(css.submitButton)}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default RunsPreInsertForm;

