import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from '../forms.css';
import cx from 'classnames';

import validators from '../validators';
import ProjectsMultipleSelect from './ProjectsMultipleSelect';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';
import * as forms from '../forms';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import Col from 'react-bootstrap/lib/Col';



class QueryProjectsForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.form = "queryProjects";
        this.projectsFormKey = this.form + "_project";
        this.projectsStoreKey = this.projectsFormKey;
        this.libraryFormKey = this.form + "_library";
        this.libraryStoreKey = this.libraryFormKey;
        this.state = {
            selectedProjects: [],
            selectedSamples: [],
        };
    }

    getFormValue(storeKey) {
        return forms.getFormValue(this.form, storeKey);
    }

    getFormData() {
        return {
            project_id: this.getFormValue(this.projectsFormKey),
            library_id: this.getFormValue(this.libraryFormKey),
        };
    }

    render() {
        return (
            <Form>
                ​<Col sm={6}>
                    <ProjectsMultipleSelect
                        label="Projects"
                        form={this.form}
                        formKey={this.projectsFormKey}
                        storeKey={this.projectsStoreKey}
                        suffix="samples"
                    />
                </Col>
                <Col sm={6}>
                    <SecondaryOptions.ProjectSamples
                        form={this.form}
                        referenceField={this.projectsFormKey}  // the store key to the form value
                        storeKey={this.libraryStoreKey}        // the store key for the result list
                    />
                </Col>
            </Form>
        );
    }
}


export default QueryProjectsForm;