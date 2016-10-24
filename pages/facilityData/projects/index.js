
import React from 'react';
import css from './styles.css';

import Layout from '../../../components/Layout';
import Projects from '../../../components/pages/Projects/Projects';
import ProjectsTable from '../../../components/tables/ProjectsTable';


class ProjectsListRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <Projects content={<ProjectsTable activeOnly={false}/>} />
            </Layout>
        );
    }

}

export default ProjectsListRoute;
