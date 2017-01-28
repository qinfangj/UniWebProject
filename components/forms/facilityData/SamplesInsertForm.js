import React from 'react';
import css from '../forms.css';
import cx from 'classnames';
import store from '../../../core/store';
import { findForUpdateAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Textarea from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as forms from '../forms.js';
import * as Options from '../subcomponents/Options';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from './fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class SamplesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "samples";
        this.form = formStoreKeys.SAMPLES_INSERT_FORM;
        this.state = forms.defaultFormState;
        forms.initForm(this.form);
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let initFormData = store.getState().facilityData["updateData"];
            if (initFormData && Object.keys(initFormData).length > 0) {
                console.debug(this.props.updateId, initFormData)
                this.setState({ initFormData });
            }
        });
        if (this.props.updateId) {
            store.dispatch(findByIdAsync(this.table, this.props.updateId));
        }
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    onSubmit() {
        let newState = forms.submit(this.form, this.table, null);
        this.setState(newState);
        if (!newState.submissionError) {
            newState.submissionFuture.done((insertId) => {
                this.setState({ submissionSuccess: true, submissionId: insertId });
            }).fail(() =>{
                console.warn("Uncaught form validation error");
                this.setState({ submissionError: true });
            });
        }
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field="name" label="Name" form={this.form} required
                                   validator = {validators.mediumStringValidator}
                                   ref={(c) => this._name = c}
                        />
                    </Col>

                    {/* Short name */}

                    <Col sm={3} className={css.formCol}>
                        <TextField field="short_name" label="Short name" form={this.form} required
                                   validator = {validators.shortStringValidator}
                                   ref={(c) => this._shortName = c}
                        />
                    </Col>

                    {/* Project */}

                    <Col sm={5} className={css.formCol}>
                        <Options.Projects suffix="all" form={this.form} ref={(c) => this._project = c} />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Organism */}

                    <Col sm={3} className={css.formCol}>
                        <Options.Taxonomies form={this.form} ref={(c) => this._organism = c} />
                    </Col>

                    {/* Sample type */}

                    <Col sm={3} className={css.formCol}>
                        <Options.SampleTypes form={this.form} ref={(c) => this._sampleType = c} />
                    </Col>

                    {/* Received date */}

                    <Col sm={3} className={css.formCol}>
                        <DatePicker field="received_date" label="Received date"
                                    ref = {(c) => this._receivedDate = c}
                        />
                    </Col>

                    {/* Quantification */}

                    <Col sm={3} className={css.formCol}>
                        <Options.QuantifMethods form={this.form} ref={(c) => this._quantification = c} />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Concentration */}

                    <Col sm={3} className={css.formCol}>
                        <TextField field="concentration" label="Concentration" form={this.form} required
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._concentration = c}
                        />
                    </Col>

                    {/* Volume */}

                    <Col sm={3} className={css.formCol}>
                        <TextField field="volume" label="Volume" form={this.form} required
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._volume = c}
                        />
                    </Col>

                    {/* RIN */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="rin" label="RIN" form={this.form} required
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._rin = c}
                        />
                    </Col>

                    {/* Ratio 260/280 */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="ratio_260_280" label="Ratio 260/280" form={this.form}
                                   ref = {(c) => this._ratio_260_280 = c}
                        />
                    </Col>

                    {/* Ratio 260/230 */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="ratio_260_230" label="Ratio 260/230" form={this.form}
                                   ref = {(c) => this._ratio_260_230 = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Description */}

                    <Col sm={12} className={css.formCol}>
                        <TextField field="description" label="Description" form={this.form}
                                   ref = {(c) => this._description = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Customer's comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextField field="comment" label="Comment" form={this.form}
                                   ref = {(c) => this._customerComment = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Internal comment */}

                    <Col sm={10} className={css.formCol}>
                        <Textarea field="comment_customer" label="Internal comment" form={this.form}
                                  ref = {(c) => this._internalComment = c}
                        />
                    </Col>

                    {/* Is trashed */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox field="is_discarded" label="Discarded"
                                  ref = {(c) => this._isDiscarded = c}
                        />
                    </Col>

                </Form>

                {/* Submit */}

                <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default SamplesInsertForm;

