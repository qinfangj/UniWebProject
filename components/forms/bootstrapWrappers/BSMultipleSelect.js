"use strict";
import React from 'react';
import BSSelect from './BSSelect';


/**
 * A BSSelect component with `multiple` attribute.
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

