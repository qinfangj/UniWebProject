import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import { findForUpdateAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Textarea from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as forms from '../forms.js';
import * as messages from '../messages';
import * as Options from '../subcomponents/Options';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class LibrariesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "libraries";
        this.form = formStoreKeys.LIBRARIES_INSERT_FORM;
        this.state = forms.defaultFormState;
        this.projectsFormKey = this.form + formStoreKeys.suffixes.PROJECTS;
        forms.initForm(this.form);
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        if (this.props.updateId) {
            store.dispatch(findForUpdateAsync(this.table, this.props.updateId, this.form));
        }
    }

    formatFormData(formData) {
        formData.concentration = parseInt(formData.concentration);
        formData.volume = parseInt(formData.volume);
        formData.fragSizeMin = parseInt(formData.fragSizeMin);
        formData.fragSizeMax = parseInt(formData.fragSizeMax);
        formData.bioanalyserPeak = parseInt(formData.bioanalyserPeak);
        return formData;
    }

    onSubmit() {
        let {submissionError, submissionFuture} = forms.submit(this.form, this.table, this.formatFormData);
        if (submissionError) {
            this.setState({ submissionError, serverError: {} });
        } else {
            submissionFuture.done((insertId) => {
                this.setState({ submissionSuccess: true, submissionId: insertId, submissionError: false, serverError: {} });
            }).fail((err) =>{
                this.setState({ serverError: err, submissionError: false, submissionSuccess: false });
            });
        }
    }

    render() {
        return (
            <form className={css.form}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                <Form componentClass="fieldset" horizontal>

                    {/* Project */}

                    <Col sm={5} className={css.formCol}>
                        {Options.ProjectsWithSamples(this.form)}
                    </Col>

                    {/* Sample */}

                    <Col sm={3} className={css.formCol}>
                        <SecondaryOptions.ProjectSamples form={this.form}
                         />
                    </Col>

                    {/* Name */}

                    <Col sm={2} className={css.formCol}>
                        <TextField form={this.form} field={fields.NAME} label="Name" required
                                   validator = {validators.mediumStringValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Library type - aka protocol */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibProtocols form={this.form}
                        />
                    </Col>

                    {/* Starting material */}

                    <Col sm={2} className={css.formCol}>
                        <TextField form={this.form} field={fields.STARTING_MATERIAL} label="Starting material" required
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Library date */}

                    <Col sm={2} className={css.formCol}>
                        <DatePicker form={this.form} field={fields.LIBRARY_DATE} label="Library date"
                        />
                    </Col>


                    {/* Bioanalyser peak */}

                    <Col sm={2} className={css.formCol}>
                        <TextField form={this.form}field={fields.BIOANALYSER_PEAK} label="Bioanalyser peak"
                                   validator = {validators.numberValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Min frag size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField form={this.form}field={fields.FRAG_SIZE_MIN} label="Frag.size(min)" required
                                   validator = {validators.numberValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Max frag size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField form={this.form} field={fields.FRAG_SIZE_MAX} label="Frag.size(max)" required
                                   validator = {validators.numberValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Concentration */}

                    <Col sm={2} className={css.formCol}>
                        <TextField form={this.form} field={fields.CONCENTRATION} label="Concentration"
                                   validator = {validators.numberValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Quantification */}

                    <Col sm={2} className={css.formCol}>
                        <Options.QuantifMethods form={this.form} field={fields.QUANTIF_METHOD_ID}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Multiplex index */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MultiplexIndexes form={this.form}
                            label="Multiplex index (I7)" suffix="all"
                        />
                    </Col>

                    {/* Second (multiplex) index */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MultiplexIndexes form={this.form}
                            label="Second index (I5)" suffix="all"
                        />
                    </Col>

                    {/* Volume */}

                    <Col sm={2} className={css.formCol}>
                        <TextField form={this.form} field={fields.VOLUME} label="Volume"
                                   validator = {validators.numberValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Adapters */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibraryAdapters form={this.form} field={fields.ADAPTER_ID}
                        />
                    </Col>

                    {/* Illumina kits and lots */}

                    <Col sm={4} className={css.formCol}>
                        <TextField form={this.form} field={fields.KITS_LOTS} label="Illumina kits and lots"
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Customer's comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextField form={this.form} field={fields.COMMENT} label="Comment"
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Library state */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibraryStates form={this.form} field={fields.LIBRARY_STATE_ID}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Internal comment */}

                    <Col sm={10} className={css.formCol}>
                        <Textarea form={this.form} field={fields.COMMENT_CUSTOMER} label="Internal comment"
                                  submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Is made by user / by robot / trashed */}

                    <Col sm={2} className={css.formCol}>
                        <Checkbox form={this.form} field={fields.IS_CUSTOMER_MADE} label="Made by user"
                        />
                        <Checkbox form={this.form} field={fields.IS_ROBOT_MADE} label="Made by robot"
                        />
                        <Checkbox form={this.form} field={fields.IS_TRASHED} label="Discarded"
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


export default LibrariesInsertForm;

