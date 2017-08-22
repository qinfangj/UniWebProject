"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import css from './pages.css';
import commonCss from '../../styles/common.css';
import { Link } from 'react-router';


class AccountData extends React.PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,  // the text displayed in the menu.
        content: PropTypes.node,             // the component (table, form, etc.) to display inside.
    };

    render() {

        return (
            <div className={css.pageWrapper}>

                <div className={commonCss.fullwidth}>
                    <div className={css.title}>
                        {this.props.title}
                    </div>

                    <div className={css.navbar}>
                        <ul>
                            <li><Link to={`/changePassword`} activeClassName={css.active}>{"Change your password"}</Link></li>
                        </ul>
                    </div>

                    {this.props.content}

                </div>

            </div>
        );
    }

}


export default AccountData;

