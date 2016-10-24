
import React from 'react';
import css from './styles.css';

import Layout from '../../components/Layout';
import People from '../../components/pages/People/People';
import ProjectsTable from '../../components/tables/ProjectsTable';


class PeopleActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <People content={<ProjectsTable activeOnly={true}/>} />
            </Layout>
        );
    }

}

export default PeopleActiveRoute;
