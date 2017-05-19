"use strict";

import React from 'react';
import { connect } from 'react-redux';
import {Button, FormControl, Col} from 'react-bootstrap/lib';
import Feedback from '../../utils/Feedback';
import store from '../../../core/store';
import validate from '../../forms/validators';

import trackingData from '../../forms/tracking/trackingData';
import { actions} from 'react-redux-form';
import { hashHistory } from 'react-router';
import { feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import trackCss from './tracking.css';
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
        hasLanesNo: React.PropTypes.bool,
        trackingData: React.PropTypes.object,
        dataStoreKey: React.PropTypes.string,
        isLibrary : React.PropTypes.bool,
        laneInfo: React.PropTypes.object,
        //initialLaneNo : React.PropTypes.func,
    };

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

    // insertRow(obj, key, index){
    //     let table= document.getElementById("myTable");
    //
    //     console.log(index);
    //     let row = table.insertRow(index +2);
    //
    //     row.style = {border:'1px solid'};
    //
    //     let cell1 = row.insertCell(0);
    //     cell1.colSpan = 3;
    //
    //     cell1.innerText = JSON.stringify(obj[key][index]);
    //
    //     this.setState({
    //         isShowDetails: true,
    //         insertRow: index,
    //         insertCol: key
    //     })
    // }

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

    insertDetailedRow(key,index){
        //console.log(key);

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

    setLaneNo(k,ind,e){
        //console.log(e.target.value);
        let laneNos = Object.assign({},this.state.laneNos);

        laneNos[k][ind].value = e.target.value;
        let validateResult = null;
        if (e.target.value !== "") {
            validateResult = validate.laneNumberValidator(e.target.value);
            if (validateResult.valid == false){
                store.dispatch(feedbackWarning("tracking.library", "Lane number should be one digit between 1 and 8."))
            }
            laneNos[k][ind].valid = validateResult.valid;
        }else{
            laneNos[k][ind].valid = true;
        }

        this.setState({laneNos: laneNos});

    }

    makeTr(o, index){
        //console.log(o);
        //console.log(index);
        //console.log(this.state.laneNos);

        let td = Object.keys(o).map(
            (s) => {

                let widthRate = 98/(Object.keys(o).length) + "%";

                    if (!_.isEmpty(o[s][index])) {

                        let stringRlt = "";

                        // for (let key in o[s][index])
                        // {
                            //if (key !== "comment"){
                            //     break;
                            // } else {
                                //stringRlt = stringRlt + o[s][index][key]  + "\r\n";
                            //}
                        // }
                        let lab = "";
                        let project = "";
                        let date = "";
                        let name = "";
                        let type = "";

                        if (this.props.dataStoreKey === "samples") {
                            lab = (o[s][index]['laboratory'] === undefined) ? "" : o[s][index]['laboratory'] + " - ";
                            project = (o[s][index]['project'] === undefined) ? "" : o[s][index]['project'] + "\r\n";
                            date = (o[s][index]['received_date'] === undefined) ? "" : o[s][index]['received_date'] + " ";
                            name = (o[s][index]['short_name'] === undefined) ? "" : o[s][index]['short_name'] + " ";
                            type = (o[s][index]['sample_type'] === undefined) ? "" : o[s][index]['sample_type'] + "\r\n";
                        } else if (this.props.dataStoreKey === "libraries"){
                            lab = (o[s][index]['laboratory'] === undefined) ? "" : o[s][index]['laboratory'] + " - ";
                            project = (o[s][index]['project'] === undefined) ? "" : o[s][index]['project'] + "\r\n";
                            date = (o[s][index]['library_date'] === undefined) ? "" : o[s][index]['library_date'];
                            name = (o[s][index]['name'] === undefined) ? "" : o[s][index]['name'];
                            type = (o[s][index]['protocol'] === undefined) ? "" : o[s][index]['protocol'] + "\r\n";
                        } else if (this.props.dataStoreKey === "runs"){
                            lab = (o[s][index]['laboratory'] === undefined) ? "" : o[s][index]['laboratory'] + " - ";
                            project = (o[s][index]['project'] === undefined) ? "" : o[s][index]['project'] + " ";
                            date = (o[s][index]['library_date'] === undefined) ? "" : o[s][index]['library_date'] + "\r\n" ;
                            name = (o[s][index]['name'] === undefined) ? "" : o[s][index]['name'];
                            type = (o[s][index]['protocol'] === undefined) ? "" : o[s][index]['protocol'] + "\r\n";

                        }
                        stringRlt = stringRlt + lab;
                        stringRlt = stringRlt + project;
                        stringRlt = stringRlt + date + name + type;


                        let cellMargin = this.props.isLibrary? {marginLeft:'20px'} : null;
                        let laneNoStyle = null;
                        if (this.props.isLibrary) {
                            laneNoStyle = this.state.laneNos[s][index].valid == false ? {
                                    width: '20px',
                                    height: '20px',
                                    borderColor: 'red'
                                } : {width: '20px', height: '20px'};
                            //laneNoStyle = {width: '20px', height: '20px'};
                        }
                        if (this.state.insertRow === index && this.state.insertCol == s){
                            return (
                                // value={this.state.laneNos[s][index].value}
                                <td className={trackCss.td} width={widthRate} key={s}>
                                    {
                                        this.props.isLibrary && this.state.laneNos[s][index] !== null ?
                                            <div className={trackCss.laneNo}>
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
                                <div type="button" className={trackCss.selectedCell} width="100%" height="100%"

                                     onClick={this.insertDetailedRow.bind(this, s, index)}>

                                    {stringRlt}

                                    <div style={{textAlign: 'right'}} >
                                    {(o[s][index]['comment'] !== "" && o[s][index]['comment'] !== undefined)?
                                        <div className={trackCss.tooltip}>
                                            <span className={trackCss.tooltiptext}>{o[s][index]['comment']}</span>
                                            <Icon name="comments"  style={{color: '#337ab7', fontSize:25}} />
                                        </div>: null }
                                        <div className={trackCss.menuUpDown}>
                                            <Icon name="chevron-down" />
                                        </div>
                                    </div>
                                </div>
                            </td>)
                        } else {

                            return (<td className={trackCss.td} width={widthRate} key={s}>
                                {this.props.isLibrary && this.state.laneNos[s][index]!== null ?
                                    <div className={trackCss.laneNo}>
                                        <input
                                            type="text"
                                            value={this.state.laneNos[s][index].value}
                                            onChange={this.setLaneNo.bind(this, s, index)}
                                            style = {laneNoStyle}
                                        />
                                    </div>:null}
                                <div type="button" className={trackCss.cell} width="100%" height="100%"
                                     onClick={this.insertDetailedRow.bind(this, s, index)}>
                                        {stringRlt}
                                        <div style={{textAlign: 'right'}}>
                                        {o[s][index]['comment'] !== undefined && (o[s][index]['comment'] !== "" )?
                                                <div className={trackCss.tooltip}>
                                                    <span className={trackCss.tooltiptext}>{o[s][index]['comment']}</span>
                                                    <Icon name="comments" style={{color: '#337ab7',fontSize:25}} />
                                                </div>
                                             : null}
                                        </div>
                                </div>
                            </td>)

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

    makeDetailedTr(row,key,data){
        let details = data[key][row];

        return (data[key][row] !== undefined)?
                (<tr key={row +1}><td colSpan={Object.keys(data).length+1} className= {trackCss.td}><div className={trackCss.showmore}>
                    <span className={trackCss.close} onClick={this.closeDetailsView.bind(this)} ><Icon name='times-circle' style={{fontSize:20}}></Icon></span>
                    <TrackingDetailView detailData={data[key][row]} dataKey={this.props.dataStoreKey}/>
                     </div></td></tr>)
                  :(<tr key={row +1}><td colSpan={Object.keys(data).length+1} className= {trackCss.td}><p className={trackCss.showmore}>No details</p></td></tr>)
    }

    createRuns(){
        let createdLanes = this.state.createdlanesInfo;

        let arr = [];
        let objLanes = {lanes:[]};
        for (let k in this.state.laneNos){
            let sub = this.state.laneNos[k];
            for (let i = 0; i < sub.length; i++){
                //console.log(sub[i]);
                //console.log(sub[i].value);

                if (sub[i] !== null && sub[i].value !== ""){

                    let obj = {};

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
                    //console.log(obj);
                    arr.push(obj);
                }
            }

        }

        if (arr.length >0) {
            createdLanes['lanes'] = arr;
        }

        if (Object.keys(createdLanes).length > 0) {
            // this.setState({
            //     isSubmit:true,
            //     createdLanesInfo:createdLanes,
            // });
            if (confirm("Are you sure to submit those settings of lanes?")) {
                console.log(createdLanes);
                let newPath = window.location.pathname + "data/runs/from-tracking";
                console.log(newPath);
                //store.dispatch(actions.reset("facilityDataForms.runs"));
                store.dispatch(actions.merge("facilityDataForms.runs.lanes",createdLanes));
                hashHistory.push(newPath);
            }

        } else if (Object.keys(createdLanes).length === 0){
            store.dispatch(feedbackWarning("tracking.library","Pease enter the lane numbers!"));
        }

        // }

    }

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

    resetLanes(){
        this.setState({
            //isSubmit: false,
            laneNos: this.props.initalLaneNo(this.props.trackingData),
            isEmptyLane : true,
            createdlanesInfo : {},
            });

    }

    render() {

         //let data = Object.assign({},this.props.trackingData);
        //console.log(this.props.trackingData);
        //console.log(this.props.laneInfo);
        //console.log(this.props.summaries);

        // let dataSummary =  this.unifyDataLength(trackingData.summaryData);
        // let dataDetail = this.unifyDataLength(trackingData.detailData);
        // let fieldsHead = Object.keys(trackingData.summaryData);
        // let lengthArray = fieldsHead.map((s) =>{ return (trackingData.summaryData[s].length)});

        //########Get Real data from backend#######
        let dataSummary = this.unifyDataLength(this.props.summaries);
        let dataDetail = this.unifyDataLength(this.props.trackingData);
        console.log(dataSummary);
        console.log(dataDetail);
        let fieldsHead = Object.keys(this.props.summaries);
        let lengthArray = fieldsHead.map((s) =>{ return (this.props.summaries[s].length)});
        //########Transform Real data to be designed data#######
        let maxlength = Math.max(...lengthArray);


        let rows = [];
        if (this.state.isShowDetails) {
            for (let i = 0; i < this.state.insertRow + 1; i++) {
                rows.push(<tr className={trackCss.tr} width='2%' key={i} ><td className= {trackCss.td} style={{textAlign:'center'}}>{i+1}</td>{this.makeTr( dataSummary, i)}</tr>);
            }

            rows.push(this.makeDetailedTr(this.state.insertRow, this.state.insertCol, dataDetail));

            for (let i = this.state.insertRow+1; i < maxlength; i++) {
                rows.push(<tr className={trackCss.tr} width='2%' key={i+2}><td className= {trackCss.td} style={{textAlign:'center'}}>{i+1}</td>{this.makeTr(dataSummary, i)}</tr>);
            }

            let row = document.getElementById("myTable").rows;
            row[this.state.insertRow+1].scrollIntoView(true);
        } else {
            for (let i = 0; i < maxlength; i++) {
                rows.push(<tr className={trackCss.tr} width='2%' key={i}><td className= {trackCss.td}>{i+1}</td>{this.makeTr(dataSummary, i)}</tr>);
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
                    <Button bsStyle="primary"  type="button" className={trackCss.button} onClick={this.resetLanes.bind(this)}>
                        Reset
                    </Button>
                    </div>
                    : null}


                    {/*{(Object.keys(this.state.createdlanesInfo).length > 0)?*/}
                        {/*Object.keys(this.state.createdlanesInfo).map ((s) => {*/}
                            {/*return <div key={s}> {this.makeDiv(s)} </div>}) : null*/}
                    {/*}*/}

                <Feedback reference="tracking.library" />
                <div className={trackCss.divWrapper}>
                <table id="myTable" className={trackCss.table} >
                    <thead >
                        <tr className={trackCss.tr}><th className={trackCss.th} width='2%' />
                        {
                            fieldsHead.map((s) =>
                                    {

                                            return (<th className={trackCss.th} width={98 / (fieldsHead.length) + "%"}
                                                        key={s}><p className={trackCss.header}>{s}</p></th>)

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
    let trakingData = {};
    types.map(s=>{
        let isNullArr = true;
        for (let i=0; i < data[s].length; i++){
            if (isNullArr && _.isNull(data[s][i])){
                isNullArr = true
            }else{
                isNullArr = false
            }
        }
        if (!isNullArr){
            trakingData[s] = data[s];
        }

    });

    //console.log(trakingData);

    let summaries={};
    for (let key in trakingData) {

        let sub = trakingData[key];
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
        trackingData: trakingData,
        summaries: summaries,
        laneInfo: (ownProps.isLibrary)? ownProps.initalLaneNo(trakingData):{}
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTrackingSummaries: (storeKey) => dispatch(trackingSummariesAsync(storeKey)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingSummaryView);



