"use strict";
import React from 'react';
import css from './bioanalysers.css';
import formsCss from '../../forms.css';
import cx from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addEmptyLaneToBioanalysers, removeLaneFromBioanalysers, changeFormValue } from '../../../actions/actionCreators/formsActionCreators';

import TextField from '../../elements/TextField';
import { ProjectsWithLibraries } from '../../subcomponents/OptionsWith';
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
        // this.state = {
        //     lanesInfo: [{id: 0, projectId: undefined, libraryId: undefined, comment: ''}],
        // };
    }

    static propTypes = {
        lanesInfo: React.PropTypes.array,
    };

    // getFormValues() {
    //     let data = [];
    //     let formData = store.getState().forms[this.form];
    //     for (let i=0; i < this.state.lanesInfo.length; i++) {
    //         data.push({
    //             id: 0,
    //             laneNb: i+1,
    //             projectId: formData[fields.PROJECT_ID +"_"+ i],
    //             libraryId: formData[fields.LIBRARY_ID +"_"+ i],
    //             comment: formData[fields.COMMENT + i],
    //         });
    //     }
    //     return data;
    // }

    removeLane = (laneNb) => () => {
        this.props.removeLaneFromBioanalysers(laneNb);
    };

    addLane = () => {
        this.props.addEmptyLaneToBioanalysers();
    };

    componentWillReceiveProps(newProps) {
        let newLanes = newProps.lanesInfo;
    }


    render() {

        //console.debug("lanesInfo: ", this.props.lanesInfo)

        let lanes = this.props.lanesInfo.map((lane, idx) => {
            let laneNb = lane.laneNb;
            return (
                <tr key={idx}>
                    <td key="del" className={css.laneId}>
                        <button type="button" onClick={this.removeLane(laneNb)} className="small">-</button>
                    </td>
                    <td key="laneNb" className={css.laneId}>
                        {lane.laneNb}
                    </td>
                    <td key="project" className={css.cell}>
                        <ProjectsWithLibraries
                            form={this.form}
                            field={fields.PROJECT_ID +"_"+ laneNb}
                            //storeKey={this.form + fields.PROJECT_ID +'_'+ laneNb}
                            //value={lane.projectId}
                        />
                    </td>
                    <td key="library" className={css.cell}>
                        <LibrariesForProject
                            form={this.form}
                            field={fields.LIBRARY_ID +"_"+ laneNb}
                            refFieldName={fields.PROJECT_ID +"_"+ laneNb}
                            options={this.props.libOptions[idx]}
                        />
                    </td>
                    <td key="comment" className={css.cell}>
                        <TextField
                            form={this.form}
                            field={fields.COMMENT +"_"+ laneNb}
                            //value={lane.comment || ""}
                        />
                    </td>
                </tr>
            )
        });

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

                        {lanes}

                    </tbody>

                </table>
                <Button type="button" onClick={this.addLane} bsStyle="primary">+ Add Lane</Button>

            </Col>);
    }
}


BioanalysersSubForm.defaultProps = {
    lanesInfo: [],
};

import optionsStoreKeys from '../../../constants/optionsStoreKeys';

const mapStateToProps = (state, ownProps) => {
    let lanesInfo = state.forms[formNames.BIOANALYSERS_INSERT_FORM]["lanes"] || [];

    // Make sure it reacts when the projectId selection changes
    let thisForm = formNames.BIOANALYSERS_LANES_INSERT_FORM;
    let laneNbs = lanesInfo.map((lane) => lane.laneNb);
    let projectIds = laneNbs.map((laneNb) => state.forms[thisForm][fields.PROJECT_ID +"_"+ laneNb]);

    console.debug(state.options)

    let refFieldNames = lanesInfo.map((lane) => fields.PROJECT_ID +"_"+ lane.laneNb);
    console.debug(1, refFieldNames)
    let storeKeys = refFieldNames.map((ref) => thisForm +'_'+ optionsStoreKeys.LIBRAIRIES_FOR_PROJECT +'_'+ ref);
    console.debug(2, storeKeys)
    let libOptions = storeKeys.map((optsKey) => state.options[optsKey] || []);
    console.debug(3, libOptions)
    return {
        lanesInfo: lanesInfo,
        libOptions: libOptions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            addEmptyLaneToBioanalysers,
            removeLaneFromBioanalysers,
            changeFormValue
        }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BioanalysersSubForm);




// const mapStateToProps = (state, ownProps) => {
//     // Need to specify the form in the store key because there is a different one
//     // for each different selected project.
//     if (! state.forms[ownProps.form]) {
//         console.warn("Uninitialized form");
//         return {options: []};
//     }
//     let storeKey = ownProps.form +'_'+ optionsStoreKeys.LIBRAIRIES_FOR_PROJECT +'_'+ ownProps.refFieldName;
//     let options = state.options[storeKey] || [];
//     let refValue = state.forms[ownProps.form][ownProps.refFieldName];
//     return {
//         options: options,
//         refValue: refValue,
//         storeKey: storeKey,
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ getSecondaryOptionsListAsync, changeFormValue }, dispatch);
// };
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(LibrariesForProject);
