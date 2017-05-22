"use strict";
import React from 'react';
import BSSelect from './BSSelect';


/**
 * Same as a BSSelect component, but listening to changes in a reference form field
 * given by its RRF model name, that is here the `refModelName` prop.
 */
class BSMultipleSelect extends React.PureComponent {

    render() {
        // Don't pass unwanted props to <input/>
        // in particular `value` because for a multiple select, we need to pass `values`...
        let {dispatch, value, ...props} = this.props;
        return (
            <BSSelect multiple {...props} />
        );
    }
}


export default BSMultipleSelect;

