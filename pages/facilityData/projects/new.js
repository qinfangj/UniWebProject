
import React from 'react';
import css from './styles.css';

import Layout from '../../../components/Layout';
import Projects from '../../../components/pages/Projects/Projects';
import ProjectInsertForm from '../../../components/forms/ProjectInsertForm';


class ProjectsNew extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <Projects content={<ProjectInsertForm />} />
            </Layout>
        );
    }

}

export default ProjectsNew;
