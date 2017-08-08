"use strict";
import React from 'react';

import QueryProjectsForm from '../forms/query/projects/QueryProjectsForm';
import QueryProjectsResultTable from '../tables/query/projects/QueryProjectsResultTable';

import QueryRunsForm from '../forms/query/runs/QueryRunsForm';
import QueryRunsSelectionTable from '../tables/query/runs/QueryRunsSelectionTable';
import QueryRunsResultTable from '../tables/query/runs/QueryRunsResultTable';


export class QueryProjectsRoute extends React.Component {
    render() {
        let subpaths = this.props.location.pathname.split("/");
        let queryType = subpaths[subpaths.length-1];  // last element of the path
        return (
            <div>
                <QueryProjectsForm queryType={queryType} />
                <div className="clearfix"/>
                <QueryProjectsResultTable queryType={queryType} />
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
                <QueryRunsForm>
                    <QueryRunsSelectionTable queryType={queryType} />
                </QueryRunsForm>
                <div className="clearfix"/>
                <QueryRunsResultTable queryType={queryType} />
            </div>
        );
    }
}

