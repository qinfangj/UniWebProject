import React from 'react';
import css from '../../../styles/common.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import CommonTable from '../../../components/tables/CommonTable';


class ProjectsActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.fulldim}>
                <FacilityData title="Samples" name="samples" content={
                    <CommonTable activeOnly={true} name="samples" />
                } />
            </Layout>
        );
    }

}

export default ProjectsActiveRoute;
