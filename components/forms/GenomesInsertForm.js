import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';

import TextField from './elements/TextField';
import CheckBox from './elements/CheckBox';
import Select from './elements/Select';
import DatePicker from './elements/DatePicker';
import validators from './validators';
import * as forms from './forms.js';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class GenomesInsertForm extends React.Component {
    constructor() {
        super();
        this.table = "genomes";
        this.required = ["organism", "assembly", "genome_folder", "url",
            "downloaded_date", "files", "comment", "isMasked", "isArchived"];
        this.state = {
            missing: {},
            invalid: {},
            submissionError: false,
            submissionSuccess: false,
            submissionId: null,
        };
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
        this.setState(newState);
        newState.submissionFuture.done((insertId) => {
            this.setState({ submissionSuccess: true, submissionId: insertId });
        });
    }

    getFormValues() {
        return {
            taxo_id: this._organism.getValue(),
            assembly: this._assembly.getValue(),
            genome_folder: this._genomeFolder.getValue(),
            url: this._url.getValue(),
            downloaded_date: this._downloadedDate.getValue(),
            files: this._files.getValue(),
            comment: this._comment.getValue(),
            isMasked: this._isMasked.getValue(),
            isArchived: this._isArchived.getValue(),
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

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Organism */}

                    <Col sm={4} className={css.formCol}>
                        <Select name="organism" label="Organism"
                                options={this.getOrganismsList()}
                                ref={(c) => this._organism = c}
                        />
                    </Col>

                    {/* Assembly */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="assembly" label="Assembly" required
                                   missing = {!!this.state.missing["assembly"]}
                                   invalid = {!!this.state.invalid["assembly"]}
                                   ref = {(c) => this._assembly = c}
                                   defaultValue="hg19"
                        />
                    </Col>

                    {/* Genome folder */}

                    <Col sm={4}>
                        <TextField name="genomeFolder" label="Genome folder" required
                                   missing = {!!this.state.missing["genome_folder"]}
                                   invalid = {!!this.state.invalid["genome_folder"]}
                                   ref = {(c) => this._genomeFolder = c}
                                   defaultValue="/path/to"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Url */}

                    <Col sm={8} className={css.formCol}>
                        <TextField name="url" label="URL"
                                   invalid = {!!this.state.invalid["url"]}
                                   ref = {(c) => this._url = c}
                                   defaultValue = "http://"
                        />
                    </Col>

                    {/* Downloaded date */}

                    <Col sm={4}>
                        <DatePicker name="downloaded_date" label="Download date"
                                    ref = {(c) => this._downloadedDate = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset">

                    {/* File names */}

                    <TextField name="files" label="File names"
                               invalid = {!!this.state.invalid["files"]}
                               missing = {!!this.state.missing["files"]}
                               ref = {(c) => this._files = c}
                               defaultValue = "truc.txt, autre.txt"
                    />

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={8} className={css.formCol}>
                        <TextField name="comment" label="Comment"
                                   invalid = {!!this.state.invalid["comment"]}
                                   ref = {(c) => this._comment = c}
                                   defaultValue = "!!"
                        />
                    </Col>

                    {/* Is masked */}

                    <Col sm={2} className={css.formCol}>
                        <CheckBox ref={(c) => this._isMasked = c} name="isMasked" label="Masked" />
                    </Col>

                    {/* Is achived */}

                    <Col sm={2}>
                        <CheckBox ref={(c) => this._isArchived = c} name="isArchived" label="Archived" />
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


export default GenomesInsertForm;

