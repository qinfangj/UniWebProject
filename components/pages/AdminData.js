"use strict";
import React from 'react';
import { getTableDataAsync } from '../actions/actionCreators/facilityDataActionCreators';
import tableNames from '../constants/tableNames';
import PropTypes from 'prop-types';
import css from './styles.css';
import commonCss from '../../styles/common.css';
import { Link } from 'react-router';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../actions/actionCreators/feedbackActionCreators';


import {deleteUnvalidatedUsers} from '../actions/actionCreators/adminActionCreators';
import store from '../../core/store';
import Feedback from '../utils/Feedback';

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

    comfirmDelete(){
        let state = {serverError: {}};

        if (confirm("Are you sure to delete those users?")) { // Clic sur OK
            let future = store.dispatch(deleteUnvalidatedUsers());
            state = Object.assign(state, {submissionError: false, submissionFuture: future});
            future
                .done((delNum) => {
                    console.debug(200, "Deleted All Unvalidated Users successfully: " + JSON.stringify(delNum));
                    if (delNum > 0) {
                        let responseTxt = (delNum===1)?" unvalidated user has":" unvalidated users have";
                        store.dispatch(feedbackSuccess("limsUser", delNum + responseTxt + " been successfully"));
                    } else {
                        store.dispatch(feedbackSuccess("limsUser", "There is no unvalidated user deleted."));
                    }
                    store.dispatch(getTableDataAsync(tableNames.USERS, tableNames.USERS, this.activeOnly, this.nrowsPerQuery, 0, null, null))

                })
                .fail((err) => {
                    console.warn("Uncaught form validation error");

                    store.dispatch(feedbackError("limsUser", "Uncaught form validation error", err));
                });

        }

    }
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

                                <li><a href="Javascript:void(0)" onClick={this.comfirmDelete.bind(this)}>{"delete all unvalidated "+ name} </a></li>}
                        </ul>
                    </div>

                    <Feedback reference="limsUser" />

                    <div className="clearfix"/>

                    {this.props.content}

                </div>

            </div>
        );
    }

}


export default AdminData;

