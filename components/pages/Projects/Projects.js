
import React from 'react';
import cx from 'classnames';
import css from './Projects.css';
import pageCss from '../pages.css';
import commonCss from '../../../styles/common.css';

import LeftMenu from '../../Layout/LeftMenu';
import Link from '../../../components/Link';


class Projects extends React.Component {

    render() {
        return (
            <div className={commonCss.pageWrapper}>

                {/*<LeftMenu>*/}

                <div className={commonCss.fullwidth}>
                    <div className={pageCss.title}>Projects</div>

                    <div className={pageCss.navbar}>
                        <ul>
                            <li><Link to="/data/projects/list">All projects</Link></li>
                            <li> · </li>
                            <li><Link to="/data/projects/active">Active projects</Link></li>
                            <li> · </li>
                            <li><Link to="/data/projects/new">Create new project</Link></li>
                        </ul>
                    </div>

                    {this.props.content}

                </div>

                {/*</LeftMenu>*/}

            </div>
        );
    }

}


export default Projects;
