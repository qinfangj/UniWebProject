"use strict";
import React from 'react';
import Feedback from '../utils/Feedback';
import formNames from '../constants/formNames';

class HomePage extends React.Component {
    render() {
        return (
            <div>
            <h1>Welcome to the Lausanne Genomic Technologies Facility!</h1>
                <Feedback reference={formNames.SIGN_UP_FORM} />
                <Feedback reference={formNames.CHANGE_PASSWORD_FORM} />
            </div>
        );
    }
}


export default HomePage;