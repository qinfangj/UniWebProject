import React from 'react';
import css from '../forms.css';
import cx from 'classnames';
import store from '../../../core/store';
import { findByIdAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Textarea from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as forms from '../forms.js';
import * as Options from '../subcomponents/Options';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class SamplesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "samples";
        this.form = "samples";
        this.required = ["name", "short_name", "project_id", "organism", "taxo_id"];
        this.state = forms.defaultFormState;
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
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
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

    getFormValues() {
        return {
            name: this._name.getValue(),
            short_name: this._shortName.getValue(),
            project_id: this._project.getValue(),
            taxo_id: this._organism.getValue(),
            sample_type_id: this._sampleType.getValue(),
            received_date: this._receivedDate.getValue(),
            quantif_method_id: this._quantification.getValue(),
            concentration: this._concentration.getValue(),
            volume: this._volume.getValue(),
            rin: this._rin.getValue(),
            ratio_260_280: this._ratio_260_280.getValue(),
            ratio_260_230: this._ratio_260_230.getValue(),
            description: this._description.getValue(),
            comment_customer: this._customerComment.getValue(),
            comment: this._internalComment.getValue(),
            isTrashed: this._isDiscarded.getValue(),
        };
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="name" label="Name" required
                                   missing = {!!this.state.missing["name"]}
                                   invalid = {!!this.state.invalid["name"]}
                                   validator = {validators.mediumStringValidator}
                                   ref={(c) => this._name = c}
                        />
                    </Col>

                    {/* Short name */}

                    <Col sm={3} className={css.formCol}>
                        <TextField name="short_name" label="Short name" required
                                   missing = {!!this.state.missing["short_name"]}
                                   invalid = {!!this.state.invalid["short_name"]}
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
                        <DatePicker name="received_date" label="Received date"
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
                        <TextField name="concentration" label="Concentration" required
                                   missing = {!!this.state.missing["concentration"]}
                                   invalid = {!!this.state.invalid["concentration"]}
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._concentration = c}
                        />
                    </Col>

                    {/* Volume */}

                    <Col sm={3} className={css.formCol}>
                        <TextField name="volume" label="Volume" required
                                   missing = {!!this.state.missing["volume"]}
                                   invalid = {!!this.state.invalid["volume"]}
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._volume = c}
                        />
                    </Col>

                    {/* RIN */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="rin" label="RIN" required
                                   missing = {!!this.state.missing["rin"]}
                                   invalid = {!!this.state.invalid["rin"]}
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._rin = c}
                        />
                    </Col>

                    {/* Ratio 260/280 */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="ratio_260_280" label="Ratio 260/280"
                                   ref = {(c) => this._ratio_260_280 = c}
                        />
                    </Col>

                    {/* Ratio 260/230 */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="ratio_260_230" label="Ratio 260/230"
                                   ref = {(c) => this._ratio_260_230 = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Description */}

                    <Col sm={12} className={css.formCol}>
                        <TextField name="description" label="Description"
                                   ref = {(c) => this._description = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Customer's comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextField name="comment" label="Comment"
                                   ref = {(c) => this._customerComment = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Internal comment */}

                    <Col sm={10} className={css.formCol}>
                        <Textarea name="comment_customer" label="Internal comment"
                                  ref = {(c) => this._internalComment = c}
                        />
                    </Col>

                    {/* Is trashed */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox name="is_discarded" label="Discarded"
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

