
import React from 'react';
import css from './styles.css';

import Layout from '../../../components/Layout';
import Projects from '../../../components/pages/Projects/Projects';
import ProjectsTable from '../../../components/tables/ProjectsTable';


class ProjectsActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <Projects content={<ProjectsTable activeOnly={true}/>} />
            </Layout>
        );
    }

}

export default ProjectsActiveRoute;
