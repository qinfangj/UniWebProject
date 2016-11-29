import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';

import TextField from './elements/TextField';
import Textarea from './elements/TextField';
import CheckBox from './elements/MyCheckbox';
import Select from './elements/Select';
import DatePicker from './elements/DatePicker';
import validators from './validators';
import * as forms from './forms.js';
import * as options from './options';
import * as Options from './subcomponents/Options';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class LibrariesInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "libraries";
        this.form = "libraries";
        this.required = ["sample_id", "name", "lib_protocol_id", "library_date", "starting_material",
                         "frag_size_min", "frag_size_max", "multiplex_index_id"];
        this.state = forms.defaultFormState;
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

    /* Group fields to not exceed 22 scala tuple size limit */
    getFormValues() {
        return {
            project_id: this._project.getValue(),
            sample_id: this._sample.getValue(),
            name: this._name.getValue(),
            lib_protocol_id: this._protocol.getValue(),
            starting_material: this._startingMaterial.getValue(),
            library_date: this._libraryDate.getValue(),
            bioanalyser_peak: this._bioanalyserPeak.getValue(),
            frag_size_min: this._fragSizeMin.getValue(),
            frag_size_max: this._fragSizeMax.getValue(),
            multiplex_index_id: this._multiplexIndex.getValue(),
            index_5prime_id: this._secondIndex.getValue(),
            adapter_id: this._adapter.getValue(),
            kits_lots: this._illuminaKits.getValue(),
            comment_customer: this._customerComment.getValue(),
            library_state_id: this._libraryState.getValue(),
            comment: this._internalComment.getValue(),
            isCustomer_made: this._isCustomerMade.getValue(),
            isRobot_made: this._isRobotMade.getValue(),
            isTrashed: this._isTrashed.getValue(),
            quantif_method_id: this._quantification.getValue(),
            concentration: this._concentration.getValue(),
            volume: this._volume.getValue(),
        };
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Project */}

                    <Col sm={4} className={css.formCol}>
                        <Options.Projects form={this.form} ref={(c) => this._project = c} />
                    </Col>

                    {/* Sample */}

                    <Col sm={2} className={css.formCol}>
                        <Select name="sample_id" label="Sample" form={this.form}
                                options={options.getSamplesList()}   // will depend on the project
                                ref={(c) => this._sample = c}
                        />
                    </Col>

                    {/* Name */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="name" label="Name" required
                                   missing = {!!this.state.missing["name"]}
                                   invalid = {!!this.state.invalid["name"]}
                                   validator = {validators.mediumStringValidator}
                                   ref={(c) => this._name = c}
                        />
                    </Col>

                    {/* Protocol */}

                    <Col sm={2} className={css.formCol}>
                        <Select name="lib_protocol_id" label="Protocol" form={this.form}
                                options={options.getLibProtocols()}
                                ref={(c) => this._protocol = c}
                        />
                    </Col>

                    {/* Starting material */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="starting_material" label="Starting material" required
                                   missing = {!!this.state.missing["starting_material"]}
                                   invalid = {!!this.state.invalid["starting_material"]}
                                   ref={(c) => this._startingMaterial = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Library date */}

                    <Col sm={2} className={css.formCol}>
                        <DatePicker name="library_date" label="Library date"
                                    ref = {(c) => this._libraryDate = c}
                        />
                    </Col>


                    {/* Bioanalyser peak */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="bioanalyser_peak" label="Bioanalyser peak"
                                   validator = {validators.numberValidator}
                                   invalid = {!!this.state.invalid["bioanalyser_peak"]}
                                   ref = {(c) => this._bioanalyserPeak = c}
                        />
                    </Col>

                    {/* Min frag size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="frag_size_min" label="Frag.size(min)" required
                                   validator = {validators.numberValidator}
                                   invalid = {!!this.state.invalid["frag_size_min"]}
                                   missing = {!!this.state.missing["frag_size_min"]}
                                   ref = {(c) => this._fragSizeMin = c}
                        />
                    </Col>

                    {/* Max frag size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="frag_size_max" label="Frag.size(max)" required
                                   validator = {validators.numberValidator}
                                   invalid = {!!this.state.invalid["frag_size_max"]}
                                   missing = {!!this.state.missing["frag_size_max"]}
                                   ref = {(c) => this._fragSizeMax = c}
                        />
                    </Col>

                    {/* Concentration */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="url" label="Concentration"
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
                        <Select name="multiplex_index_id" label="Multiplex index" form={this.form}
                                options={options.getMultiplexIndexes()}
                                ref={(c) => this._multiplexIndex = c}
                        />
                    </Col>

                    {/* Second (multiplex) index */}

                    <Col sm={2} className={css.formCol}>
                        <Select name="index_5prime_id" label="Second index" form={this.form}
                                options={options.getMultiplexIndexes()}
                                ref={(c) => this._secondIndex = c}
                        />
                    </Col>

                    {/* Volume */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="volume" label="Volume"
                                   validator = {validators.numberValidator}
                                   invalid={!! this.state.invalid["volume"]}
                                   ref = {(c) => this._volume = c}
                        />
                    </Col>

                    {/* Adapters */}

                    <Col sm={2} className={css.formCol}>
                        <Select name="adapter_id" label="Adapter" form={this.form}
                                options={options.getAdapters()}
                                ref={(c) => this._adapter = c}
                        />
                    </Col>

                    {/* Illumina kits and lots */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="kits_lots" label="Illumina kits and lots"
                                   ref = {(c) => this._illuminaKits = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Customer's comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextField name="comment" label="Comment"
                                   ref = {(c) => this._customerComment = c}
                        />
                    </Col>

                    {/* Library state */}

                    <Col sm={2} className={css.formCol}>
                        <Select name="library_state_id" label="Library state" form={this.form}
                                options={options.getLibraryStates()}
                                ref={(c) => this._libraryState = c}
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

                    {/* Is made by user / by robot / trashed */}

                    <Col sm={2} className={css.formCol}>
                        <CheckBox name="isCustomer_made" label="Made by user"
                                  ref = {(c) => this._isCustomerMade = c}
                        />
                        <CheckBox name="isRobot_made" label="Made by robot"
                                  ref = {(c) => this._isRobotMade = c}
                        />
                        <CheckBox name="is_discarded" label="Discarded"
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

