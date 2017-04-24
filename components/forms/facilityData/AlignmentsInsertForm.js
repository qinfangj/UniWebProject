"use strict";
import React from 'react';
import css from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import TextArea from '../elements/Textarea';
import BasecallingsOutputFolders from '../subcomponents/secondarySelects/BasecallingsOutputFolders';
import * as Options from '../subcomponents/Options';
import * as forms from '../forms.js';
import formNames from '../../constants/formNames';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Feedback from '../../utils/Feedback';



class AlignmentsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "alignments";
        this.form = formNames.ALIGNMENTS_INSERT_FORM;
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        forms.newOrUpdate(this.form, this.table, this.props.updateId);
    }
    componentWillReceiveProps() {
        forms.newOrUpdate(this.form, this.table, this.props.updateId);
    }

    onSubmit() {
        forms.submit(this.form, this.table, null);
    }

    render() {
        return (
            <form className={css.form}>

                <Feedback reference={this.form} />

                <Form componentClass="fieldset" horizontal>

                    {/* Analysis type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.PipelineAnalysisTypes
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Run */}

                    <Col sm={3} className={css.formCol}>
                        <Options.RunsOutputFolders
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Unaligned data output folder (aka basecallingId) */}

                    <Col sm={7} className={css.formCol}>
                        <BasecallingsOutputFolders
                            form={this.form}
                            required
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Mapping tool */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MappingTools
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Alignment output folder */}

                    <Col sm={8} className={css.formCol}>
                        <TextField form={this.form}
                                   field={fields.ELAND_OUTPUT_DIR}
                                   label="Alignment output folder"
                                   required
                        />
                    </Col>

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox form={this.form}
                                  field={fields.HAS_QC_PDFS}
                                  label="QC report"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Config file content */}

                    <Col sm={12} className={css.formCol}>
                        <TextArea form={this.form} field={fields.CONFIG_FILE_CONTENT} label="Config file content" required
                                  defaultValue = "ANALYSIS xxx\nUSE_BASES xxx"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextArea field={fields.COMMENT} label="Comment" form={this.form}
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


export default AlignmentsInsertForm;

