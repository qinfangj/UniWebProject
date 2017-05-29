"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.css';
import cx from 'classnames';
import store from '../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FormControl } from 'react-bootstrap/lib'



/**
 * The text area where we copy and paste the Excel sheet,
 * where it gets parsed and put into the editable grid.
 */
class CopyPasteArea extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
    }

    onTextChange(e) {
        this.setState({ text: e.target.value });
    }

    render() {
        return (
            <FormControl
                componentClass="textarea"
                value={this.state.text}
                onChange={this.onTextChange.bind(this)}
            />
        );
    }

}


export default CopyPasteArea;



