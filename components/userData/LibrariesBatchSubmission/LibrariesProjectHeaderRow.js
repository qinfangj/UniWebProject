"use strict";
import React from 'react';
import css from '../styles.css';
import librariesProjectModel from '../formModels/librariesProjectModel';



class LibrariesProjectHeaderRow extends React.PureComponent {

    render() {
        let labels = [];
        for (let field of Object.keys(librariesProjectModel)) {
            let label = librariesProjectModel[field].label || "";
            labels.push(label);
        }
        let cells = labels.map((label,i) =>
            <th className={css.headerCell} key={i}>{label}</th>
        );
        return <tr>{cells}</tr>;
    }

}



export default LibrariesProjectHeaderRow;


