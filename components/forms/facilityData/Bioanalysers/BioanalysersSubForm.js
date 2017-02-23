"use strict";
import React from 'react';
import css from './bioanalysers.css';
import cx from 'classnames';
import store from '../../../../core/store';

import TextField from '../../elements/TextField';
import * as forms from '../../forms';
import validators from '../../validators';
import * as Options from '../../subcomponents/Options';
import * as SecondaryOptions from '../../subcomponents/SecondaryOptions';
import formStoreKeys from '../../../constants/formStoreKeys';
import fields from '../../fields';


/**
 * The mutable part of the Bioanalysers insert form, with the lanes.
 */
class BioanalysersSubForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = "bioanalysers";
        this.form = formStoreKeys.BIOANALYSERS_LANES_INSERT_FORM;
        forms.initForm(this.form);
    }

    getFormValues() {
        let data = [];
        for (let i=0; i < 12; i++) {
            data.push({
                id: 0,
                laneNb: i+1,
                projectId: forms.getFormValue(this.form, "project_"+i),
                libraryId: forms.getFormValue(this.form, "library_"+i),
                comment: forms.getFormValue(this.form, fields.COMMENT),
            });
        }
        return data;
    }

    makeRow(i) {
        let referenceField_i = "project_"+i;
        return <tr key={i}>
            <td key="id" className={css.laneId}>
                {i + 1}
            </td>
            <td key="project" className={css.cell}>
                {Options.ProjectsWithLibraries(this.form, referenceField_i, this.form+"_project_"+i)}
            </td>
            <td key="library" className={css.cell}>
                <SecondaryOptions.ProjectLibraries
                    form={this.form}
                    field={"library_"+i}
                    referenceField={referenceField_i}  // the store key to the other field's value
                    storeKey={this.form+"_library_"+i}   // whatever; the store key for the result list
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