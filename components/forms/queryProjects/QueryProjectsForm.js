import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Textarea from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as Options from '../subcomponents/Options';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class QueryProjectsForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.form = "queryProjects";
        this.projectsFormKey = this.form + "_project";
        this.libraryFormKey = this.form + "_library";
    }

    render() {
        return (
            <Form>
                {Options.ProjectsWithLibraries(this.form, this.projectsFormKey)}
                <SecondaryOptions.ProjectLibraries
                    form={this.form}
                    referenceField={this.projectsFormKey}  // the store key to the form value
                    storeKey={this.libraryFormKey}        // the store key for the result list
                    ref={(c) => this._project = c}
                />
            </Form>
        );
    }
}


export default QueryProjectsForm;