import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import formsCss from '../forms.css';
import css from './queryProjects.css';
import cx from 'classnames';
import store from '../../../core/store';
import { searchSamplesByTerm } from '../../actions/actionCreators/asyncActionCreators';

import ProjectsMultipleSelect from './ProjectsMultipleSelect';
import SamplesSecondaryMultipleSelect from './SamplesSecondaryMultipleSelect';
import * as forms from '../forms';
import formStoreKeys from '../../constants/formStoreKeys';
import dataStoreKeys from '../../constants/dataStoreKeys';

import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';

import Col from 'react-bootstrap/lib/Col';


/**
 * Holds together the projects and samples multiple selectors,
 * and allows to filter their options by term.
 */
class QueryProjectsForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.form = formStoreKeys.QUERY_PROJECTS_FORM;
        // Build store keys for selected form values
        this.projectsFormKey = this.form + formStoreKeys.suffixes.PROJECTS;
        this.samplesFormKey = this.form + formStoreKeys.suffixes.SAMPLES;
        this.state = {
            searchValue: "",
            projectIds: null,  // if filtered by term, a restriction on the selection (not the selection itself)
            sampleIds: null,   // idem
        };
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let searchedSamples = forms.getStoreData(dataStoreKeys.SAMPLES_BY_TERM);
            let {projectIds, sampleIds} = this.filterOptions(this.state.searchValue, searchedSamples);
            this.setState({ projectIds, sampleIds });
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    /**
     * Not a simple filter: we keep options from both projects and samples lists,
     *  where the project either contains the term or has a sample containing it,
     *  and where the sample either contains the term of its project contains it.
     */
    onSearch(e) {
        let term = e.target.value.toLowerCase();
        this.setState({ searchValue: term });
        store.dispatch(searchSamplesByTerm(term, dataStoreKeys.SAMPLES_BY_TERM));
    }

    getProjectsList() {
        return forms.getStoreData(dataStoreKeys.PROJECTS_WITH_SAMPLE);
    }
    getSamplesList() {
        return forms.getStoreData(dataStoreKeys.SAMPLES_FOR_PROJECTS);
    }
    filterOptions(term, searchedSamples) {
        if (term === "") {
            return {
                projectIds: null,
                sampleIds: null,
            };
        } else {
            let projects = this.getProjectsList();
            let samples = this.getSamplesList();
            // IE can't do that, but who needs IE anyway?
            let sampleIdsWithTerm = new Set(searchedSamples.map(v => v.id));
            let projectIdsWithTerm = new Set(projects.filter(v => {
                return v.name.toLowerCase().indexOf(term) >= 0
                    || v.last_name.toLowerCase().indexOf(term) >= 0;
            }).map(v => v.id));
            let sampleIdsWithProject = new Set(samples.filter(v => projectIdsWithTerm.has(v.project_id)).map(v => v.id));
            let projectIdsWithSample = new Set(searchedSamples.map(v => v.project_id));
            // Union, the JS way.
            let projectIds = new Set([...projectIdsWithTerm, ...projectIdsWithSample]);
            let sampleIds = new Set([...sampleIdsWithTerm, ...sampleIdsWithProject]);
            return { projectIds, sampleIds };
        }
    }

    render() {
        return (
            <Form>
                <FormControl type="text" placeholder="Search" className={formsCss.searchField}
                             value={this.state.searchValue}
                             onChange={this.onSearch.bind(this)}
                />
                <Col sm={6} className={css.col6}>
                    <ProjectsMultipleSelect
                        label="Projects"
                        form={this.form}
                        formKey={this.projectsFormKey}
                        suffix="samples"
                        filterByIds={this.state.projectIds}
                    />
                </Col>
                <Col sm={6} className={css.col6}>
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