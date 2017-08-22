"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from './pages.css';
import commonCss from '../../styles/common.css';
import { Link } from 'react-router';



export class UserData extends React.Component {
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

                    {this.props.content}

                </div>
            </div>
        );
    }
}


export default UserData;

