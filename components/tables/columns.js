"use strict";
import React from 'react';
import { Link } from 'react-router';


export const ROW_HEIGTH = 30;
export const GRID_HEIGTH = 1200;

export const CENTER = {textAlign: "center"};
export const LEFT = {textAlign: "left"};
export const MULTIROW = {
    'text-overflow': 'ellipsis',  // 'clip', 'ellipsis', '…' (string)
    //'overflow': 'visible',
    //'white-space': 'normal',
    //'overflow-wrap': 'break-word',
};

export const ID_COLUMN = {
    headerName: "ID",
    field: "id",
    width: 70,
};

export function idColumnLink(domain, table, id) {
    return (
        <div>
            <Link to = {`${domain}/${table}/update/${id}`}>
                {id}
            </Link>
        </div>
    );
}
