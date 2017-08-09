"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import runsViewColumns from './runsViewColumns';
import SimpleRVTable from '../../tables/_SimpleRVTable';



/**
 * The table to browse the Runs of the current user.
 * If this user is admin, it should display all the Runs in the database.
 */
class LabDataView extends React.PureComponent {

    componentWillMount() {
        
    }

    render() {
        let data = [{libraryName: "test", projectName: "myproject"}];
        return (
            <SimpleRVTable
                columnDefs={runsViewColumns}
                tableData={data}
                autosize={true}
            />
        );
    }

}


const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LabDataView);
