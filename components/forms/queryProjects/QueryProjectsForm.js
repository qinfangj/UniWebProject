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
import dataStoreKeys from '../../constants/dataStoreKeys';

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
            projectIds: null,
            sampleIds: null,
        };
    }

    /**
     * Not a simple filter: we keep options from both projects and samples lists,
     *  where the project either contains the term or has a sample containing it,
     *  and where the sample either contains the term of its project contains it.
     */
    onSearch(e) {
        let value = e.target.value.toLowerCase();
        let {projectIds, sampleIds} = this.filterOptions(value);
        this.setState({ projectIds, sampleIds, searchValue: value });
        store.dispatch(searchQueryProjects(value));
    }

    getProjectsList() {
        return forms.getOptionsList(dataStoreKeys.PROJECTS_WITH_SAMPLE);
    }
    getSamplesList() {
        return forms.getOptionsList(dataStoreKeys.SAMPLES_FOR_PROJECTS);
    }
    filterOptions(term) {
        if (term === "") {
            return {
                projectIds: null,
                sampleIds: null,
            };
        } else {
            let projects = this.getProjectsList();
            let samples = this.getSamplesList();
            // IE can't do that, but who needs IE anyway?
            let sampleIdsWithTerm = new Set(samples.filter(v => {
                return v.name.toLowerCase().indexOf(term) >= 0;
            }).map(v => v.id));
            let projectIdsWithTerm = new Set(projects.filter(v => {
                return v.name.toLowerCase().indexOf(term) >= 0
                    || v.last_name.toLowerCase().indexOf(term) >= 0;
            }).map(v => v.id));

            for (let item of projectIdsWithTerm) console.log("P00", item);
            for (let item of sampleIdsWithTerm) console.log("S00", item);

            let sampleIdsWithProject = new Set(samples.filter(v => projectIdsWithTerm.has(v.project_id)).map(v => v.id));
            let projectIdsWithSample = new Set(projects.filter(v => sampleIdsWithTerm.has(v.id)).map(v => v.id));

            for (let item of projectIdsWithSample) console.log("P0", item);
            for (let item of sampleIdsWithProject) console.log("S0", item);

            // Union, the JS way.
            let projectIds = new Set([...projectIdsWithTerm, ...projectIdsWithSample]);
            let sampleIds = new Set([...sampleIdsWithTerm, ...sampleIdsWithProject]);

            for (let item of projectIds) console.log("P", item);
            for (let item of sampleIds) console.log("S", item);

            return { projectIds, sampleIds };
        }
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
                        filterByIds={this.state.projectIds}
                    />
                </Col>
                <Col sm={6}>
                    <SamplesSecondaryMultipleSelect
                        label="Samples"
                        form={this.form}
                        referenceField={this.projectsFormKey}
                        formKey={this.samplesFormKey}
                        filterByIds={this.state.sampleIds}
                    />
                </Col>
            </Form>
        );
    }
}


export default QueryProjectsForm;