import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';

import { getOptionsListAsync } from '../../actions/actionCreators/asyncActionCreators';
import Select from '../elements/Select';
import constants from '../../constants/constants';

/**
 * Dropdown with available values for the project states.
 */
class ProjectAnalysesList extends React.Component {
    constructor() {
        super();
        this.table = "project_analysis";
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {list: [], value: null};
    }

    getValue() {
        return this._select.getValue();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let list = store.getState().async[constants.OPTIONS + this.table];
            if (list) {
                let value = list.length > 0 ? list[0].id : null;  // first one of the list
                this.setState({ list, value });
            }
        });
        store.dispatch(getOptionsListAsync(this.table));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getList() {
        return this.state.list.map(v => {
            return [v.id, v.name];
        });
    }

    render() {
        return (
            <Select name="projectAnalysis" label="Project analysis" ref={(c) => {this._select = c;}}
                options={this.getList()}
            />
        );
    }

}


export default ProjectAnalysesList;
