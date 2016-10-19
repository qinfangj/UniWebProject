
import React from 'react';
import css from './styles.css';

import Layout from '../../components/Layout';
import Projects from '../../components/Projects/Projects';
import ProjectsTable from '../../components/tables/ProjectsTable';


class ProjectsList extends React.Component {

    componentDidMount() {
        document.title = "UHTS LIMS Web /projects";
    }

    render() {
        return (
            <Layout className={css.content}>
                <Projects content={<ProjectsTable />} />
            </Layout>
        );
    }

}

export default ProjectsList;