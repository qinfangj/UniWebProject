
import React from 'react';
import css from './styles.css';

import Layout from '../../components/Layout';
import Projects from '../../components/Projects/Projects';
import ProjectInsertForm from '../../components/forms/ProjectInsertForm';


class ProjectsNew extends React.Component {

    componentDidMount() {
        document.title = "UHTS LIMS Web /projects/new";
    }

    render() {
        return (
            <Layout className={css.content}>
                <Projects content={<ProjectInsertForm />} />
            </Layout>
        );
    }

}

export default ProjectsNew;