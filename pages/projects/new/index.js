
import React from 'react';
import css from '../styles.css';

import Layout from '../../../components/Layout';
import ProjectsTable from '../../../components/tables/ProjectsTable';


class Projects extends React.Component {

    componentDidMount() {
        document.title = "UHTS LIMS Web /projects/new";
    }

    render() {
        return (
            <Layout className={css.content}>
                <Projects content={<ProjectsTable />} />
            </Layout>
        );
    }

}

export default Projects;