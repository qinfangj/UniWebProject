import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';

import { getLabsListAsync } from '../../actions/actionCreators/asyncActionCreators';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


/**
 * Dropdown with available values for the person in charge.
 */
class LabsList extends React.Component {
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
            let labsList = store.getState().async.labsList;
            let value = labsList.length > 0 ? labsList[0].id : null;  // first one of the list
            this.setState({ list: labsList, value: value });
        });
        store.dispatch(getLabsListAsync());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getList() {
        return this.state.list.map(v => {
            return <option value={v.id} key={v.id}>{v.first_name +" "+ v.last_name}</option>;
        });
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <FormGroup controlId="personInCharge" >
                <ControlLabel>Person in charge</ControlLabel>
                <FormControl componentClass="select" placeholder="Person in charge"
                             onChange={this.onChange.bind(this)}
                >
                    {this.getList()}
                </FormControl>
            </FormGroup>
        );
    }

}


export default LabsList;
