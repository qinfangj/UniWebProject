"use strict";
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BSSelect from './BSSelect';


/**
 * Same as a BSSelect component, but listening to changes in a reference form field
 * given by its RRF model name, that is here the `refModelName` prop.
 */
class BSSecondarySelect extends React.PureComponent {

    static propTypes = {
        refModelName: PropTypes.string.isRequired,  // the name of the field to watch changes of
        onMount: PropTypes.func,  // execute this when the component mounts, typically to load the options list
    };

    componentWillMount() {
        if (this.props.onMount && this.props.value) {
            this.props.onMount();
        }
    }

    render() {
        // Don't pass unwanted props to <input/>
        let {refModelName, dispatch, ...props} = this.props;
        return (
            <BSSelect {...props} />
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    let options = state.secondaryOptions[ownProps.refModelName];
    return {
        options: options,
    };
};


export default connect(mapStateToProps)(BSSecondarySelect);

