import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import { findByIdAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Textarea from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as forms from '../forms.js';
import * as Options from '../subcomponents/Options';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';
import formStoreKeys from '../../constants/formStoreKeys';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class LibrariesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "libraries";
        this.form = formStoreKeys.LIBRARIES_INSERT_FORM;
        this.state = forms.defaultFormState;
        this.projectsFormKey = this.form +"_projects";
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

                    {/* Project */}

                    <Col sm={5} className={css.formCol}>
                        {Options.ProjectsWithSamples(this.form, this.projectsFormKey)}
                    </Col>

                    {/* Sample */}

                    <Col sm={3} className={css.formCol}>
                        <SecondaryOptions.ProjectSamples
                            referenceField={this.projectsFormKey}
                            form={this.form} ref={(c) => this._sample = c} />
                    </Col>

                    {/* Name */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="name" label="Name" form={this.form} required
                                   validator = {validators.mediumStringValidator}
                                   ref={(c) => this._name = c}
                        />
                    </Col>

                    {/* Library type - aka protocol */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibProtocols form={this.form} ref={(c) => this._protocol = c} />
                    </Col>

                    {/* Starting material */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="starting_material" label="Starting material" form={this.form} required
                                   ref={(c) => this._startingMaterial = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Library date */}

                    <Col sm={2} className={css.formCol}>
                        <DatePicker field="library_date" label="Library date"
                                    ref = {(c) => this._libraryDate = c}
                        />
                    </Col>


                    {/* Bioanalyser peak */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="bioanalyser_peak" label="Bioanalyser peak" form={this.form}
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._bioanalyserPeak = c}
                        />
                    </Col>

                    {/* Min frag size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="frag_size_min" label="Frag.size(min)" form={this.form} required
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._fragSizeMin = c}
                        />
                    </Col>

                    {/* Max frag size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="frag_size_max" label="Frag.size(max)" form={this.form} required
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._fragSizeMax = c}
                        />
                    </Col>

                    {/* Concentration */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="url" label="Concentration" form={this.form}
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._concentration = c}
                        />
                    </Col>

                    {/* Quantification */}

                    <Col sm={2} className={css.formCol}>
                        <Options.QuantifMethods form={this.form} ref={(c) => this._quantification = c} />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Multiplex index */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MultiplexIndexes form={this.form}
                            label="Multiplex index (I7)" suffix="all"
                            ref={(c) => this._multiplexIndex = c} />
                    </Col>

                    {/* Second (multiplex) index */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MultiplexIndexes form={this.form}
                            label="Second index (I5)" suffix="all"
                            ref={(c) => this._secondIndex = c} />

                    </Col>

                    {/* Volume */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field="volume" label="Volume" form={this.form}
                                   validator = {validators.numberValidator}
                                   ref = {(c) => this._volume = c}
                        />
                    </Col>

                    {/* Adapters */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibraryAdapters form={this.form} ref={(c) => this._adapter = c} />
                    </Col>

                    {/* Illumina kits and lots */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field="kits_lots" label="Illumina kits and lots" form={this.form}
                                   ref = {(c) => this._illuminaKits = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Customer's comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextField field="comment" label="Comment" form={this.form}
                                   ref = {(c) => this._customerComment = c}
                        />
                    </Col>

                    {/* Library state */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibraryStates form={this.form} ref={(c) => this._libraryState = c} />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Internal comment */}

                    <Col sm={10} className={css.formCol}>
                        <Textarea field="comment_customer" label="Internal comment" form={this.form}
                                  ref = {(c) => this._internalComment = c}
                        />
                    </Col>

                    {/* Is made by user / by robot / trashed */}

                    <Col sm={2} className={css.formCol}>
                        <Checkbox field="isCustomer_made" label="Made by user"
                                  ref = {(c) => this._isCustomerMade = c}
                        />
                        <Checkbox field="isRobot_made" label="Made by robot"
                                  ref = {(c) => this._isRobotMade = c}
                        />
                        <Checkbox field="is_discarded" label="Discarded"
                                  ref = {(c) => this._isTrashed = c}
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

