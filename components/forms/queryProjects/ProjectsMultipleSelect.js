import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';

import { getOptionsListAsync, getConditionalOptionsListAsync } from '../../actions/actionCreators/asyncActionCreators';
import constants from '../../constants/constants';

import MultipleSelect from '../elements/MultipleSelect';


class ProjectsMultipleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            options: []
        };
        this.table = "projects";
    }

    static propTypes = {
        form: React.PropTypes.string.isRequired,
        storeKey: React.PropTypes.string.isRequired,  // the store key for the result list
        formKey: React.PropTypes.string.isRequired,  // the store key for the selected values
        suffix: React.PropTypes.string.isRequired,  // route suffix for conditional lists (e.g. "all" in "/table/projects/list/all")
        label: React.PropTypes.string,
        formatter: React.PropTypes.func,  // ex: object => [id, name]
        selectProps: React.PropTypes.object,  // other props to pass to the Select lower-level component
    };

    getValue() {
        return this._select.getValue();
    }

    componentWillMount() {
        let storeKey = this.props.storeKey;
        // Listen to store for changes
        this.unsubscribe = store.subscribe(() => {
            let options = store.getState().async[storeKey];
            if (options) {
                this.setState({ options });
            }
        });
        // Initialize state
        let options = store.getState().async[storeKey];
        // cached
        if (options) {
            this.setState({ options });
        // fetch from backend
        } else {
            if (this.props.suffix) {
                store.dispatch(getConditionalOptionsListAsync(this.table, this.props.suffix, storeKey));
            } else {
                store.dispatch(getOptionsListAsync(this.table, storeKey));
            }
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <MultipleSelect
                name="projects_multiple_select"
                form={this.props.form}
                formKey={this.props.formKey}
                label={this.props.label}
                options={this.state.options}
            />
        );
    }
}


export default ProjectsMultipleSelect;