"use strict";
import React from 'react';
import css from './styles.css';
import cx from 'classnames';
import PropTypes from 'prop-types';

import store from '../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import sampleModel from './formModels/sampleModel';
import * as helpers from './helpers';
import { Form, actions } from 'react-redux-form';
import Icon from 'react-fontawesome';
import { optionsFromModel } from '../forms/forms.js';


/**
 * The unique row with inputs that are common to all samples,
 * like the project id, organism, etc.
 */
class LibrariesProjectRow extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div/>
        );
    }

}

export default LibrariesProjectRow;

