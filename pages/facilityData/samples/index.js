import React from 'react';
import css from '../../../styles/common.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import CommonTable from '../../../components/tables/CommonTable';


class ProjectsListRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Samples" name="samples" content={
                    <CommonTable activeOnly={false} name="samples" />
                } />
            </Layout>
        );
    }

}

export default ProjectsListRoute;
