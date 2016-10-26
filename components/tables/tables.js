import React from 'react';
import css from './tables.css';
import { Icon } from 'react-fa';


function renderCaret(direction) {
    if (direction === 'asc') {
        return <Icon name='caret-down' className={css.sortDown}/>;
    }
    else if (direction === 'desc') {
        return <Icon name='caret-up' className={css.sortUp}/>;
    }
    return null; //<Icon name='sort' className={css.sort}/>;
}

class Nrows extends React.Component {
    static propTypes = {data: React.PropTypes.arrayOf(React.PropTypes.object)};
    render() {
        return <div className={css.nrows}>
            {this.props.data ? this.props.data.length + " rows" : null}
        </div>;
    }
}

const bootstrapTableProps = {
    striped: true, hover: true, pagination: true, search: true,
    tableContainerClass: css.tableContainer,
    tableHeaderClass: css.tableHeader,
    headerStyle: {width: "auto", minWidth: "auto"},
    options: {sortOrder: "asc"},
};

const tableHeaderProps = {
    dataSort: true, caretRender: renderCaret,
};

function checkData(data) {
    if (! (data instanceof Array)) {
        throw("Received invalid data to display:" + Object.prototype.toString.call(data));
    }
}



export {
    renderCaret,
    Nrows,
    bootstrapTableProps,
    tableHeaderProps,
    checkData,
};
