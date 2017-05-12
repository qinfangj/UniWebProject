"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSecondaryOptionsListAsync } from '../../actions/actionCreators/formsActionCreators';
import PropTypes from 'prop-types';
import BSSelect from './BSSelect';


export default class BSSecondarySelect extends React.PureComponent {

    static propTypes = {
        refModelName: PropTypes.string,  // the name of the field to watch changes of
    };

    render() {
        let {refModelName, props} = this.props;
        return (
            <BSSelect {...props} />
        );
    }
}

BSSecondarySelect.defaultProps = {
    loadOnMount: false,
};



const mapStateToProps = (state, ownProps) => {
    let refValue = state.forms[ownProps.form][ownProps.refModelName];
    let options = [];
    return {
        options: options,
        refValue: refValue,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getSecondaryOptionsListAsync }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(BSSecondarySelect);

