"use strict";
import React from 'react';

import QueryProjectsForm from '../forms/queryProjects/QueryProjectsForm';
import QueryRunsForm from '../forms/queryProjects/QueryRunsForm';
import QueryProjectsTable from '../tables/query/projects/QueryProjectsTable';
import QueryRunsTable from '../tables/query/runs/QueryRunsTable';
import QueryRunsSelectionTable from '../tables/query/runs/QueryRunsSelectionTable';


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

export class QueryRunsRoute extends React.Component {
    render() {
        let subpaths = this.props.location.pathname.split("/");
        let queryType = subpaths[subpaths.length-1];  // last element of the path
        return (
            <div>
                <QueryRunsForm queryType={queryType}>
                    <QueryRunsSelectionTable queryType={queryType} />
                </QueryRunsForm>
                <div className="clearfix"/>
                <QueryRunsTable queryType={queryType} />
            </div>
        );
    }
}

