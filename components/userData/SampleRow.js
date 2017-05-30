"use strict";
import React from 'react';
import css from './styles.css';
import cx from 'classnames';
import PropTypes from 'prop-types';

import store from '../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import batchSubmissionModel from './model';
import * as helpers from './helpers';
import { Form, actions } from 'react-redux-form';
import Icon from 'react-fontawesome';
import MultiCopyDropdown from './MultiCopyDropdown';



/**
 * A <tr> with 3 buttons in the first cell, and sample creation inputs in the others.
 */
class SampleRow extends React.PureComponent {

    constructor(props) {
        super(props);
        this.modelName = "userData.samples";
        this.model = batchSubmissionModel;
        // Callbacks
        this.copyRowOnce = this.copyRowOnce.bind(this);
        this.copyRowNtimes = this.copyRowNtimes.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    static propTypes = {
        options: PropTypes.array.isRequired,
        rowIndex: PropTypes.number.isRequired,
        // Callbacks
        copyRowOnce: PropTypes.func.isRequired,
        copyRowNtimes: PropTypes.func.isRequired,
        deleteRow: PropTypes.func.isRequired,
    };

    copyRowOnce() {
        this.props.copyRowOnce(this.props.rowIndex);
    }
    deleteRow() {
        this.props.deleteRow(this.props.rowIndex);
    }

    /**
     * Build the buttons for one row - to duplicate it or remove it.
     * @param k: the row index.
     */
    makeRowButtons() {
        return (
            <div className={css.rowButtons}>
                <Icon className={css.copyOnceButton} name="clone" onClick={this.copyRowOnce} />
                <MultiCopyDropdown copyRowNtimes={this.props.copyRowNtimes} rowIndex={this.props.rowIndex} />
                <Icon className={css.removeButton} name="trash" onClick={this.deleteRow} />
            </div>
        );
    }

    render() {
        let k = this.props.rowIndex;
        let buttons = this.makeRowButtons(k);
        let inputs = helpers.makeInputs(this.model, this.props.options, this.modelName);
        let cells = inputs.map((input,i) =>
            <td className={css.cell} key={i}>{input}</td>
        );
        // The first one is for the buttons
        cells.unshift(
            <td key={"buttons"+k}>
                {buttons}
            </td>
        );

        return (
            <tr key={k}>{cells}</tr>
        );
    }

}


function mapStateToProps(state, ownProps) {
    let rowData = state.userData.samples[ownProps.rowIndex];
    return {
        rowData: rowData,
    };
}


export default connect(mapStateToProps)(SampleRow);


