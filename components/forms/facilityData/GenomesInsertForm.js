import React from 'react';
import css from '../forms.css';
import cx from 'classnames';
import store from '../../../core/store';
import { findByIdAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as forms from '../forms.js';
import * as Options from '../subcomponents/Options';
import formStoreKeys from '../../constants/formStoreKeys';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class GenomesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "genomes";
        this.form = formStoreKeys.GENOMES_INSERT_FORM;
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

                    {/* Organism */}

                    <Col sm={4} className={css.formCol}>
                        <Options.Taxonomies form={this.form} ref={(c) => this._organism = c} />
                    </Col>

                    {/* Assembly */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field="assembly" label="Assembly" form={this.form} required
                                   ref = {(c) => this._assembly = c}
                                   defaultValue="hg19"
                        />
                    </Col>

                    {/* Genome folder */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field="genomeFolder" label="Genome folder" form={this.form} required
                                   ref = {(c) => this._genomeFolder = c}
                                   defaultValue="/path/to"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Url */}

                    <Col sm={8} className={css.formCol}>
                        <TextField field="url" label="URL" form={this.form}
                                   ref = {(c) => this._url = c}
                                   defaultValue = "http://"
                        />
                    </Col>

                    {/* Downloaded date */}

                    <Col sm={4} className={css.formCol}>
                        <DatePicker field="downloaded_date" label="Download date"
                                    ref = {(c) => this._downloadedDate = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* File names */}

                    <Col sm={12} className={css.formCol}>
                        <TextField field="files" label="File names" form={this.form}
                                   ref = {(c) => this._files = c}
                                   defaultValue = "truc.txt, autre.txt"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextField field="comment" label="Comment" form={this.form}
                                   ref = {(c) => this._comment = c}
                                   defaultValue = "!!"
                        />
                    </Col>

                    {/* Is masked / is archived */}

                    <Col sm={2} className={css.formCol}>
                        <Checkbox ref={(c) => this._isMasked = c} field="isMasked" label="Masked" />
                        <Checkbox ref={(c) => this._isArchived = c} field="isArchived" label="Archived" />
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

