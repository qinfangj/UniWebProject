import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';
import { changeFormValue } from '../../actions/actionCreators/commonActionCreators';
import css from '../forms.css';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class MultipleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            selected: {},
        };
    }

    getValue() {
        return this.state.selected;
    }

    onChange(e) {
        let value = e.target.value;
        let selected = this.state.selected;
        if (value && value !== "" && !selected[value]) {
            selected[value] = true;
        } else {
            delete selected[value];
        }
        if (this.props.form && this.props.formKey) {
            store.dispatch(changeFormValue(this.props.form, this.props.formKey, selected));
        }
        this.setState({ selected });
    }

    render() {
        let options = this.props.options.map((v,i) => {
            return <option value={v.id} key={i}>{ v.last_name +" - "+ v.name }</option>;
        });
        let label = this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null;
        let values = [];
        for (let key of Object.keys(this.state.selected)) {
            values.push(key);
        }

        return (
            <FormGroup controlId={this.props.name}>
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
    name: React.PropTypes.string.isRequired,     // FormGroup controlId + name of the field in store
    options: React.PropTypes.array.isRequired,   // an array of the type [[1,"yes"], [2,"no"], [3,"maybe"]]
    form: React.PropTypes.string.isRequired,     // form name
    formKey: React.PropTypes.string.isRequired,  // key to get the form value from store.

// optional
    label: React.PropTypes.string,  // title - visible
    inputProps: React.PropTypes.object,  // additional input field props

// maybe use later:
    required: React.PropTypes.bool,
    missing: React.PropTypes.bool,  // field is required but was found empty when submitting
    invalid: React.PropTypes.bool,  // field was found invalid when submitting
};

MultipleSelect.defaultProps = {
    label: null,
// maybe use later:
    required: false,
    missing: false,
    invalid: false,
};


export default MultipleSelect;

