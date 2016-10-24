
import React from 'react';
import css from './styles.css';

import Layout from '../../components/Layout';
import People from '../../components/pages/People/People';
import ProjectsTable from '../../components/tables/ProjectsTable';


class PeopleListRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <People content={<ProjectsTable activeOnly={false}/>} />
            </Layout>
        );
    }

}

export default PeopleListRoute;
