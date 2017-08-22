"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import css from './pages.css';
import commonCss from '../../styles/common.css';
import { Link } from 'react-router';


class FacilityData extends React.PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,  // the text displayed in the menu.
        name: PropTypes.string.isRequired,   // table route name, reused in the all/active/new selection (plural).
        content: PropTypes.node,             // the component (table, form, etc.) to display inside.
    };

    render() {
        let tableName = this.props.name;
        let linkName = this.props.name === 'people' ? 'laboratories' : this.props.name;
        return (
            <div className={css.pageWrapper}>

                <div className={commonCss.fullwidth}>
                    <div className={css.title}>
                        {this.props.title}
                    </div>

                    <div className={css.navbar}>
                        <ul>
                            <li><Link to={`/facility/${tableName}/list`} activeClassName={css.active}>{"All "+ linkName}</Link></li>
                            <li> · </li>
                            <li><Link to={`/facility/${tableName}/active`} activeClassName={css.active}>{"Active "+ linkName}</Link></li>
                            <li> · </li>
                            <li><Link to={`/facility/${tableName}/new`} activeClassName={css.active}>{"New "+ linkName}</Link></li>
                        </ul>
                    </div>

                    {this.props.content}

                </div>

            </div>
        );
    }

}


export default FacilityData;
