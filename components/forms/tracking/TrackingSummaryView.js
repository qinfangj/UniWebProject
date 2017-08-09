"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import store from '../../../core/store';
import trackCss from './tracking.css';
import { connect } from 'react-redux';
import _ from 'lodash';

import validators from '../../forms/validators';
import { actions} from 'react-redux-form';
import { hashHistory } from 'react-router';
import * as feedback from '../../../utils/feedback';

import { Button } from 'react-bootstrap/lib';
import Icon from "react-fontawesome";
import TrackingDetailView from './TrackingDetailView';

import { trackingSummariesAsync } from '../../actions/actionCreators/trackingActionCreators';


class TrackingSummaryView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetails :false,
            insertRow : -1,
            insertCol: "",
            laneNos: {},
            //isSubmit: false,
            createdlanesInfo: {},
        };
    }

    static propTypes = {
        hasLanesNo: PropTypes.bool,
        trackingData: PropTypes.object,
        dataStoreKey: PropTypes.string,
        isLibrary : PropTypes.bool,
        laneInfo: PropTypes.object,
        //initialLaneNo : PropTypes.func,
    };

    // anti-pattern here
    componentWillMount() {
        console.log("componentWillMount");
        let trackingData = this.props.trackingData;
        console.log(this.props.trackingData);

         if (trackingData && Object.keys(trackingData).length > 0) {
             console.log("componentWillMount2");
             if (this.props.isLibrary) {
                 this.setState({laneNos: this.props.initalLaneNo(trackingData)})
             }
         } else {
            console.log("componentWillMount3");
            this.props.getTrackingSummaries(this.props.dataStoreKey)
                .fail(() => console.error("TrackingSummaryView.getTrackingSummaries() failed to load data."));
         }
    }

    // anti-pattern here
    componentWillReceiveProps(nextProps){
        // console.log("componentWillReceiveProps");
        // console.log(this.props.trackingData);
        // console.log(this.state.laneNos);
        if (this.props.isLibrary && Object.keys(this.state.laneNos).length === 0){
            this.setState({
                laneNos: nextProps.laneInfo
            });
        }
    }

    /**
     * Document please
     * @param o
     * @returns {*}
     */
    unifyDataLength(o){
        let fieldsHead = Object.keys(o);
        let lengthArray = fieldsHead.map((s) =>{ return (o[s].length)});
        let maxlength = Math.max(...lengthArray);
        //console.log(maxlength);
        for (let i = 0; i< fieldsHead.length; i++) {
            while ((o[fieldsHead[i]]).length < maxlength){
                o[fieldsHead[i]].push(null);
            }
        }
        //console.log(o);
        return o
    }

    /**
     * @deprecated
     * Remove??
     */
    showDetail(key,index){
        let table = null;
        if (this.state.isShowDetails) {
            table = document.getElementById("myTable");
            if (index === this.state.insertRow && key === this.state.insertCol) {
                console.log(this.state.insertRow);
                table.deleteRow(this.state.insertRow + 2);
                this.setState({
                    isShowDetails: false,
                    insertRow: index
                })
            } else {
                table.deleteRow(this.state.insertRow + 2);
                this.insertRow(this.detailData, key, index);
            }
        } else {
            this.insertRow(this.detailData, key,index);
        }
    }

    /**
     * Document please
     * @param key
     * @param index
     */
    insertDetailedRow(key,index){
        if (this.state.isShowDetails) {
            if (index === this.state.insertRow && key === this.state.insertCol) {
                this.setState({
                    isShowDetails: false,
                    insertRow: -1,
                    insertCol: "",
                });
            } else {
                this.setState({
                    isShowDetails: true,
                    insertRow: index,
                    insertCol: key,
                })
            }
        } else {
            this.setState({
                isShowDetails: true,
                insertRow: index,
                insertCol: key,
            })
        }
    }

    /**
     * Document please
     * @param k
     * @param ind
     * @param e
     */
    setLaneNo(k,ind,e){
        //console.log(e.target.value);
        let laneNos = Object.assign({},this.state.laneNos);
        laneNos[k][ind].value = e.target.value;
        if (e.target.value !== "") {
            let isValid = validators.laneNumberValidator(e.target.value);
            if (!isValid){
                feedback.warning("Lane number should be one digit between 1 and 8.","TrackingSummaryView.createRuns")
            }
            laneNos[k][ind].valid = isValid;
        } else {
            laneNos[k][ind].valid = true;
        }
        this.setState({laneNos: laneNos});
    }

    /**
     * Document please
     * @param v
     */
    makeTdContents(v){
        let date = "";
        let name = "";
        let type = "";

        if (this.props.dataStoreKey === "samples") {
            date = "received_date";
            name = "short_name";
            type = "sample_type";

        } else if (this.props.dataStoreKey === "libraries" || this.props.dataStoreKey === "runs") {
            date = "library_date";
            name = "name";
            type = "protocol";
        }

        return (
            <div>{(v['laboratory'] === undefined) ? "" : v['laboratory']}  -  {(v['project'] === undefined) ? "" : v['project']} &nbsp;
                <small><i>{(v[date] === undefined) ? "" : v[date]}</i></small><br />
                {(v[name] === undefined) ? "" : v[name] }  {(v[type] === undefined) ? "" : v[type]}
            </div>
        );
    }

    /**
     * Document please
     * @param o
     * @param index
     * @returns {Array}
     */
    makeTr(o, index){

        let td = Object.keys(o).map((s) => {

            let widthRate = 98/(Object.keys(o).length) + "%";

                if (!_.isEmpty(o[s][index])) {

                    //make Td contents
                    let contentsTd = this.makeTdContents(o[s][index]);

                    //Libraries to sequence page, make margin for Lane number input
                    let cellMargin = this.props.isLibrary? {marginLeft:'20px'} : null;
                    let laneNoStyle = null;
                    if (this.props.isLibrary) {
                        laneNoStyle = this.state.laneNos[s][index].valid === false ? {
                                width: '20px',
                                height: '20px',
                                borderColor: 'red'
                            } : {width: '20px', height: '20px'};
                        //laneNoStyle = {width: '20px', height: '20px'};
                    }

                    if (this.state.insertRow === index && this.state.insertCol === s){
                        return (
                            // value={this.state.laneNos[s][index].value}
                            <td height='100%' width={widthRate} key={s}>

                                <div type="button" className={trackCss.selectedCell} onClick={this.insertDetailedRow.bind(this, s, index)}>
                                    {
                                        this.props.isLibrary && this.state.laneNos[s][index] !== null ?
                                            <div className={trackCss.laneNo} onClick={e => {e.stopPropagation()}}>
                                                <input
                                                    type="text"
                                                    value={this.state.laneNos[s][index].value}
                                                    onChange={this.setLaneNo.bind(this, s, index)}
                                                    style={laneNoStyle}
                                                />
                                            </div>
                                            :
                                            null
                                    }
                                    {contentsTd}
                                    <div className={trackCss.iconRow} >
                                    {(o[s][index]['comment_customer'] !== "" && o[s][index]['comment_customer'] !== null)?
                                        <div className={trackCss.tooltip}>
                                            <span className={trackCss.tooltiptext} onClick={e => {e.stopPropagation()}}>{o[s][index]['comment_customer']}</span>
                                            <Icon name="comment" style={{color: '#337ab7', fontSize:25}} onClick={e => {e.stopPropagation()}} />
                                        </div>: null }
                                        <div className={trackCss.menuUpDown}>
                                            <Icon name="chevron-down" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                        );

                    } else {

                        return (
                            <td height='100%' width={widthRate} key={s}>

                                <div type="button" className={trackCss.cell} onClick={this.insertDetailedRow.bind(this, s, index)}>
                                        {this.props.isLibrary && this.state.laneNos[s][index]!== null ?
                                        <div className={trackCss.laneNo} onClick={e => {e.stopPropagation()}}>
                                            <input
                                                type="text"
                                                value={this.state.laneNos[s][index].value}
                                                onChange={this.setLaneNo.bind(this, s, index)}
                                                style = {laneNoStyle}
                                            />
                                        </div>:null}
                                        {contentsTd}
                                        <div className={trackCss.iconRow}>
                                        {(o[s][index]['comment_customer'] !== null && o[s][index]['comment_customer'] !== "" )?
                                                <div className={trackCss.tooltip}>
                                                    <span className={trackCss.tooltiptext} onClick={e => {e.stopPropagation()}}>{o[s][index]['comment_customer']}</span>
                                                    <Icon name="comment" style={{color: '#337ab7',fontSize:25}} onClick={e => {e.stopPropagation()}}/>
                                                </div>
                                             : null}
                                        </div>
                                </div>
                            </td>
                        );
                    }
                }
            }
        );
        //console.log(index);
        return td
    }

    closeDetailsView(){
        this.setState({
            isShowDetails: false,
            insertRow: -1,
            insertCol: "",
        })
    }

    /**
     * Document please
     * @param row
     * @param key
     * @param data
     */
    makeDetailedTr(row,key,data){
        if (data[key][row] !== undefined) {
            return (
                <tr key={row +1}>
                    <td colSpan={Object.keys(data).length+1} className= {trackCss.td}>
                        <div className={trackCss.showmore}>
                        <span className={trackCss.close} onClick={this.closeDetailsView.bind(this)} >
                            <Icon name='times-circle' style={{fontSize:20}}/></span>
                            <TrackingDetailView detailData={data[key][row]} dataKey={this.props.dataStoreKey}/>
                        </div>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr key={row +1}><td colSpan={Object.keys(data).length+1} className= {trackCss.td}>
                    <p className={trackCss.showmore}>No details</p>
                </td>
                </tr>
            );
        }
    }

    /**
     * Document please
     */
    createRuns(){
        let obj = {};
        for (let k in this.state.laneNos){
            let sub = this.state.laneNos[k];
            for (let i = 0; i < sub.length; i++){
                //console.log(sub[i]);
                //console.log(sub[i].value);
                if (sub[i] !== null && sub[i].value !== ""){
                    obj[sub[i].value] = {
                        comment:"",
                        libs:[{
                            projectId: this.props.trackingData[k][i].desc.projectId,
                            libraryId: this.props.trackingData[k][i].desc.id,
                            concentration: "",
                            qualityId: "",
                            isQC: false,
                        }]
                    };
                }
            }
        }
        console.log(obj);

        if (_.isEmpty(obj)) {
            feedback.warning("Pease enter the lane numbers!", "TrackingSummaryView.createRuns");
        } else {
            //console.log(createdLanes);
            let newPath = window.location.pathname + "facility/runs/from-tracking";
            console.log(newPath);
            store.dispatch(actions.reset("facilityDataForms.runs"));
            store.dispatch(actions.change("facilityDataForms.runs.lanes", obj));
            hashHistory.push(newPath);
        }

    }

    // Remove??
    //makeDiv(ele){
        //let div = [];
        //console.log(ele);
        // for (let i = 0; i < this.state.createdlanesInfo[ele].length; i++){
        //     div.push(
        //         // <Col sm={3} key={i} style={{border:"1px solid grey", paddingRight: '30px',borderRadius: '4px',marginBottom:'10px'}}>
        //         //     Lane number: {this.state.createdlanesInfo[ele][i].laneNum}<br/>
        //         //     Library ID: {this.state.createdlanesInfo[ele][i].desc.ID}<br/>
        //         //     Requests Num:  {this.state.createdlanesInfo[ele][i].requests.length}
        //         // </Col>);
        // }

       // return div
    //}

    /**
     * @deprecated
     * Remove??
     */
    resetLanes(){
        this.setState({
            //isSubmit: false,
            laneNos: this.props.initalLaneNo(this.props.trackingData),
            isEmptyLane : true,
            createdlanesInfo : {},
            });

    }

    render() {

        //let data = Object.assign({}, this.props.trackingData);
        //console.log(this.props.trackingData);
        //console.log(this.props.laneInfo);
        //console.log(this.props.summaries);

        //######## Get Real data from backend #######
        let dataSummary = this.unifyDataLength(this.props.summaries);
        let dataDetail = this.unifyDataLength(this.props.trackingData);
        console.log(dataSummary);
        console.log(dataDetail);
        let fieldsHead = Object.keys(this.props.summaries);
        let lengthArray = fieldsHead.map((s) =>{ return (this.props.summaries[s].length)});
        //######## Transform Real data to be designed data #######
        let maxlength = Math.max(...lengthArray);

        let rows = [];
        if (this.state.isShowDetails) {
            for (let i = 0; i < this.state.insertRow + 1; i++) {
                rows.push(
                    <tr width='2%' key={i}>
                        <td className= {trackCss.td} style={{textAlign:'center'}}>{i+1}</td>
                        {this.makeTr( dataSummary, i)}
                    </tr>
                );
            }

            rows.push(this.makeDetailedTr(this.state.insertRow, this.state.insertCol, dataDetail));

            for (let i = this.state.insertRow + 1; i < maxlength; i++) {
                rows.push(<tr width='2%' key={i+2}><td className= {trackCss.td} style={{textAlign:'center'}}>{i+1}</td>{this.makeTr(dataSummary, i)}</tr>);
            }

            let row = document.getElementById("myTable").rows;
            row[this.state.insertRow+1].scrollIntoView(true);
        } else {
            for (let i=0; i < maxlength; i++) {
                rows.push(
                    <tr width='2%' key={i}>
                        <td className= {trackCss.td}>{i+1}</td>
                        {this.makeTr(dataSummary, i)}
                    </tr>
                );
            }
        }

        // console.log(Object.keys(this.state.createdlanesInfo).length );

        return (

                <div>
                {this.props.isLibrary?
                    <div>
                    <Button bsStyle="primary"  type="button" onClick={this.createRuns.bind(this)} className={trackCss.button} >
                        Create Runs
                    </Button>

                    {/*<Button bsStyle="primary"  type="button" className={trackCss.button} onClick={this.resetLanes.bind(this)}>*/}
                        {/*Reset*/}
                    {/*</Button>*/}

                    </div>
                    : null}

                    {/*{(Object.keys(this.state.createdlanesInfo).length > 0)?*/}
                        {/*Object.keys(this.state.createdlanesInfo).map ((s) => {*/}
                            {/*return <div key={s}> {this.makeDiv(s)} </div>}) : null*/}
                    {/*}*/}

                <div className={trackCss.divWrapper}>
                <table id="myTable" className={trackCss.table} >
                    <thead >
                        <tr className={trackCss.tr}><th className={trackCss.th} width='2%' />
                        {
                            fieldsHead.map((s) =>
                                {
                                        return (<th className={trackCss.th} width={98 / (fieldsHead.length) + "%"}
                                                    key={s}><div className={trackCss.header}>{s}</div></th>)
                                })
                        }
                    </tr>
                    </thead>
                    <tbody>
                            {rows}
                    </tbody>

                </table>
                </div>
                </div>

        );
    }
}

TrackingSummaryView.defaultProps = {
    isLibrary: false,

};

const mapStateToProps = (state, ownProps) => {
    //console.log(state.tracking[ownProps.dataStoreKey]);

    //pre-treat tracking data in the store before displaying,
    //if the array object of the key are all nulls.
    //not even display the key column in the summaries view
    let data = Object.assign({}, state.tracking[ownProps.dataStoreKey]);

    let types = Object.keys(data);
    let trackingData = {};
    types.map((s) => {
        // monstruosity is this loop
        let isNullArr = true;
        for (let i=0; i < data[s].length; i++){
            if (isNullArr && _.isNull(data[s][i])){
                isNullArr = true
            } else {
                isNullArr = false
            }
        }
        if (!isNullArr){
            trackingData[s] = data[s];
        }

    });

    //console.log(trackingData);

    let summaries={};
    for (let key in trackingData) {

        let sub = trackingData[key];
        let arr = sub.map((s) => {
            if (s === null){
                return {};
            } else {
                return s.desc;
            }
        });
        summaries[key] = arr;
    }
    //console.log(summaries);

    return {
        trackingData: trackingData,
        summaries: summaries,
        laneInfo: (ownProps.isLibrary)? ownProps.initalLaneNo(trackingData):{}
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTrackingSummaries: (storeKey) => dispatch(trackingSummariesAsync(storeKey)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingSummaryView);



