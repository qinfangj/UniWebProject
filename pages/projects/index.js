import React from 'react';
import ProjectsTable from '../../components/tables/ProjectsTable';
import ResponsiveSidebar from '../../components/Layout/Sidebar';


class ProjectsList extends React.Component {

    render() {
        return (
            <ResponsiveSidebar>
                <ProjectsTable />
            </ResponsiveSidebar>
        );
    }

}

export default ProjectsList;
