"use strict";
import React from 'react';
import { ID_COLUMN } from './constants';
import { Link } from 'react-router';


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


