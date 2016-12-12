import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from '../forms.css';
import cx from 'classnames';
import store from '../../../core/store';
import { changeFormValue, searchQueryProjects } from '../../actions/actionCreators/commonActionCreators';

import ProjectsMultipleSelect from './ProjectsMultipleSelect';
import SamplesSecondaryMultipleSelect from './SamplesSecondaryMultipleSelect';
import * as forms from '../forms';
import formStoreKeys from '../../constants/formStoreKeys';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import Col from 'react-bootstrap/lib/Col';



class QueryProjectsForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.form = formStoreKeys.QUERY_PROJECTS_FORM;
        this.projectsFormKey = this.form + formStoreKeys.suffixes.PROJECTS;
        this.samplesFormKey = this.form + formStoreKeys.suffixes.SAMPLES;
        this.state = {
            searchValue: "",
        };
    }

    onSearch(e) {
        let value = e.target.value;
        this.setState({searchValue: value});
        store.dispatch(searchQueryProjects(value));
    }

    render() {
        return (
            <Form>
                <FormControl type="text" placeholder="Search" className={css.searchField}
                             value={this.state.searchValue}
                             onChange={this.onSearch.bind(this)}
                />
                ​<Col sm={6}>
                    <ProjectsMultipleSelect
                        label="Projects"
                        form={this.form}
                        formKey={this.projectsFormKey}
                        suffix="samples"
                        filterBy={this.state.searchValue}
                    />
                </Col>
                <Col sm={6}>
                    <SamplesSecondaryMultipleSelect
                        label="Samples"
                        form={this.form}
                        referenceField={this.projectsFormKey}
                        formKey={this.samplesFormKey}
                        filterBy={this.state.searchValue}
                    />
                </Col>
            </Form>
        );
    }
}


export default QueryProjectsForm;