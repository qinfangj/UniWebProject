import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';

import { getLabsListAsync } from '../../actions/actionCreators/formActionCreators';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


/**
 * Dropdown with available values for the person in charge.
 */
class ProjectStatesList extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {list: [], value: null};
    }

    getValue() {
        return parseInt(this.state.value);
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ list: store.getState().forms.projectStatesList });
        });
        store.dispatch(getProjectStatesListAsync());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getList() {
        return this.state.list.map(v => {
            return <option value={v.id} key={v.id}>{v.name}</option>;
        });
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <FormGroup controlId="projectState" >
                <ControlLabel>Project state</ControlLabel>
                <FormControl componentClass="select" placeholder="Project state"
                             onChange={this.onChange.bind(this)}
                >
                    {this.getList()}
                </FormControl>
            </FormGroup>
        );
    }

}


export default ProjectStatesList;
