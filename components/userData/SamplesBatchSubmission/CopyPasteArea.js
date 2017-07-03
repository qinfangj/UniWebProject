"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from '../styles.css';
import cx from 'classnames';

import store from '../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-form';
import fields from '../../constants/fields';
import { sampleFields } from '../formModels/sampleModel';

import { FormControl, Button } from 'react-bootstrap/lib'


const fakeData = "sample1\ts1\nsample2\ts2\nsample3\ts3\n";


/**
 * The text area where we copy and paste the Excel sheet,
 * where it gets parsed and put into the editable grid.
 */
class CopyPasteArea extends React.PureComponent {

    constructor(props) {
        super(props);
        this.formModelName = "userDataForms.samples";
        this.fields = sampleFields;
        this.state = {
            text: fakeData,
        };
        this.parse = this.parse.bind(this);
    }

    onTextChange(e) {
        this.setState({ text: e.target.value });
    }

    validate(data) {
        return data;
    }

    parse() {
        let text = this.state.text.trim();
        let rows = text.split(/\r?\n|\r/);
        let nrows = rows.length;
        let data = [];
        for (let i = 0; i < nrows; i++) {
            let row = rows[i].trim();
            let terms = row.split(/\t|\s\s+/);  // tab, or two or more white characters
            let formData = {};
            for (let i=0; i < terms.length; i++) {
                let field = this.fields[i];
                formData[field] = terms[i];
            }
            data.push(formData);
        }
        data = this.validate(data);
        for (let i = 0; i < nrows; i++) {
            store.dispatch(actions.merge(`${this.formModelName}.requests[${i}]`, data[i]));
        }
    }

    render() {
        return (
            <div>
                <FormControl
                    componentClass="textarea"
                    value={this.state.text}
                    onChange={this.onTextChange.bind(this)}
                />
                <Button className={css.parseButton} bsStyle="primary" onClick={this.parse}>Parse</Button>
            </div>
        );
    }

}


export default CopyPasteArea;



