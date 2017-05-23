"use strict";
import React from 'react';
import Feedback from '../utils/Feedback';
import formNames from '../constants/formNames';
import store from '../../core/store';
import css from './App.css'

class HomePage extends React.Component {
    render() {

        let stateFeedback = store.getState().feedback;

        return (
            <div>
            <h1>Welcome to the Lausanne Genomic Technologies Facility!</h1>
                <Feedback reference={formNames.SIGN_UP_FORM} />
                <Feedback reference={formNames.CHANGE_PASSWORD_FORM} />
                {

                    (stateFeedback[formNames.SIGN_UP_FORM].message === "")?
                    null :
                    <div width="80%" className={css.signUpMsg} >Your account is not active yet. <br />
                    You will be noticed by an email soon when it has been validated by an administrator.</div>
                }
            </div>
        );
    }
}


export default HomePage;