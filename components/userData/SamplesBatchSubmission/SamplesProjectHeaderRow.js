"use strict";
import React from 'react';
import css from '../styles.css';
import samplesProjectModel from '../formModels/samplesProjectModel';



class SamplesProjectHeaderRow extends React.PureComponent {

    render() {
        let labels = [];
        for (let field of Object.keys(samplesProjectModel)) {
            let label = samplesProjectModel[field].label || "";
            labels.push(label);
        }
        let cells = labels.map((label,i) =>
            <th className={css.headerCell} key={i}>{label}</th>
        );
        return <tr>{cells}</tr>;
    }

}



export default SamplesProjectHeaderRow;


