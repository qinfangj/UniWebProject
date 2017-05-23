"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from './tables.css';


/**
 * Widget to show the number of rows in the result.
 */
export class Nrows extends React.Component {
    static propTypes = {data: PropTypes.arrayOf(PropTypes.object)};
    render() {
        return <div className={css.nrows}>
            {this.props.data ? this.props.data.length + " rows" : null}
        </div>;
    }
}
