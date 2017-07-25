"use strict";
import React from 'react';
import css from '../query.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetSelection, search } from '../../../actions/actionCreators/queryProjectsActionCreators';
import { FormControl } from 'react-bootstrap/lib';


class QueryProjectsSearch extends React.PureComponent {

    constructor(props) {
        super(props);
        /* Not every input needs to trigger a search. Some only change the content of this input field */
        this.state = {
            searchTerm: "",
        }
    }

    /**
     * Just for when we hit the Reset button.
     */
    componentWillReceiveProps(newProps) {
        if (newProps.searchTerm === "") {
            this.setState({ searchTerm: "" });
        }
    }

    onChangeSearchTerm = (e) => {
        let searchTerm = e.target.value.trim();
        this.setState({ searchTerm });
    };

    onSearch = () => {
        if (this.props.nSelectedProjects > 0) {
            this.props.resetSelection();
        }
        this.props.search(this.state.searchTerm);
    };

    render() {
        return (
            <FormControl
                className={css.searchField}
                type="text"
                placeholder="Search"
                value={this.state.searchTerm}
                onChange={this.onChangeSearchTerm}
                onKeyUp={this.onSearch}
            />
        );
    }

}


const mapStateToProps = (state, ownProps) => {
    let nSelectedProjects = Object.keys(state.queryProjects.selectedProjects).length;
    let nSelectedSamples = Object.keys(state.queryProjects.selectedSamples).length;
    let searchTerm = state.queryProjects.searchTerm;
    return {
        nSelectedProjects,
        nSelectedSamples,
        searchTerm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetSelection,
        search,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryProjectsSearch);

