"use strict";
import React from 'react';
import css from './FacilityData.css';
import commonCss from '../../styles/common.css';
import { Link } from 'react-router';


class TrackingData extends React.PureComponent {

    static propTypes = {
        title: React.PropTypes.string.isRequired,  // the text displayed in the menu.
        name: React.PropTypes.string.isRequired,   // table route name, reused in the all/active/new selection (plural).
        content: React.PropTypes.node,             // the component (table, form, etc.) to display inside.
    };

    render() {
        let tableName = this.props.name;

        return (
            <div className={css.pageWrapper}>

                <div className={commonCss.fullwidth}>
                    <div className={css.title}>
                        {this.props.title}
                    </div>

                    <div className={css.navbar}>
                        <ul>
                            <li><Link to={`/data/${tableName}/samples`} activeClassName={css.active}>{"Sample to prepare"}</Link></li>
                            <li> · </li>
                            <li><Link to={`/data/${tableName}/libraries`} activeClassName={css.active}>{"Libraries to sequence "}</Link></li>
                            <li> · </li>
                            <li><Link to={`/data/${tableName}/runs`} activeClassName={css.active}>{"Libraries being sequenced"}</Link></li>
                        </ul>
                    </div>

                    {this.props.content}

                </div>

            </div>
        );
    }

}


export default TrackingData;