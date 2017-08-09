"use strict";
import React from 'react';
import tablesCss from './tables.css';
import cx from 'classnames';
import { Link } from 'react-router';
import { Column, Table, SortIndicator, SortDirection} from 'react-virtualized';


export const ROW_HEIGTH = 30;
export const GRID_HEIGTH = 520;
export const CENTER = {textAlign: "center"};
export const ID_COLUMN = {
    headerName: "ID",
    field: "id",
    width: 70,
};


/**
 * Create the ID cell as a link to the corresponding update form.
 * @param domain: "facility" or "admin".
 * @param table: db table name.
 * @param id: ID of the item to update.
 */
export function idColumnLink(domain, table, id) {
    return (
        <div>
            <Link to = {`${domain}/${table}/update/${id}`}>
                {id}
            </Link>
        </div>
    );
}

/**
 * Just verify that the data is an array.
 */
export function checkData(data) {
    if (!data) {
        throw("Data cannot be null or undefined");
    }
    if (! (data instanceof Array)) {
        throw("Received invalid data to display:" + JSON.stringify(data, null, 2));
    }
}

/**
 * Sort an Immutable collection (from immutable.js).
 */
export function sortImmutable(data, sortBy, sortDirection) {
    return data
        .sortBy(item => item.get(sortBy))
        .update(list => (sortDirection === "DESC") ? list.reverse() : list);
}

/* Common methods to most RV tables */

/**
 * RV: Return row[*index*] from *data*.
 * @param data: an Immutable.
 */
export function _getRow(data, index) {
    return data.size !== 0 ? data.get(index % data.size) : {};
}

/**
 * RV: Format the header of a Column so that it has the arrow indicating the direction of search.
 */
export function _headerRenderer({ columnData, dataKey, disableSort, label, sortBy, sortDirection }) {
    return (
        <div>
            {label}
            {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
        </div>
    );
}

/**
 * RV: Format the whole header row, given the array of Columns.
 */
export function headerRowRenderer({ className, columns, style }) {
    return (
        <div role="row" style={style} className={cx(className, tablesCss.RVheader)} >
            {columns}
        </div>
    );
}

/**
 * Construct an array of <Column>s from the columns definition.
 */
export function makeColumns(colDefs){
    if (!colDefs) {
        throw new ReferenceError("No columns definition found");
    }
    return colDefs.map( s => {
        return (
            <Column key={s}
                    label={s.headerName}
                    dataKey={s.field}
                    headerRenderer={_headerRenderer}
                    width={s.width}
            />
        );
    });
}

/**
 * In admin forms, filter the whole data in memory.
 * @param list: an Immutable list.
 * @param searchTerm: the string to serach for.
 * @param columns: the table columns definition object.
 */
export function localSearch(list, searchTerm, columns) {
    if (searchTerm === "") {
        return list;
    } else {
        let term = searchTerm.toLowerCase();
        return list.filter(item => {
            return columns.find((col) => {
                return (''+item.get(col.field)).toLowerCase().includes(term);
            });
        });
    }
}

