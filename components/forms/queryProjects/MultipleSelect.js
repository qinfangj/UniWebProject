"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import store from '../../../core/store';
import { changeFormValue } from '../../actions/actionCreators/formsActionCreators';
import css from '../forms.css';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


/**
 * A component displaying a list of options, several of which can be selected
 *  at a time using Shift or Ctrl.
 */
class MultipleSelect extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    onChange(e) {
        // Because IE is retarded again, and react-bootstrap cannot provide a way to get the values back,
        //  need all that crap just to get the multiple selected values.
        let options = e.target.options;
        let selected = {};
        for (let k=0; k < options.length; k++) {
            if (options[k].selected) {
                selected[options[k].value] = true;
            }
        }
        // If "none" is selected, reset
        if (-1 in selected) {
            if (this.props.onResetAction) {
                store.dispatch(this.props.onResetAction);
            }
        }
        // Otherwise, send an action informing on which values were selected
        // The internal state is already taken care of by the FormControl.
        if (this.props.onSelectActionCreator) {
            store.dispatch(this.props.onSelectActionCreator(selected));
        } else {
            store.dispatch(changeFormValue(this.props.form, this.props.field, selected));
        }
    }

    render() {
        let options = this.props.options.map((v,i) => {
            return <option value={v.id} key={i}>{v.name}</option>;
        });

        let label = this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null;

        return (
            <FormGroup controlId={this.props.field}>
                {label}
                <FormControl
                    componentClass="select"
                    multiple
                    className={css.multipleSelect}
                    onChange={this.onChange.bind(this)}
                    {...this.props.inputProps}>
                    {options}
                </FormControl>
            </FormGroup>
        );
    }
}

MultipleSelect.propTypes = {
    form: PropTypes.string.isRequired,     // form field
    field: PropTypes.string.isRequired,     // FormGroup controlId + field of the field in store
    options: PropTypes.array.isRequired,   // an array of objects {id, field}

// optional
    label: PropTypes.string,  // title - visible
    inputProps: PropTypes.object,  // additional input field props
    onResetAction: PropTypes.object,  // redux action, when value "-1/any/none" is selected
    onSelectActionCreator: PropTypes.func,  // redux action creator, when another value is selected

// maybe use later:
    required: PropTypes.bool,
};

MultipleSelect.defaultProps = {
    label: null,
// maybe use later:
    required: false,
};


export default MultipleSelect;

