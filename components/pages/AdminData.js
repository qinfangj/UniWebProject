"use strict";
import React from 'react';

import css from './FacilityData.css';
import commonCss from '../../styles/common.css';
import { Link } from 'react-router';
import * as messages from '../forms/messages';
// import constants from '../constants/constants';
// import { SubmissionFeedback } from '../forms/SubmissionFeedback';

import {deleteUnvalidatedUsers} from '../actions/actionCreators/adminActionCreators';
import store from '../../core/store';

class AdminData extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            serverError: {},
            submissionError: false,
            submissionSuccess: false,
        };
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
                .done((delNum) => console.debug(200, "Delete Unvalidated Users successfully: " + JSON.stringify(delNum)))
                .fail(() => console.warn("Uncaught form validation error"));

            let {submissionError, submissionFuture} = state;
            if (submissionError) {
                this.setState({submissionError, serverError: {}});
            } else {
                submissionFuture.done(() => {
                    this.setState({
                        submissionSuccess: true,
                        submissionError: false,
                        serverError: {}
                    });

                }).fail((err) => {
                    this.setState({serverError: err, submissionError: false, submissionSuccess: false});
                });
            }
        }



    }
    render() {
         let name = this.props.name;
        // let feedbackStatus = this.state.submissionError ? constants.SUBMISSION_ERROR :
        //     (this.state.submissionSuccess ? constants.SUBMISSION_SUCCESS :
        //         (Object.keys(this.state.serverError).length > 0 ? constants.SERVER_ERROR : ""));
        //
        // let error = this.state.serverError;
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
                    <div className="clearfix"/>
                    {/*<SubmissionFeedback status={feedbackStatus} error={error}/>*/}
                    {this.props.content}

                </div>

            </div>
        );
    }

}


export default AdminData;

