"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import store from '../../../../core/store';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import { bindActionCreators } from 'redux';
import { resetSelection, changeProjectsSelection } from '../../../actions/actionCreators/queryProjectsActionCreators';
import { requestProjectsHavingASample } from '../../../actions/actionCreators/optionsActionCreators';

import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import RRFInput from '../../bootstrapWrappers/RRFInput';
import inputTypes from '../../../forms/inputTypes';



class ProjectsMultipleSelect extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        form: PropTypes.string.isRequired,  // form name
        field: PropTypes.string.isRequired,  // the store key for the selected values
        options: PropTypes.array.isRequired,  // the list of options
        label: PropTypes.string,  // title on top of the input
        //filterByProjectIds: PropTypes.any,  // a Set. keep only these ones
    };

    componentWillMount() {
        this.props.requestProjectsHavingASample();
    }

    // /**
    //  * Keep only options which id is in the set of project IDs we filter by.
    //  */
    // filterOptions(options) {
    //     let idsSet = this.props.filterByProjectIds;
    //     if (this.props.searchTerm === "" || !idsSet) {
    //         return options;
    //     } else {
    //         return options.filter(v => idsSet.has(v.id));
    //     }
    // }

    filterByTerm(options) {
        let term = this.props.searchTerm.toLowerCase();
        if (term === "") {
            return options;
        } else {
            return options.filter((v) => v[1].toLowerCase().indexOf(term) >= 0);
        }
    }

    render() {

        let {options, ...otherProps} = this.props;
        options = this.filterByTerm(this.props.options);
        let modelName = "queryProjectsForms.queryProjects.projects";

        return (
            <RRFInput
                inputType={inputTypes.MULTIPLE_SELECT}
                modelName={modelName}
                options={[...options]}
                hasNoneValue={true}
                //onSelectActionCreator={this.props.changeProjectsSelection}
                //onResetActionCreator={this.props.resetSelection}
                // changeAction = {(model, value) => {
                //     console.log(value);
                //     store.dispatch(actions.change(model, value))
                // }}
                // onChange = {() => {
                //
                // }}
                //value={this.props.selectedProjects}  // useless, will not update
            />
        );
    }
}



const mapStateToProps = (state) => {
    return {
        searchTerm: state.queryProjects.searchTerm,
        options: state.options[optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE],
        selectedProjects: state.queryProjects.selectedProjects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeProjectsSelection,
        resetSelection,
        requestProjectsHavingASample,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsMultipleSelect);

