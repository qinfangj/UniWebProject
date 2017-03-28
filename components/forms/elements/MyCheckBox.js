"use strict";
import React from 'react';
import css from '../forms.css';
import { connect } from 'react-redux';
import { changeFormValue } from '../../actions/actionCreators/formsActionCreators';

import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormGroup from 'react-bootstrap/lib/FormGroup';


/**
 * This name so that it does not conflict with the React-BS one.
 */
class MyCheckBox extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    onChange() {
        this.props.changeFormValue(this.props.form, this.props.field, !this.props.value);
    }

    render() {
        return (
            <FormGroup controlId={this.props.field} bsSize="small" >
                <Checkbox onChange={this.onChange.bind(this)} checked={this.props.value} className={css.checkbox}>
                    <div className={css.checkboxLabel}>{this.props.label}</div>
                </Checkbox>
            </FormGroup>
        );
    }
}
MyCheckBox.propTypes = {
    form: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    value: React.PropTypes.bool,
};
MyCheckBox.defaultProps = {
    label: "",
    value: false,
};


const mapStateToProps = (state, ownProps) => {
    return {
        value: state.forms[ownProps.form][ownProps.field],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeFormValue: (form, field, value, valid) => dispatch(changeFormValue(form, field, value, valid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCheckBox);

