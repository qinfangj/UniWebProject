"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { getConditionalOptionsListAsync } from '../../actions/actionCreators/formsActionCreators';
import { resetSelection, changeProjectsSelection } from '../../actions/actionCreators/queryProjectsActionCreators';
import dataStoreKeys from '../../constants/dataStoreKeys';
import constants from '../../constants/constants';
import MultipleSelect from '../elements/MultipleSelect';



class ProjectsMultipleSelect extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        form: React.PropTypes.string.isRequired,  // form name
        field: React.PropTypes.string.isRequired,  // the store key for the selected values
        options: React.PropTypes.array.isRequired,  // the list of options
        label: React.PropTypes.string,  // title on top of the input
        filterByProjectIds: React.PropTypes.any,  // set. keep only these ones
    };

    componentWillMount() {
        this.props.getConditionalOptionsListAsync();
    }

    /**
     * Keep only options which id is in the set of project IDs we filter by.
     */
    filterOptions(options) {
        let idsSet = this.props.filterByProjectIds;
        if (idsSet === null) {
            return options;
        } else {
            return options.filter(v => idsSet.has(v.id));
        }
    }

    render() {
        let {options, ...otherProps} = this.props;
        options = this.filterOptions(this.props.options);
        options = options.map(v => {
            return {id: v.id, name: v.lastName +" - "+ v.name};
        });
        options.unshift(constants.NONE_OPTION);

        return (
            <MultipleSelect
                {...otherProps}
                options={options}
                onResetAction={resetSelection(this.props.form, this.props.field)}
                onSelectActionCreator={changeProjectsSelection}
            />
        );
    }
}


ProjectsMultipleSelect.defaultProps = {
    options: [],
};


const mapStateToProps = (state) => {
    return {
        options: state.queryProjects[dataStoreKeys.PROJECTS_HAVING_A_SAMPLE],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getConditionalOptionsListAsync: () =>
            dispatch(getConditionalOptionsListAsync("projects", "samples", dataStoreKeys.PROJECTS_HAVING_A_SAMPLE)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsMultipleSelect);