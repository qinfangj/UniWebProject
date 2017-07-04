"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import adminCss from '../../forms/adminData/adminForm.css';
import { getLoginDetails } from '../../actions/actionCreators/authActionCreators';
import accountModel from './accountModel';



class AccountTable extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        accountProfile: PropTypes.object,
    };

    componentWillMount() {
        let accountProfile = this.props.accountProfile;
        if (accountProfile !== undefined || accountProfile.length > 0) {
            this.props.getLoginDetails()
                .fail(() => console.error("AccountTable.getLoginDetails() failed to load data."));
        }
    }

    displayProfile(s) {
        let data = this.props.accountProfile;
        let table;
        if (s.label === "Laboratory") {
            table = <tr key={s.label}><th className={adminCss.th}>{s.label}</th><td className={adminCss.td}>{data[s.name[0]] + " " + data[s.name[1]]}</td></tr>
        } else {
            table = <tr key={s.label}>
                <th className={adminCss.th}>{s.label}</th>
                <td className={adminCss.td}>{data[s.name]}</td>
            </tr>
        }
        return table
    }

    render() {
        let userInfo = accountModel['userInfo'];
        return (
            <div>
                <table className={adminCss.table}>
                    <tbody>
                        {
                            userInfo.map((s) => this.displayProfile(s))
                        }
                     </tbody>
                </table>

           </div>
        );
    }

}

AccountTable.defaultProps = {
    accountProfile: {}
};

const mapStateToProps = (state, ownProps) => {
    return {
        accountProfile: Object.assign({},state.auth['accountProfile'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLoginDetails: () => dispatch(getLoginDetails()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);