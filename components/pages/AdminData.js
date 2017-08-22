"use strict";
import React from 'react';
import { getTableDataAsync } from '../actions/actionCreators/facilityDataActionCreators';
import store from '../../core/store';
import tableNames from '../constants/tableNames';
import PropTypes from 'prop-types';
import css from './pages.css';
import commonCss from '../../styles/common.css';
import { Link } from 'react-router';
import {deleteUnvalidatedUsers} from '../actions/actionCreators/adminActionCreators';
import * as feedback from '../../utils/feedback';



class AdminData extends React.PureComponent {

    constructor(props) {
        super(props);
        this.nrowsPerQuery = 40;
        this.activeOnly = false;
    }

    static propTypes = {
        title: PropTypes.string.isRequired,  // the text displayed in the menu.
        name: PropTypes.string.isRequired,   // table route name, reused in the all/active/new selection (plural).
        content: PropTypes.node,             // the component (table, form, etc.) to display inside.
    };

    comfirmDelete = () => {
        if (confirm("Are you sure to delete those users?")) { // Clic sur OK
            let future = store.dispatch(deleteUnvalidatedUsers());
            future
                .done((delNum) => {
                    console.debug(200, "Deleted All Unvalidated Users successfully: " + JSON.stringify(delNum));
                    if (delNum > 0) {
                        let responseTxt = (delNum === 1) ? " unvalidated user has":" unvalidated users have";
                        feedback.success(delNum + responseTxt + " been successfully", "AdminData.confirmDelete");
                    } else {
                        feedback.success("There is no unvalidated user deleted.", "AdminData.confirmDelete");
                    }
                    store.dispatch(getTableDataAsync(tableNames.USERS, tableNames.USERS, this.activeOnly, this.nrowsPerQuery, 0, null, null))

                })
                .fail((err) => {
                    console.warn("Uncaught form validation error");
                    feedback.error("Uncaught form validation error", err, "AdminData.confirmDelete");
                });
        }
    };


    render() {
        let name = this.props.name;

        return (
            <div className={css.pageWrapper}>

                <div className={commonCss.fullwidth}>
                    <div className={css.title}>
                        {this.props.title}
                    </div>

                    <div className={css.navbar}>
                        <ul>
                            <li><Link to={`/admin/${name}/list`} activeClassName={css.active}>{"All "+ name}</Link></li>
                            <li> · </li>
                            { name !== "users" ?
                                <li><Link to={`/admin/${name}/new`} activeClassName={css.active}>{"New "+ name}</Link></li>:

                                <li><a href="Javascript:void(0)" onClick={this.comfirmDelete}>{"delete all unvalidated "+ name} </a></li>}
                        </ul>
                    </div>

                    <div className="clearfix"/>

                    {this.props.content}

                </div>

            </div>
        );
    }

}


export default AdminData;

