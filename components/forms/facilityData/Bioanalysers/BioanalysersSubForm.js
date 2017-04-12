"use strict";
import React from 'react';
import css from './bioanalysers.css';
import cx from 'classnames';
import store from '../../../../core/store';

import TextField from '../../elements/TextField';
import * as Options from '../../subcomponents/Options';
import LibrariesForProject from '../../subcomponents/secondarySelects/LibrariesForProject';
import formNames from '../../../constants/formNames';
import fields from '../../fields';


/**
 * The mutable part of the Bioanalysers insert form, with the lanes.
 */
class BioanalysersSubForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = "bioanalysers";
        this.form = formNames.BIOANALYSERS_LANES_INSERT_FORM;
    }

    getFormValues() {
        let data = [];
        let formData = store.getState().forms[this.form];
        for (let i=0; i < 12; i++) {
            data.push({
                id: 0,
                laneNb: i+1,
                projectId: formData["project_"+i],
                libraryId: formData["library_"+i],
                comment: formData[fields.COMMENT],
            });
        }
        return data;
    }

    makeRow(i) {
        let referenceField_i = fields.PROJECT_ID + "_" +i;
        return <tr key={i}>
            <td key="id" className={css.laneId}>
                {i + 1}
            </td>
            <td key="project" className={css.cell}>
                <Options.ProjectsWithLibraries
                    form={this.form}
                    field={referenceField_i}
                    storeKey={this.form + fields.PROJECT_ID +'_'+ i}
                />
            </td>
            <td key="library" className={css.cell}>
                <LibrariesForProject
                    form={this.form}
                    field={this.form + fields.LIBRARY_ID +'_'+ i}
                    refFieldName={referenceField_i}
                />
            </td>
            <td key="comment" className={css.cell}>
                <TextField form={this.form}
                    field={fields.COMMENT + i}
                />
            </td>
        </tr>;
    };


    render() {
        let laneRows = [];
        for (let k=0; k < 12; k++) {
            laneRows.push(this.makeRow(k));
        }

        return (
            <table className={css.lanesTable}>
                <thead><tr>
                    <th className={css.laneId}>Lane</th>
                    <th>Project</th>
                    <th>Library</th>
                    <th className={css.commentHead}>Comment</th>
                </tr></thead>
                <tbody>
                    {laneRows}
                </tbody>
            </table>
        );
    }
}


export default BioanalysersSubForm;