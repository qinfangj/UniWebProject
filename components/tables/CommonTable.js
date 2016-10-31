import React from 'react';
import css from './tables.css';
import cx from 'classnames';
import store from '../../core/store';
import * as tables from './tables.js';
import * as actions from '../actions/actionCreators/asyncActionCreators';

import { AgGridReact } from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import FormControl from 'react-bootstrap/lib/FormControl';
import columns from './columns';


class CommonTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchValue: "",
            renderme: false,
        };
    }

    static propTypes = {
        name: React.PropTypes.string,  // columns key, store key, action key
        activeOnly: React.PropTypes.bool,
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let data = store.getState().async[this.props.name];
            this.setState({ data });
        });
        store.dispatch(actions.getTableDataAsync(this.props.name, this.props.activeOnly));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    /**
     * Need to update columns width here, just before rendering, and not in `onGridReady`
     * as the docs suggest, because `onGridReady` happens before data arrives
     * and container sizes change in unpredictable manner.
     */
    componentWillUpdate() {
        this.api.doLayout();  // recalculate layout to fill the container div
    }
    componentDidUpdate() {
        this.api.sizeColumnsToFit();  // recalculate columns width to fill the space
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    onSearch(e) {
        let value = e.target.value;
        this.api.setQuickFilter(value);
        this.setState({searchValue: value});
    }

    render() {
        let data = this.state.data;
        if (!data) return null;
        if (!columns[this.props.name]) {
            throw new ReferenceError("No columns definition found for table "+ this.props.name);
        }
        tables.checkData(data);
        return (
            <div style={{width: '100%'}}>
                <FormControl type="text" placeholder="Search" className={css.searchField}
                    value={this.state.searchValue}
                    onChange={this.onSearch.bind(this)}
                />
                <div className="clearfix"/>
                <div className={cx("ag-bootstrap", css.agTableContainer)} style={{height: '1200px', width: '100%'}}>
                    <AgGridReact
                        onGridReady={this.onGridReady.bind(this)}
                        rowData={data}
                        enableFilter={true}
                        enableSorting={true}
                        columnDefs={columns[this.props.name]}
                    >
                    </AgGridReact>
                </div>

                <tables.Nrows data={data} />

            </div>
        );
    }
}


export default Dimensions()(CommonTable);
