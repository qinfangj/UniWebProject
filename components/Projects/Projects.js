
import React from 'react';
import cx from 'classnames';
import css from './Projects.css';

import LeftMenu from '../../components/Layout/LeftMenu';
import Link from '../../components/Link';


class Projects extends React.Component {

    componentDidMount() {
        document.title = "UHTS LIMS Web /projects";
    }

    render() {
        return (
            <div className="container">
                <div className={cx("row")}>

                    {/*
                    <div className="col-sm-3">
                        <LeftMenu />
                    </div>
                    */}

                    <div className="col-sm-9">
                        <div className={css.title}>
                            Projects
                        </div>

                        <div className={css.navbar}>
                            <ul>
                                <li><Link to="/projects/list">All projects</Link></li>
                                <li> · </li>
                                <li><Link to="/projects/list">Active projects</Link></li>
                                <li> · </li>
                                <li><Link to="/projects/list">Find projects</Link></li>
                                <li> · </li>
                                <li><Link to="/projects/new">Create new project</Link></li>
                            </ul>
                        </div>

                        {this.props.content}
                    </div>

                </div>
            </div>
        );
    }

}

export default Projects;