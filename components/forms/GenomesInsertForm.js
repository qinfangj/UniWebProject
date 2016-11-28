import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';
import cx from 'classnames';

import TextField from './elements/TextField';
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



class GenomesInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "genomes";
        this.form = "genomes";
        this.required = ["organism", "assembly", "genome_folder", "url",
            "downloaded_date", "files", "comment", "isMasked", "isArchived"];
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

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Organism */}

                    <Col sm={4} className={css.formCol}>
                        <Options.Taxonomies form={this.form} ref={(c) => this._organism = c} />
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

                    <Col sm={4} className={css.formCol}>
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

                    <Col sm={4} className={css.formCol}>
                        <DatePicker name="downloaded_date" label="Download date"
                                    ref = {(c) => this._downloadedDate = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset">

                    {/* File names */}

                    <div className={css.soloField}>
                        <TextField name="files" label="File names"
                                   invalid = {!!this.state.invalid["files"]}
                                   missing = {!!this.state.missing["files"]}
                                   ref = {(c) => this._files = c}
                                   defaultValue = "truc.txt, autre.txt"
                        />
                    </div>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextField name="comment" label="Comment"
                                   invalid = {!!this.state.invalid["comment"]}
                                   ref = {(c) => this._comment = c}
                                   defaultValue = "!!"
                        />
                    </Col>

                    {/* Is masked / is archived */}

                    <Col sm={2} className={css.formCol}>
                        <CheckBox ref={(c) => this._isMasked = c} name="isMasked" label="Masked" />
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

