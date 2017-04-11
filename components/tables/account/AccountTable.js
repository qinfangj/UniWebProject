"use strict";
import React from 'react';
import { connect } from 'react-redux';

import adminCss from '../../forms/adminData/adminForm.css';
import cx from 'classnames';
import store from '../../../core/store';
import * as constants from '../constants';
import dataStoreKeys from '../../constants/dataStoreKeys';
import { getLoginDetails } from '../../actions/actionCreators/authActionCreators';
import accountModel from './accountModel'

import Dimensions from 'react-dimensions';




class AccountTable extends React.Component {
    constructor(props) {
        super(props);

    }
    static propTypes = {
        loginDetails: React.PropTypes.object,
    };


    componentWillMount() {
        /* If data is already in store, use that one. Otherwise, call backend API. */
        let loginDetails = this.props.loginDetails;

        if (loginDetails && loginDetails.length > 0) {
            this.setState({ loginDetails });
        } else {
            this.props.getLoginDetails()
                .fail(() => console.error("AccountTable.getLoginDetails() failed to load data."));
        }

    }

    componentWillUpdate() {
        this.api && this.api.doLayout();  // recalculate layout to fill the container div
    }
    componentDidUpdate() {
        this.api && this.api.sizeColumnsToFit();  // recalculate columns width to fill the space
    }

    displayProfile(s) {
        let data = this.props.loginDetails;
        let table;

        table = <tr key={s.name}><th className={adminCss.th}>{s.label}</th><td className={adminCss.td}>{data[s.name]}</td></tr>

        return table
    }

    render() {
        let displayProfile;
        let userInfo = accountModel['userInfo'];
        if (this.props.loginDetails !== undefined ) {
            if (Object.keys(this.props.loginDetails).length > 0) {
                let displayProfile = this.displayProfile(this.props.loginDetails);
            }
        }
        return (
            <div>
                <table className={adminCss.table}>
                    <tbody>
                        {
                            userInfo.map((s) => {
                                return (this.displayProfile(s))
                            })
                        }
                     </tbody>
                </table>

           </div>
        );
    }

}

AccountTable.defaultProps = {
    loginDetails: {}
};

const mapStateToProps = (state, ownProps) => {
    return {
        loginDetails: Object.assign({},state.auth['loginDetails'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLoginDetails: () =>
            dispatch(getLoginDetails()),
    };
};

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(AccountTable));