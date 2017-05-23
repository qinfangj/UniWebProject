"use strict";
import React from 'react';
import formsCss from '../forms.css';
import _ from 'lodash';
import css from './queryProjects.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetSelection, search } from '../../actions/actionCreators/queryRunsActionCreators';
import { FormControl } from 'react-bootstrap/lib';


class QueryRunsSearch extends React.PureComponent {

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

    onChangeSearchTerm(e) {
        let searchTerm = e.target.value.trim();
        this.setState({ searchTerm });
    }

    onSearch() {
        if (Object.keys(this.props.selectedRuns).length > 0) {
            this.props.resetSelection();
        }
        this.props.search(this.state.searchTerm);
    }

    render() {
        return (
            <FormControl
                className={css.searchField}
                type="text"
                placeholder="Search"
                value={this.state.searchTerm}
                onChange={this.onChangeSearchTerm.bind(this)}
                onKeyUp={this.onSearch.bind(this)}
            />
        );
    }

}


const mapStateToProps = (state, ownProps) => {
    let selectedRuns = state.queryRuns.selectedRuns;
    let searchTerm = state.queryRuns.searchTerm;
    return {
        selectedRuns: selectedRuns,
        searchTerm: searchTerm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetSelection,
        search,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryRunsSearch);
