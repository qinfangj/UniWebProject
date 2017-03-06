
"use strict";
import React from 'react';
import store from '../../core/store';
import loadImg from '../../public/images/loading.gif';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as fdActions from '../actions/actionCreators/facilityDataActionCreators';
import * as fdReducer from '../actions/reducers/facilityDataReducers';

class LoadingImg extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {show2: false};
    }

    // componentWillMount() {
    //     store.subscribe(() => {
    //         let data = store.getState().facilityData;
    //         console.debug(444, data)
    //         this.setState({show2: data.showLoadingImg2})
    //         console.debug(555, data)
    //     });
    // }

    render() {
        console.log(">>>>> loadingimg:"+this.props.show);
        //console.log(">>>>>showLoadingImg2:" + this.state.show2);
        let getDisplay = this.props.show ? 'block' : 'none';
        return (
                <img src={loadImg} style={{width:'200px', height:'100px', display:getDisplay}} />
        );

    }
}

function mapStateToProps(state){ 
    console.log("state showLoadingImg:" +state.facilityData.showLoadingImg);

    return {  show: state.facilityData[showLoadingImg] } 
}

// function mapDispatchToProps(){ 
//     return { 
//         actions: bindActionCreators(fdActions, fdReducer) 
//     } 
// }

export default connect(mapStateToProps) (LoadingImg);


