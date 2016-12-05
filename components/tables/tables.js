import React from 'react';
import css from './tables.css';


/**
 * Widget to show the number of rows in the result.
 */
export class Nrows extends React.Component {
    static propTypes = {data: React.PropTypes.arrayOf(React.PropTypes.object)};
    render() {
        return <div className={css.nrows}>
            {this.props.data ? this.props.data.length + " rows" : null}
        </div>;
    }
}

/**
 * Just verify that the data is an array.
 */
export function checkData(data) {
    if (! (data instanceof Array)) {
        throw("Received invalid data to display:" + Object.prototype.toString.call(data));
    }
}


