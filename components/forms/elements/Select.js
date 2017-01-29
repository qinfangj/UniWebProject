import React from 'react';
import store from '../../../core/store';
import { changeFormValue } from '../../actions/actionCreators/commonActionCreators';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class Select extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.defaultOption(props.options, props.defaultValue),
        };
    }

    /* Update the defaultValue option when new options are sent (after REST call). */
    componentWillReceiveProps(newProps) {
        this.setState({value: this.defaultOption(newProps.options, newProps.defaultValue)});
    }

    /* Return the n-th (first by defaultValue prop) option index to pass as input value. */
    defaultOption(options, defaultValue) {
        if (options.length == 0) {
            return -1;  // bad value, but should never happen
        } else if (Number.isInteger(defaultValue)) {
            return options[defaultValue][0];
        } else {
            let res = options.filter((x) => { return x[1] === defaultValue; });
            return res ? res[0][0] : -1;
        }
    }

    getValue() {
        return this.state.value;
    }

    onChange(e) {
        let value = parseInt(e.target.value);
        this.setState({ value });
        if (this.props.form !== undefined) {
            store.dispatch(changeFormValue(this.props.form, this.props.field, value));
        }
    }

    render() {
        let options = this.props.options ? this.props.options.map((v,i) => {
            return <option value={v[0]} key={i}>{v[1]}</option>;
        }) : null;
        let label = this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null;

        return (
            <FormGroup controlId={this.props.field} bsSize="small" >
                {label}
                <FormControl componentClass="select"
                    placeholder={label}
                    onChange={this.onChange.bind(this)}
                    value={this.state.value}
                    {...this.props.inputProps}
                >
                    {options}
                </FormControl>
            </FormGroup>
        );
    }
}

Select.propTypes = {
    field: React.PropTypes.string.isRequired,  // FormGroup controlId + name of the field in store
    options: React.PropTypes.array.isRequired,  // an array of the type [[1,"yes"], [2,"no"], [3,"maybe"]]
    form: React.PropTypes.string,  // form name
    label: React.PropTypes.string,  // title - visible
    defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),  // Id or name (not option index)
    inputProps: React.PropTypes.object,  // additional input field props
// maybe use later:
    required: React.PropTypes.bool,
    missing: React.PropTypes.bool,  // field is required but was found empty when submitting
    invalid: React.PropTypes.bool,  // field was found invalid when submitting
};

Select.defaultProps = {
    defaultValue: 0,
// maybe use later:
    required: false,
    missing: false,
    invalid: false,
};


export default Select;

