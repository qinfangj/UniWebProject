"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.css';



class CommonProjectHeaderRow extends React.PureComponent {

    static propTypes = {
        model: PropTypes.object.isRequired,  // the model for the project definition inputs
    };

    render() {
        let model = this.props.model;
        let labels = [];
        for (let field of Object.keys(model)) {
            let label = model[field].label || "";
            labels.push(label);
        }
        let cells = labels.map((label,i) =>
            <th className={css.headerCell} key={i}>{label}</th>
        );
        return <tr>{cells}</tr>;
    }

}


export default CommonProjectHeaderRow;

