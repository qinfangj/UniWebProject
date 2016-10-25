import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactDOM from 'react-dom';
import css from './forms.css';

import TextField from './elements/TextField';
import CheckBox from './elements/CheckBox';
import LabsList from './subcomponents/LabsList';
import validators from './validators';
import * as forms from './forms.js';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class GenomesInsertForm extends React.Component {
    constructor() {
        super();
        this.table = "genomes";
        this.required = ["organism", "assembly", "genome_folder", "url",
            "download_date", "files", "comment", "isMasked", "isArchived"];
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
        let value = (ref) => {
            let v = ReactDOM.findDOMNode(ref).value.trim();
            return v === "none" ? null : v;
        };
        return {
            taxo_id: value(this._organism),
            assembly: this._assembly.getValue(),
            genome_folder: this._genomeFolder.getValue(),
            url: this._url.getValue(),
            downloaded_date: value(this._downloadedDate),
            files: this._files.getValue(),
            comment: this._comment.getValue(),
            isMasked: value(this._isMasked) === "Yes" ? 1 : 0,
            isArchived: this._isArchived.getValue(),
        };
    }

    /**
     * Available values for the project analysis dropdown.
     */
    getOrganismsList() {
        let values = [[1,"Human"], [2,"Mouse"], [3,"Fly"]];
        return values.map(v => {
            return <option value={v[0]} key={v[0]}>{v[1]}</option>;
        });
        // DBIinsert::optiondisplaydbOrdered('taxonomies',['id','name'], ['name']);
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />

                <Form componentClass="fieldset" horizontal>

                    {/* Organism */}

                    <Col sm={4} className={css.formCol}>
                        <FormGroup controlId="organism" >
                            <ControlLabel>Project analysis</ControlLabel>
                            <FormControl componentClass="select" placeholder="Organism"
                                         ref={(c) => this._organism = c} >
                                {this.getOrganismsList()}
                            </FormControl>
                        </FormGroup>
                    </Col>

                    {/* Assembly */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="assembly" visibleName="Assembly" required
                                   missing = {!!this.state.missing["assembly"]}
                                   invalid = {!!this.state.invalid["assembly"]}
                                   ref = {(c) => this._assembly = c}
                                   defaultValue="hg19"
                        />
                    </Col>

                    {/* Genome folder */}

                    <Col sm={4}>
                        <TextField name="genomeFolder" visibleName="Genome folder" required
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
                        <TextField name="url" visibleName="URL"
                                   invalid = {!!this.state.invalid["url"]}
                                   ref = {(c) => this._url = c}
                                   defaultValue = "http://"
                        />
                    </Col>

                    {/* Downloaded date */}

                    <Col sm={4}>
                        <FormGroup controlId="downloaded_date" >
                            <ControlLabel>Download date</ControlLabel>
                            <FormControl
                                type="date"
                                placeholder="Download date"
                                ref={(c) => this._downloadedDate = c}
                                defaultValue="2000-01-01"
                            />
                        </FormGroup>
                    </Col>

                </Form>
                <Form componentClass="fieldset">

                    {/* File names */}

                    <TextField name="files" visibleName="File names"
                               invalid = {!!this.state.invalid["files"]}
                               missing = {!!this.state.missing["files"]}
                               ref = {(c) => this._files = c}
                               defaultValue = "truc.txt, autre.txt"
                    />

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={8} className={css.formCol}>
                        <TextField name="comment" visibleName="Comment"
                                   invalid = {!!this.state.invalid["comment"]}
                                   ref = {(c) => this._comment = c}
                                   defaultValue = "!!"
                        />
                    </Col>

                    {/* Is masked */}

                    <Col sm={2} className={css.formCol}>
                        <FormGroup controlId="isMasked" >
                            <ControlLabel>Masked</ControlLabel>
                            <FormControl componentClass="select" placeholder="Organism"
                                         ref={(c) => this._isMasked = c} >
                                <option>Yes</option>
                                <option>No</option>
                            </FormControl>
                        </FormGroup>
                    </Col>

                        {/* Is achived */}

                    <Col sm={2}>
                        <FormGroup controlId="isArchived" >
                            <CheckBox ref={(c) => this._isArchived = c} label="Archived" />
                        </FormGroup>
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

