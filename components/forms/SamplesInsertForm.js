import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';

import TextField from './elements/TextField';
import Textarea from './elements/TextField';
import CheckBox from './elements/CheckBox';
import Select from './elements/Select';
import DatePicker from './elements/DatePicker';
import validators from './validators';
import * as forms from './forms.js';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class SamplesInsertForm extends React.Component {
    constructor() {
        super();
        this.table = "samples";
        this.required = ["name", "project_id", "organism", "taxo_id"];
        this.state = {
            missing: {},
            invalid: {},
            submissionError: false,
        };
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
        this.setState(newState);
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

    /**
     * Available values for the project analysis dropdown.
     */
    getOrganismsList() {
        let values = [[1,"Human"], [2,"Mouse"], [3,"Fly"]];
        return values;
        // DBIinsert::optiondisplaydbOrdered('taxonomies',['id','name'], ['name']);
    }

    getProjectsList() {
        return [[1, "Project1"], [2, "Project2"]];
    }

    getSampleTypesList() {
        return [[1, "type1"], [2, "type2"]];
    }

    getQuantifTypesList() {
        return [[1, "qtype1"], [2, "qtype2"],];
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />

                <Form componentClass="fieldset" horizontal>

                    {/* Name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="name" label="Name"
                                   ref={(c) => this._name = c}
                        />
                    </Col>

                    {/* Short name */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="short_name" label="Short name"
                                   ref={(c) => this._shortName = c}
                        />
                    </Col>

                    {/* Project */}

                    <Col sm={6}>
                        <Select name="project_id" label="Project"
                                options={this.getProjectsList()}
                                ref={(c) => this._project = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Organism */}

                    <Col sm={3} className={css.formCol}>
                        <Select name="organism" label="Organism"
                                options={this.getOrganismsList()}
                                ref={(c) => this._organism = c}
                        />
                    </Col>

                    {/* Sample type */}

                    <Col sm={3} className={css.formCol}>
                        <Select name="sample_type" label="Sample_type"
                                options={this.getSampleTypesList()}
                                ref={(c) => this._sampleType = c}
                        />
                    </Col>

                    {/* Received date */}

                    <Col sm={3} className={css.formCol}>
                        <DatePicker name="received_date" label="Received date"
                                    ref = {(c) => this._receivedDate = c}
                        />
                    </Col>

                    {/* Quantification */}

                    <Col sm={3}>
                        <Select name="quantif_type_id" label="Quantification"
                                options={this.getQuantifTypesList()}
                                ref={(c) => this._quantification = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Concentration */}

                    <Col sm={3} className={css.formCol}>
                        <TextField name="url" label="Concentration"
                                   ref = {(c) => this._concentration = c}
                        />
                    </Col>

                    {/* Volume */}

                    <Col sm={3} className={css.formCol}>
                        <TextField name="url" label="Volume"
                                   ref = {(c) => this._volume = c}
                        />
                    </Col>

                    {/* RIN */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="url" label="RIN"
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

                    <Col sm={2}>
                        <TextField name="ratio_260_230" label="Ratio 260/230"
                                   ref = {(c) => this._ratio_260_230 = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Description */}

                    <Col sm={12}>
                        <TextField name="description" label="Description"
                                   ref = {(c) => this._description = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Customer's comment */}

                    <Col sm={12}>
                        <TextField name="comment" label="Comment"
                                   ref = {(c) => this._customerComment = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Internal comment */}

                    <Col sm={10}>
                        <Textarea name="comment_customer" label="Internal comment"
                                  ref = {(c) => this._internalComment = c}
                        />
                    </Col>

                    {/* Is trashed */}

                    <Col sm={2}>
                        <CheckBox name="is_discarded" label="Discarded"
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

