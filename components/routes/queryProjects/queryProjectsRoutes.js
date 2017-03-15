"use strict";
import React from 'react';

import QueryProjectsForm from '../../forms/queryProjects/QueryProjectsForm';
import QueryProjectsTable from '../../tables/queryProjects/QueryProjectsTable';


export class QueryProjectsRoute extends React.Component {
    render() {
        let subpaths = this.props.location.pathname.split("/");
        let queryType = subpaths[subpaths.length-1];  // last element of the path
        return (
            <div>
                <QueryProjectsForm />
                <div className="clearfix"/>
                <QueryProjectsTable queryType={queryType} />
            </div>
        );
    }
}
