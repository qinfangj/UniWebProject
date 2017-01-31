import React from 'react';
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
        this.state = {
            selected: {},
        };
    }

    getValue() {
        return this.state.selected;
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
            selected = {};
            if (this.props.resetAction) {
                store.dispatch(this.props.resetAction);
            }
        }
        this.setState({ selected });
        store.dispatch(changeFormValue(this.props.form, this.props.formKey, selected));
    }

    render() {
        let options = this.props.options.map((v,i) => {
            return <option value={v.id} key={i}>{v.name}</option>;
        });
        let label = this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null;
        let values = [];
        for (let key of Object.keys(this.state.selected)) {
            values.push(key);
        }

        return (
            <FormGroup controlId={this.props.field}>
                {label}
                <FormControl componentClass="select" multiple
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
    field: React.PropTypes.string.isRequired,     // FormGroup controlId + field of the field in store
    options: React.PropTypes.array.isRequired,   // an array of objects {id, field}
    form: React.PropTypes.string.isRequired,     // form field
    formKey: React.PropTypes.string.isRequired,  // key to get the form value from store.

// optional
    label: React.PropTypes.string,  // title - visible
    inputProps: React.PropTypes.object,  // additional input field props
    resetAction: React.PropTypes.object,  // redux action, when value "-1/any/none" is selected

// maybe use later:
    required: React.PropTypes.bool,
};

MultipleSelect.defaultProps = {
    label: null,
// maybe use later:
    required: false,
};


export default MultipleSelect;

