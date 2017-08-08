"use strict";
import React from 'react';
import { Link } from 'react-router';


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

