"use strict";
import React from 'react';
import { Link } from 'react-router';


export const ROW_HEIGTH = 30;
export const GRID_HEIGTH = 1200;

export const CENTER = {textAlign: "center"};
export const LEFT = {textAlign: "left"};

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
