
import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';

import ProjectsTable from '../../../components/tables/ProjectsTable';


class ProjectsActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Projects" name="projects" content={
                    <ProjectsTable activeOnly={true}/>
                } />
            </Layout>
        );
    }

}

export default ProjectsActiveRoute;
