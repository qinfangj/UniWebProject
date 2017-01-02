import React from 'react';

import QueryProjectsForm from '../../components/forms/queryProjects/QueryProjectsForm';
import QueryProjectsTable from '../../components/tables/queryProjects/QueryProjectsTable';
import QuerySelector from '../../components/forms/queryProjects/QuerySelector';


class QueryProjects extends React.Component {
    render() {
        return (
            <div>
                <QueryProjectsForm />
                <div className="clearfix"/>
                <QueryProjectsTable />
            </div>
        );
    }
}


export default QueryProjects;