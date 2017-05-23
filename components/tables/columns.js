"use strict";
import React from 'react';
import { Link } from 'react-router';


export const ROW_HEIGTH = 25;
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
    suppressSizeToFit: true,
    suppressMenu: true,
    cellStyle: CENTER,
};


// See React cell rendering with Ag-Grid: https://www.ag-grid.com/javascript-grid-cell-rendering/
export function idColumnWithUpdateLink(tableName, domain) {
    // Make different category links: facilityData, AdminData, etc
    let linkName = domain +'/'+ tableName;
    return Object.assign({}, ID_COLUMN, {
        cellRendererFramework: IdColumnWithUpdateLink,
        cellRendererParams: {tableName: linkName},
        headerCellRenderer: null,
    });
}

class IdColumnWithUpdateLink extends React.PureComponent {
    render() {
        return (
            <Link to = {`/${this.props.tableName}/update/${this.props.value}`}>
                {this.props.value}
           </Link>
        );
    }
}

/**
 * Left-align header labels by default.
 * To deactivate, add this to the column definition:
 *         headerCellRenderer: null
 * (as in idColumnWithUpdateLink above).
 */
export function defaultHeaderRenderer(params) {
    return '<span style="float: left">' + params.colDef.headerName + '</span>';
}


