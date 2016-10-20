
import React from 'react';
import css from './styles.css';

import Layout from '../../components/Layout';
import Projects from '../../components/Projects/Projects';
import ProjectsTable from '../../components/tables/ProjectsTable';


class ProjectsListRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <Projects content={<ProjectsTable active={true}/>} />
            </Layout>
        );
    }

}

export default ProjectsListRoute;
