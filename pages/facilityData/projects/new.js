
import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';

import ProjectInsertForm from '../../../components/forms/ProjectInsertForm';


class ProjectsNew extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Projects" name="projects" content={
                    <ProjectInsertForm/>
                } />
            </Layout>
        );
    }

}

export default ProjectsNew;
