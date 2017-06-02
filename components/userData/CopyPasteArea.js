"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.css';
import cx from 'classnames';

import store from '../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-form';
import fields from '../forms/fields';

import { FormControl, Button } from 'react-bootstrap/lib'


const fakeData = "sample1\ts1\nsample2\ts2\nsample3\ts3\n";


/**
 * The text area where we copy and paste the Excel sheet,
 * where it gets parsed and put into the editable grid.
 */
class CopyPasteArea extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            text: fakeData,
        };
        this.parse = this.parse.bind(this);
    }

    onTextChange(e) {
        this.setState({ text: e.target.value });
    }

    parse() {
        let text = this.state.text.trim();
        let rows = text.split(/\r?\n|\r/);
        let nrows = rows.length;
        let data = [];
        for (let i = 0; i < nrows; i++) {
            let row = rows[i].trim();
            let terms = row.split("\t");
            data.push({"sampleName": terms[0], "shortName": terms[1]});
        }
        console.log(data)
        for (let i = 0; i < nrows; i++) {
            store.dispatch(actions.merge(`userData.samples[${i}]`, data[i]));
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



