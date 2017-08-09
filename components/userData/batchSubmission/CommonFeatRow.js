"use strict";
import React from 'react';
import css from './styles.css';
import PropTypes from 'prop-types';
import store from '../../../core/store';

import * as helpers from './helpers';
import { actions } from 'react-redux-form';
import Icon from 'react-fontawesome';
import MultiCopyDropdown from './MultiCopyDropdown';
import { OverlayTrigger, Tooltip } from 'react-bootstrap/lib';



/**
 * A <tr> with 3 buttons in the first cell, and sample/library creation inputs in the others.
 */
class CommonFeatRow extends React.PureComponent {

    constructor(props) {
        super(props);
        this.copyRowOnce = this.copyRowOnce.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.copyRowNtimes = this.copyRowNtimes.bind(this);
    }

    static propTypes = {
        model: PropTypes.object.isRequired,  // the model describing the form fields
        formModelName: PropTypes.string.isRequired,  // the RRF form model name, e.g. "userData.samples"
        options: PropTypes.object.isRequired,  // object such as built by `forms.optionsFromModel`
        rowIndex: PropTypes.number.isRequired,  // the index of the row, 0-based
        formData: PropTypes.array.isRequired,  // the store state of the samples/libs list, like in `state.userData.samples`.
    };

    /**
     * Add copies of the chosen row just below itself.
     * @param k: row index.
     * @param ntimes: the number of copies.
     */
    copyRowNtimes(k, ntimes) {
        let rows = this.props.formData;
        let thisrow = rows[k];
        let repRows = [];
        for (let i=0; i<ntimes; i++) {
            repRows.push({...thisrow});
        }
        let newRows = [...rows.slice(0,k+1), ...repRows, ...rows.slice(k+1, rows.length)];
        store.dispatch(actions.change(this.props.formModelName, newRows));
    }

    /**
     * Add a single copy of the chosen row just below itself.
     * @param k: row index.
     */
    copyRowOnce() {
        let k = this.props.rowIndex;
        this.copyRowNtimes(k, 1);
    }

    deleteRow() {
        let k = this.props.rowIndex;
        let rows = this.props.formData;
        let newRows = [...rows.slice(0, k), ...rows.slice(k+1, rows.length)];
        store.dispatch(actions.change(this.props.formModelName, newRows));
    }

    /**
     * Build the buttons for one row - to duplicate it or remove it.
     * Add tooltips only to the first row, to not hurt performance.
     * @param k: the row index.
     */
    makeRowButtons(k) {
        let copyOnce = <Icon className={css.copyOnceButton} name="clone" onClick={this.copyRowOnce} />;
        let multiCopy = <span><MultiCopyDropdown copyRowNtimes={this.copyRowNtimes} rowIndex={k} /></span>;
        let remove = <Icon className={css.removeButton} name="trash" onClick={this.deleteRow} />;

        if (k === 0) {
            let copyOnceTooltip = <Tooltip id="copyOnce">Copy once</Tooltip>;
            let multiCopyTooltip = <Tooltip id="copyNtimes">Copy n times</Tooltip>;
            let removeTooltip = <Tooltip id="remove">Delete</Tooltip>;
            return (
                <div className={css.rowButtons}>
                    <OverlayTrigger placement="top" overlay={copyOnceTooltip}>
                        {copyOnce}
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={multiCopyTooltip}>
                        {multiCopy}
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={removeTooltip}>
                        {remove}
                    </OverlayTrigger>
                </div>
            );
        } else {
            return (
                <div className={css.rowButtons}>
                    {copyOnce}
                    {multiCopy}
                    {remove}
                </div>
            );
        }
    }

    render() {
        let k = this.props.rowIndex;
        let modelName = `${this.props.formModelName}.[${k}]`;
        let buttons = this.makeRowButtons(k);
        let inputs = helpers.makeInputs(this.props.model, this.props.options, modelName);
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


export default CommonFeatRow;
