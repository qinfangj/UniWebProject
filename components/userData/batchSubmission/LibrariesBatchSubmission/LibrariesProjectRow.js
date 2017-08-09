"use strict";
import React from 'react';
import css from '../styles.css';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import librariesProjectModel from '../formModels/librariesProjectModel';
import * as helpers from '../helpers';


/**
 * The unique row with inputs that are common to all samples,
 * like the project id, organism, etc.
 */
class LibrariesProjectRow extends React.PureComponent {

    constructor(props) {
        super(props);
        this.formModelName = "userDataForms.libraries.project";
        this.model = librariesProjectModel;
    }

    static propTypes = {
        options: PropTypes.object.isRequired,
    };

    render() {
        let inputs = helpers.makeInputs(this.model, this.props.options, this.formModelName);
        let cells = inputs.map((input,i) =>
            <td className={css.cell} key={i}>{input}</td>
        );
        return (
            <tr key="librariesProjectForm">{cells}</tr>
        );
    }

}



function mapStateToProps(state) {
    let formData = state.userDataForms.libraries.project;
    return {
        formData: formData,
        options: state.options,
    };
}


export default connect(mapStateToProps)(LibrariesProjectRow);

