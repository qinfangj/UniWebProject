
import React from 'react';
import cx from 'classnames';
import css from './People.css';
import pageCss from '../pages.css';
import commonCss from '../../../styles/common.css';

import LeftMenu from '../../Layout/LeftMenu';
import Link from '../../../components/Link';


class People extends React.Component {

    render() {
        return (
            <div className={pageCss.pageWrapper}>

                {/*<LeftMenu>*/}

                <div className={commonCss.fullwidth}>
                    <div className={pageCss.title}>Laboratories</div>

                    <div className={pageCss.navbar}>
                        <ul>
                            <li><Link to="/data/people/list">All laboratories</Link></li>
                            <li> · </li>
                            <li><Link to="/data/people/active">Active laboratories</Link></li>
                            <li> · </li>
                            <li><Link to="/data/people/new">Create new laboratory</Link></li>
                        </ul>
                    </div>

                    {this.props.content}

                </div>

                {/*</LeftMenu>*/}

            </div>
        );
    }

}


export default People;
