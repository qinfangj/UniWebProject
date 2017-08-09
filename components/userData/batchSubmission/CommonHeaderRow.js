"use strict";
import React from 'react';
import css from './styles.css';
import PropTypes from 'prop-types';
import store from '../../../core/store';
import { actions } from 'react-redux-form';
import Icon from 'react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap/lib';



/**
 * The header of the table with samples/libraries insert inputs:
 * a <tr> with 2 buttons in the first cell to create a new empty row or reset all.
 */
class CommonHeaderRow extends React.PureComponent {

    constructor(props) {
        super(props);
        this.addNewRow = this.addNewRow.bind(this);
        this.clear = this.clear.bind(this);
    }

    static propTypes = {
        formModel: PropTypes.object.isRequired,  // the object that defines the inputs in the form
        formModelName: PropTypes.string.isRequired,  // the RRF model name, e.g. "userData.samples"
        emptyRowModel: PropTypes.object.isRequired, // an object representing a new empty row, such as modeled in store or made by helpers.newXxxRow().
        formData: PropTypes.array.isRequired, // the store state of the form with the array of libs/samples, such as `store.userData.samples`
    };

    /**
     * Reset to initial single row.
     */
    clear() {
        store.dispatch(actions.change(this.props.formModelName, [this.props.emptyRowModel]));
    }

    /**
     * Add a new empty row at the end.
     */
    addNewRow() {
        let newRows = [...this.props.formData, this.props.emptyRowModel];
        store.dispatch(actions.change(this.props.formModelName, newRows));
    }

    render() {
        let formModel = this.props.formModel;
        let labels = [];
        for (let model of formModel.fields) {
            let label = model.label || "";
            labels.push(label);
        }
        let cells = labels.map((label,i) =>
            <th className={css.headerCell} key={i}>{label}</th>
        );
        let addNewRowTooltip = <Tooltip id="addOneRow">Add one row at bottom</Tooltip>;
        let resetTooltip = <Tooltip id="resetRows">Reset</Tooltip>;

        // The first cell is for the buttons
        cells.unshift(
            <th key={"buttons"}>
                <OverlayTrigger placement="top" overlay={addNewRowTooltip}>
                    <Icon className={css.addNewRowButton} name="plus" onClick={this.addNewRow} />
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={resetTooltip}>
                    <Icon className={css.clearButton} name="eraser" onClick={this.clear} />
                </OverlayTrigger>
            </th>
        );
        return <tr>{cells}</tr>;
    }

}


export default CommonHeaderRow;

