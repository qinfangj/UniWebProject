"use strict";
import React from 'react';

import css from './FacilityData.css';
import commonCss from '../../styles/common.css';
import { Link } from 'react-router';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../actions/actionCreators/feedbackActionCreators';


import {deleteUnvalidatedUsers} from '../actions/actionCreators/adminActionCreators';
import store from '../../core/store';
import Feedback from '../utils/Feedback';

class AdminData extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: React.PropTypes.string.isRequired,  // the text displayed in the menu.
        name: React.PropTypes.string.isRequired,   // table route name, reused in the all/active/new selection (plural).
        content: React.PropTypes.node,             // the component (table, form, etc.) to display inside.
    };

    comfirmDelete(){
        let state = {serverError: {}};

        if (confirm("Are you sure to delete those users?")) { // Clic sur OK
            let future = store.dispatch(deleteUnvalidatedUsers());
            state = Object.assign(state, {submissionError: false, submissionFuture: future});
            future
                .done((delNum) => {
                    console.debug(200, "Deleted Unvalidated Users successfully: " + JSON.stringify(delNum));

                    store.dispatch(feedbackSuccess("limsUser", "Deleted Unvalidated Users successfully"));

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
                            { name !== "users" ?
                                <div><li> · </li>
                                <li><Link to={`/admin/${name}/new`} activeClassName={css.active}>{"New "+ name}</Link></li> </div>:
                                <div><li> · </li>
                                <li><a href="Javascript:void(0)" onClick={this.comfirmDelete.bind(this)}>{"delete all unvalidated "+ name} </a></li> </div>}
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

