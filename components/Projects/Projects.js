
import React from 'react';
import cx from 'classnames';
import css from './Projects.css';
import commonCss from '../../styles/common.css';

import LeftMenu from '../Layout/LeftMenu';
import Link from '../../components/Link';


class Projects extends React.Component {

    componentDidMount() {
        document.title = "UHTS LIMS Web /projects";
    }

    render() {
        return (
            <div className={css.projectsWrapper}>

                <LeftMenu>

                <div className={commonCss.fullwidth}>
                    <div className={css.title}>
                        Projects
                    </div>

                    <div className={css.navbar}>
                        <ul>
                            <li><Link to="/projects/list">All projects</Link></li>
                            <li> · </li>
                            <li><Link to="/projects/list">Active projects</Link></li>
                            <li> · </li>
                            <li><Link to="/projects/new">Create new project</Link></li>
                        </ul>
                    </div>

                    {this.props.content}

                </div>

                </LeftMenu>

            </div>
        );
    }

}

export default Projects;
