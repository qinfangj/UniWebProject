"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { changeFormValue } from '../../actions/actionCreators/formsActionCreators';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class DatePicker extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    onChange(e) {
        let value = e.target.value;
        this.props.changeFormValue(this.props.form, this.props.field, value, true);
    }

    render() {
        return (
            <FormGroup controlId={this.props.field} bsSize="small" >
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    type="date"
                    placeholder={this.props.label}
                    value={this.props.value}
                    onChange={this.onChange.bind(this)}
                    disabled={this.props.disabled}
                />
            </FormGroup>
        );
    }
}

DatePicker.propTypes = {
    form: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
// maybe use later:
    required: React.PropTypes.bool,
};

DatePicker.defaultProps = {
    value: "1970-01-01",
// maybe use later:
    required: false,
};


const mapStateToProps = (state, ownProps) => {
    console.log(ownProps.form);
    console.log(ownProps.field);
    return {
        value: state.forms[ownProps.form][ownProps.field],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeFormValue: (form, field, value, valid) => dispatch(changeFormValue(form, field, value, valid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);

