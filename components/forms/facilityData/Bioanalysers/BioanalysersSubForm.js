"use strict";
import React from 'react';
import css from './bioanalysers.css';
import formsCss from '../../forms.css';
import cx from 'classnames';
import store from '../../../../core/store';

import TextField from '../../elements/TextField';
import * as Options from '../../subcomponents/Options';
import LibrariesForProject from '../../subcomponents/secondarySelects/LibrariesForProject';
import formNames from '../../../constants/formNames';
import fields from '../../fields';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';


/**
 * The mutable part of the Bioanalysers insert form, with the lanes.
 */
class BioanalysersSubForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = "bioanalysers";
        this.form = formNames.BIOANALYSERS_LANES_INSERT_FORM;
        this.state = {
            lanesInfo: [{id:0, projectId: undefined, libraryId: undefined, comment: ''}]
        };
    }

    getFormValues() {
        let data = [];
        let formData = store.getState().forms[this.form];
        console.log(store.getState().forms);
        for (let i=0; i < this.state.lanesInfo.length; i++) {
            data.push({
                id: 0,
                laneNb: i+1,
                projectId: formData[fields.PROJECT_ID + "_" +i],
                libraryId: formData[fields.LIBRARY_ID + "_" +i],
                comment: formData[fields.COMMENT + i],
            });
        }
        return data;
    }

    handleRemoveLaneInfo = (idx) => () => {
        this.setState({
            lanesInfo: this.state.lanesInfo.filter((s, sidx) => idx !== sidx)
        });
    };

    handleAddLaneInfo = () => {

        this.setState({
            laneInfo: this.state.lanesInfo.push({id:0, projectId: undefined, libraryId: undefined, comment: '' })
        });
    };


    render() {

        return (

            <Col sm={12} className={cx(formsCss.formCol, css.subformCol)} >
                <table className={css.lanesTable}>
                    <thead><tr>
                        <th className={css.laneId}>Del</th>
                        <th className={css.laneId}>Lane</th>
                        <th>Project</th>
                        <th>Library</th>
                        <th className={css.commentHead}>Comment</th>
                    </tr></thead>
                    <tbody>
                    {this.state.lanesInfo.map((laneInfo, idx) => (
                        <tr key={idx}>
                            <td key="del" className={css.laneId}>
                                <button type="button" onClick={this.handleRemoveLaneInfo(idx)} className="small">-</button>
                            </td>
                            <td key="id" className={css.laneId}>
                                {idx + 1}
                            </td>
                            <td key="project" className={css.cell}>
                                <Options.ProjectsWithLibraries
                                    form={this.form}
                                    field={fields.PROJECT_ID + "_" + idx}
                                    storeKey={this.form + fields.PROJECT_ID +'_'+ idx}
                                />
                            </td>

                            <td key="library" className={css.cell}>
                                <LibrariesForProject
                                    form={this.form}
                                    field={fields.LIBRARY_ID +'_'+ idx}
                                    refFieldName={fields.PROJECT_ID + "_" + idx}
                                />
                            </td>
                            <td key="comment" className={css.cell}>
                                <TextField form={this.form}
                                           field={fields.COMMENT + idx}
                                />
                            </td>
                        </tr>
                    ))}

                    </tbody>

                </table>
                <Button type="button" onClick={this.handleAddLaneInfo} bsStyle="primary">+Add Lane</Button>

            </Col>);
    }
}


export default BioanalysersSubForm;
