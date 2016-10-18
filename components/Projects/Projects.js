
import React from 'react';
import cx from 'classnames';
import css from '../../pages/projects/styles.css';

import LeftMenu from '../../components/Layout/LeftMenu';


class Projects extends React.Component {

    componentDidMount() {
        document.title = "UHTS LIMS Web /projects";
    }

    render() {
        return (
            <div className="container">
                <div className={cx("row", css.row)}>

                    <div className="col-sm-3">
                        <LeftMenu />
                    </div>

                    <div className="col-sm-9">
                        {this.props.content}
                    </div>

                </div>
            </div>
        );
    }

}

export default Projects;