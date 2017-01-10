import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import formsCss from '../forms.css';
import css from './queryProjects.css';
import cx from 'classnames';
import store from '../../../core/store';
import { searchSamplesByTerm, resetSelection } from '../../actions/actionCreators/queryProjectsActionCreators';

import ProjectsMultipleSelect from './ProjectsMultipleSelect';
import SamplesSecondaryMultipleSelect from './SamplesSecondaryMultipleSelect';
import formStoreKeys from '../../constants/formStoreKeys';
import dataStoreKeys from '../../constants/dataStoreKeys';

import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import { Icon } from 'react-fa'


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
            visible: true,
        };
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let searched = store.getState().queryProjects[dataStoreKeys.SAMPLES_BY_TERM];
            if (searched) {
                let {projectIds, sampleIds} = searched;
                if (projectIds !== undefined) {
                    this.setState({ projectIds, sampleIds });
                }
            }
        });
        // Initialize with all samples - filtering with empty term
        store.dispatch(searchSamplesByTerm("", dataStoreKeys.SAMPLES_BY_TERM));
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
        // Clear the current projects/samples selection
        store.dispatch(resetSelection());
        store.dispatch(searchSamplesByTerm(term, dataStoreKeys.SAMPLES_BY_TERM));
    }

    toggleVisible() {
        this.setState({ visible: ! this.state.visible });
    }

    render() {
        return (
            <div id="QueryProjectsForm">
                <div className={css.topLineWithSearch}>

                {/* Search bar */}

                    <FormControl type="text" placeholder="Search" className={css.searchField}
                                 value={this.state.searchValue}
                                 onChange={this.onSearch.bind(this)}
                    />

                {/* Toggle visibility button */}

                    <div className={css.toggleVisible}>
                        <Button className={css.toggleVisibleButton} onClick={this.toggleVisible.bind(this)}>
                            <Icon name={this.state.visible ? "angle-double-up" : "angle-double-down"} />
                        </Button>
                    </div>

                </div>

                {/* Multiple selects */}

                <div className="clearfix" />
                <Collapse in={this.state.visible}>
                    <Form>
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
                </Collapse>
            </div>
        );
    }
}


export default QueryProjectsForm;