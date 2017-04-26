"use strict";
import React from 'react';
import css from './bioanalysers.css';
import formsCss from '../../forms.css';
import cx from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addEmptyLaneToBioanalysers, removeLaneFromBioanalysers, changeFormValue } from '../../../actions/actionCreators/formsActionCreators';
import tableNames from '../../../tables/tableNames';

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
    }

    static propTypes = {
        lanesInfo: React.PropTypes.array,
    };

    removeLane = (laneNb) => {
        this.props.removeLaneFromBioanalysers(laneNb);
    };

    addLane = () => {
        this.props.addEmptyLaneToBioanalysers();
    };

    render() {

        console.debug("lanesInfo: ", this.props.lanesInfo)

        let lanes = this.props.lanesInfo.map((lane, idx) => {
            let laneNb = lane.laneNb;
            return (
                <tr key={idx}>
                    <td key="del" className={css.laneId}>
                        <button type="button" onClick={this.removeLane.bind(null, laneNb)} className="small">-</button>
                    </td>
                    <td key="laneNb" className={css.laneId}>
                        {lane.laneNb}
                    </td>
                    <td key="project" className={css.cell}>
                        <ProjectsWithLibraries
                            form={this.form}
                            field={fields.PROJECT_ID +"_"+ laneNb}
                        />
                    </td>
                    <td key="library" className={css.cell}>
                        <LibrariesForProject
                            form={this.form}
                            field={fields.LIBRARY_ID +"_"+ laneNb}
                            refFieldName={fields.PROJECT_ID +"_"+ laneNb}
                            onMount={true}
                        />
                    </td>
                    <td key="comment" className={css.cell}>
                        <TextField
                            form={this.form}
                            field={fields.COMMENT +"_"+ laneNb}
                        />
                    </td>
                </tr>
            )
        });

        return (

            <Col sm={12} className={cx(formsCss.formCol, css.subformCol)} >

                <Button type="button" onClick={this.addLane} bsStyle="primary">+ Add Lane</Button>

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

            </Col>);
    }
}


BioanalysersSubForm.defaultProps = {
    lanesInfo: [],
};

const mapStateToProps = (state, ownProps) => {
    let lanesInfo = state.forms[formNames.BIOANALYSERS_INSERT_FORM]["lanes"] || [];
    return {
        lanesInfo: lanesInfo,
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

