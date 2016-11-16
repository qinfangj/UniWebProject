import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './runs.css';
import formsCss from './forms.css';
import commonCss from '../../styles/common.css';
import cx from 'classnames';
import _ from 'lodash';
import store from '../../core/store';
import { goTo } from '../actions/actionCreators/commonActionCreators';

import TextField from './elements/TextField';
import Select from './elements/Select';
import validators from './validators';
import * as forms from './forms.js';

import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';

const range8 = Array.from(new Array(8).keys());  // idiotic JS - range(8)


class RunsPreInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "runs";
        this.required = [""];
        this.state = forms.defaultFormState;
        this.lanes = range8.map((laneId) => {
            return {
                id: laneId + 1,
                nlibs: null,
                nqc: null,
                project: null,
                pool: null,
            }
        });
    }

    onSubmit() {
        let formData = this.getFormValues();
        console.info(JSON.stringify(formData, null, 2));
        store.dispatch(goTo("/data/runs/postnew", {}, {}, formData));
        // if (!newState.submissionError) {
        //     newState.submissionFuture.done((insertId) => {
        //         this.setState({ submissionSuccess: true, submissionId: insertId });
        //     }).fail(() =>{
        //         console.warn("Uncaught form validation error");
        //         this.setState({ submissionError: true });
        //     });
        // }
    }

    getFormValues() {
        return this.lanes.map((lane) => {
            return {
                nlibs: parseInt(lane.nlibs.getValue()),
                nqc: parseInt(lane.nqc.getValue()),
                projectId: lane.project.getValue(),
                libraryPoolId: lane.pool.getValue(),
            };
        });
    }

    render() {
        let makeRow = (laneId) => {
            return <tr key={laneId} className={css.preRunsInsertRow}>
                <td key="id" className={css.laneId}>{laneId + 1}</td>
                <td key="nlibs" className={css.numeric}>
                    <TextField name="nlibs" defaultValue="0"
                               validator={validators.integerValidator}
                               ref={(c) => this.lanes[laneId]["nlibs"] = c} />
                </td>
                <td key="nqc" className={css.numeric}>
                    <TextField name="nqc" defaultValue="0"
                               validator={validators.integerValidator}
                               ref={(c) => this.lanes[laneId]["nqc"] = c} />
                </td>
                <td key="project">
                    <Select name="project"
                            options={[[1, "A"], [2, "B"]]}
                            ref={(c) => this.lanes[laneId]["project"] = c}
                    />
                </td>
                <td key="pool">
                    <Select name="pool"
                            options={[[1, "P1"], [2, "P2"]]}
                            ref={(c) => this.lanes[laneId]["pool"] = c}
                    />
                </td>
            </tr>;
        };

        let rows = range8.map(makeRow);

        return (
            <form className={formsCss.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

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

