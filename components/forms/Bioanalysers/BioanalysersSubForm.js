import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './bioanalysers.css';
import cx from 'classnames';
import store from '../../../core/store';

import TextField from '../elements/TextField';
import * as forms from '../forms';
import validators from '../validators';
import * as Options from '../subcomponents/Options';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';


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
        this.laneRefs = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
        this.state = {
            invalid: {1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{}, 11:{}, 12: {}},
        };
    }

    getFormValues() {
        return this.laneRefs.map((ref, i) => {
            return {
                id: 0,
                lane_nb: i+1,
                project_id: forms.getFormValue(this.form, this.form + i +"_project"),
                library_id: ref.library.getValue(),
                comment: ref.comment.getValue(),
            };
        });
    }

    _projectsFormKey(i) {
        return this.form + i +"_project";
    }

    makeRow(i) {
        let projectsFormKey = this._projectsFormKey(i);
        return <tr key={i}>
            <td key="id" className={css.laneId}>
                {i + 1}
            </td>
            <td key="project" className={css.cell}>
                {Options.ProjectsWithLibraries(this.form, projectsFormKey)}
            </td>
            <td key="library" className={css.cell}>
                <SecondaryOptions.ProjectLibraries
                    form={this.form}
                    referenceField={projectsFormKey}  // the store key to the form value
                    storeKey={this.form + i +"_library"}        // the store key for the result list
                    ref={(c) => this.laneRefs[i]["library"] = c}
                />
            </td>
            <td key="comment" className={css.cell}>
                <TextField
                    name="comment"
                    ref={(c) => this.laneRefs[i]["comment"] = c}
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