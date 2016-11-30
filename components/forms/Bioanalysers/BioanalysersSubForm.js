import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './bioanalysers.css';
import cx from 'classnames';
import store from '../../../core/store';

import TextField from '../elements/TextField';
import validators from '../validators';
import * as Options from '../subcomponents/Options';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';

import Button from 'react-bootstrap/lib/Button';


/**
 *
 */
class BioanalysersSubForm extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // Test
        //console.debug(props)
        //console.debug(this.props.lanes)
        this.table = "bioanalysers";
        this.form = "bioanalysers";
        this.laneRefs = {1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}};
        this.state = {
            invalid: {1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}},
        };
    }

    /**
     * 
     */
    getFormValues() {

    }

    makeRow(N) {
        return <tr key={N}>
            <td key="id" className={css.laneId}>
                {N}
            </td>
            <td key="project" className={css.cell}>
                <Options.ProjectsWithLibraries
                    form={this.form}
                    storeKey={this.form + N +"_project"}
                    ref={(c) => this.laneRefs[N]["project"] = c}
                />
            </td>
            <td key="library" className={css.cell}>
                <SecondaryOptions.ProjectLibraries
                    form={this.form}
                    referenceField={this.form + N +"_project"}  // the store key to the form value
                    storeKey={this.form + N +"_library"}        // the store key for the result list
                    ref={(c) => this.laneRefs[N]["library"] = c}
                />
            </td>
            <td key="comment" className={css.cell}>
                <TextField
                    name="comment"
                    ref={(c) => this.laneRefs[N]["comment"] = c}
                />
            </td>
        </tr>;
    };


    render() {

        let laneRows = [];
        for (let k=1; k <= 8; k++) {
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
                {/* Test button */}
                <tbody><tr><td><Button onClick={this.getFormValues.bind(this)}/></td></tr></tbody>
            </table>
        );
    }
}


export default BioanalysersSubForm;