import React from 'react';
import css from '../forms.css';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class Select extends React.Component {
    constructor(props) {
        super(props);
        let value = this.props.defaultValue;
        this.state = {
            value: value,
        };
    }

    getValue() {
        let v = this.state.value.trim();
        return v === "none" ? null : v;
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        let options = this.props.options ? this.props.options.map(v => {
            return <option value={v[0]} key={v[0]}>{v[1]}</option>;
        }) : null;
        return (
            <FormGroup controlId={this.props.name} >
                <ControlLabel>{this.props.visibleName}</ControlLabel>
                <FormControl componentClass="select"
                    placeholder={this.props.visibleName}
                    onChange={this.onChange.bind(this)}
                >
                    {options}
                </FormControl>
            </FormGroup>
        );
    }
}
Select.propTypes = {
    name: React.PropTypes.string.isRequired,
    visibleName: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,  // an array of the type [[1,"yes"], [2,"no"], [3,"maybe"]]
// maybe use later:
    required: React.PropTypes.bool,
    missing: React.PropTypes.bool,  // field is required but was found empty when submitting
    invalid: React.PropTypes.bool,  // field was found invalid when submitting
    defaultValue: React.PropTypes.string,
};
Select.defaultProps = {
    required: false,
    missing: false,
    invalid: false,
};


export default Select;

