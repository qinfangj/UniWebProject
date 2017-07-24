"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import store from '../../../core/store';
import css from './queryProjects.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryRunsAsync, changeRunsSelection } from '../../actions/actionCreators/queryRunsActionCreators';
import { randomString } from '../../../utils/common';
import { Checkbox } from 'react-bootstrap/lib';


/**
 * Holds together the projects and samples multiple selectors,
 * and allows to filter their options by term.
 */
class QueryRunsRow extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            selected: false,
        }
    }

    static propTypes = {
        run: PropTypes.object.isRequired,
        queryType: PropTypes.string.isRequired,
    };

    selectRun = (e) => {
        let runId = this.props.run.id;
        let selectedRuns = store.getState().queryRuns.selectedRuns;
        if (selectedRuns[runId]) {
            delete selectedRuns[runId];
        } else {
            selectedRuns[runId] = true;
        }
        this.setState({ selected: !this.state.selected });
        this.props.changeRunsSelection(selectedRuns);
        this.props.queryRunsAsync(selectedRuns, this.props.queryType);
    };

    render() {
        let run = this.props.run;
        return (
            <tr key={run.id+randomString(6)} onClick={this.selectRun}>
                <td className={css.checkboxCell}>
                    <Checkbox
                        id={run.id} className={css.checkbox}
                        checked={this.state.selected}
                        value={this.state.selected}
                        readOnly
                    />
                </td>
                <td className={css.instrumentCell}>{run.instrument}</td>
                <td className={css.runNbCell}>{run.run_nb}</td>
                <td className={css.runDateCell}>{run.run_date}</td>
                <td className={css.readLengthCell}>{run.cycle_nb}</td>
                <td className={css.runTypeCell}>{run.run_type}</td>
                <td className={css.runFolderCell}>{run.run_folder}</td>
                <td className={css.statusCell}>{run.status}</td>
            </tr>
        );
    }

}



const mapStateToProps = (state, ownProps) => {
    let queryType = state.queryRuns.queryType;
    return {
        queryType: queryType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        queryRunsAsync,
        changeRunsSelection,
        }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryRunsRow);
