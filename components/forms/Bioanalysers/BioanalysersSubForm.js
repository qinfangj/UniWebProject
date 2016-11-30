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
        this.laneRefs = [{}, {}, {}, {}, {}, {}, {}, {}];
        this.state = {
            invalid: {1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}},
        };
    }

    /**
     * 
     */
    getFormValues() {
        return this.laneRefs.map((ref, i) => {
            return {
                lane_nb: i+1,
                projectId: ref.project.getValue(),
                libraryId: ref.library.getValue(),
                comment: ref.comment.getValue(),
            };
        });
    }

    makeRow(k) {
        let N = k+1;
        return <tr key={k}>
            <td key="id" className={css.laneId}>
                {N}
            </td>
            <td key="project" className={css.cell}>
                <Options.ProjectsWithLibraries
                    form={this.form}
                    storeKey={this.form + N +"_project"}
                    ref={(c) => this.laneRefs[k]["project"] = c}
                />
            </td>
            <td key="library" className={css.cell}>
                <SecondaryOptions.ProjectLibraries
                    form={this.form}
                    referenceField={this.form + N +"_project"}  // the store key to the form value
                    storeKey={this.form + N +"_library"}        // the store key for the result list
                    ref={(c) => this.laneRefs[k]["library"] = c}
                />
            </td>
            <td key="comment" className={css.cell}>
                <TextField
                    name="comment"
                    ref={(c) => this.laneRefs[k]["comment"] = c}
                />
            </td>
        </tr>;
    };


    render() {

        let laneRows = [];
        for (let k=0; k < 8; k++) {
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