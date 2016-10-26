import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';

import ProjectsTable from '../../../components/tables/ProjectsTable';


class ProjectsListRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Projects" name="projects" content={
                    <ProjectsTable activeOnly={false}/>
                } />
            </Layout>
        );
    }

}

export default ProjectsListRoute;
