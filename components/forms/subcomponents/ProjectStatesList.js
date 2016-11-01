import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';

import { getProjectStatesListAsync } from '../../actions/actionCreators/asyncActionCreators';
import Select from '../elements/Select';


/**
 * Dropdown with available values for the project states.
 */
class ProjectStatesList extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {list: [], value: null};
    }

    getValue() {
        return this._select.getValue();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let list = store.getState().async["projectStatesList"];
            let value = list.length > 0 ? list[0].id : null;  // first one of the list
            this.setState({ list, value });
        });
        store.dispatch(getProjectStatesListAsync());
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
            <Select name="projectState" label="Project state" ref={(c) => {this._select = c;}}
                options={this.getList()}
            />
        );
    }

}


export default ProjectStatesList;
