"use strict";

import React from 'react';
import { connect } from 'react-redux';
import {Button, FormControl, Col} from 'react-bootstrap/lib';
import Feedback from '../../utils/Feedback';
import store from '../../../core/store';
import validate from '../../forms/validators';

import trackingData from '../../forms/tracking/trackingData';
import { feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import trackCss from './tracking.css';
import Icon from "react-fontawesome";
import TrackingDetailView from './TrackingDetailView';

import { trackingSummariesAsync } from '../../actions/actionCreators/trackingActionCreators';


class TrackingSummaryView extends React.PureComponent {
    constructor() {
        super();
        let fieldsHead = Object.keys(trackingData.summaryData);
        let lengthArray = fieldsHead.map((s) =>{ return (trackingData.summaryData[s].length)});
        let maxlength = Math.max(...lengthArray);

        this.state = {
                        isShowDetails :false,
                        insertRow : -1,
                        insertCol: "",
                        laneNos: this.initalLaneNo(trackingData.summaryData),
                        isSubmit: false,
                        createdlanesInfo: {},
                        //isEmptyLane: true,
                      };
    }

    static propTypes = {
         // summaryData: React.PropTypes.array,  // tracking summaryData.
         // detailedData: React.PropTypes.array,   // tracking detailData.
        hasLanesNo: React.PropTypes.bool,
        dataStoreKey: React.PropTypes.string,
        isLibrary : React.PropTypes.bool,
    };

    initalLaneNo(data){
        let initalLaneNo = {};
        for (let key in trackingData.summaryData){
            let sub = trackingData.summaryData[key];

            let arrValue = sub.map((s) => {
                    if (s != null || s !== undefined) {
                        return {value: "",valid: true}
                    }
                }
            );
            initalLaneNo[key] = arrValue;
        }
        //console.log(initalLaneNo);
        return initalLaneNo;
    }

    componentWillMount() {
        let trackingSummaries = this.props.data;

        if (trackingSummaries !== undefined || trackingSummaries.length > 0) {
            this.props.getTrackingSummaries(this.props.dataStoreKey)
                .fail(() => console.error("TrackingSummaryView.getTrackingSummaries() failed to load data."));
        }
    }

    unifyDataLength(o){

        let fieldsHead = Object.keys(o);

        let arrA = o[fieldsHead[0]];
        let arrB = o[fieldsHead[1]];
        let arrC = o[fieldsHead[2]];
        let arrD = o[fieldsHead[3]];

        let lengthMax = Math.max(arrA.length,arrB.length,arrC.length,arrD.length);
        //console.log(lengthMax);
        for (let i = 0; i< fieldsHead.length; i++) {
            while ((o[fieldsHead[i]]).length < lengthMax){
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

    makeTr(o,index){

        let td = Object.keys(o).map(
            (s) => {

                let widthRate = 98/(Object.keys(o).length) + "%";

                    if (o[s][index] !== null) {

                        let stringRlt = "";

                        for (let key in o[s][index])
                        {
                            if (key === "comment"){
                                break;
                            } else {
                                stringRlt = stringRlt + o[s][index][key] + "\r\n";
                            }
                        }

                        let cellMargin = this.props.isLibrary? {marginLeft:'20px'} : null;
                        let laneNoStyle = this.state.laneNos[s][index].valid == false ? {width:'20px', borderColor: 'red'} : {width:'20px'};
                        if (this.state.insertRow === index && this.state.insertCol == s){
                            return (
                                <td className={trackCss.td} width={widthRate} key={s}>
                                {
                                this.props.isLibrary?
                                <div className={trackCss.laneNo}>
                                <input
                                    type="text"
                                    value={this.state.laneNos[s][index].value} onChange={this.setLaneNo.bind(this,s,index)}
                                    style={laneNoStyle}
                                />
                                </div>
                                    :
                                    null
                                }
                                <div type="button" className={trackCss.selectedCell} width="100%" height="100%"
                                     style = {cellMargin}
                                     onClick={this.insertDetailedRow.bind(this, s, index)}>{stringRlt}
                                    <div style={{textAlign: 'right'}}>
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
                            return (<td className={trackCss.td} width={widthRate} style={{colSpan:2}} key={s}>
                                {this.props.isLibrary?
                                    <div className={trackCss.laneNo}>
                                    <input
                                        type="text"
                                        value={this.state.laneNos[s][index].value} onChange={this.setLaneNo.bind(this,s, index)}
                                        style = {laneNoStyle}
                                    /></div>:null}
                                <div type="button" width="100%" height="100%" style = {cellMargin}
                                     onClick={this.insertDetailedRow.bind(this, s, index)}>
                                    <div className={trackCss.cell} >
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
                    <TrackingDetailView detailData={data[key][row]} />
                     </div></td></tr>)
                  :(<tr key={row +1}><td colSpan={Object.keys(data).length+1} className= {trackCss.td}><p className={trackCss.showmore}>No details</p></td></tr>)
    }

    createLanes(){
        let createdLanes = this.state.createdlanesInfo;

        if (this.state.isSubmit == false ){
            for (let k in this.state.laneNos){
                let sub = this.state.laneNos[k];
                let arr = [];
                for (let i = 0; i < sub.length; i++){
                    if (sub[i].value !== ""){
                        let obj= trackingData.detailData[k][i];
                        //console.log(obj);
                        obj.laneNum = sub[i].value;
                        arr.push(obj);
                    }
                }
                if (arr.length >0) {
                    createdLanes[k] = arr;
                }

            }
            console.log(createdLanes);

            if (Object.keys(createdLanes).length === 1) {
                this.setState({
                    isSubmit:true,
                    createdLanesInfo:createdLanes,

                });

            } else if (Object.keys(createdLanes).length === 0){
                store.dispatch(feedbackWarning("tracking.library","Pease input the lane numbers!"));
            }else if (Object.keys(createdLanes).length > 1){
                store.dispatch(feedbackWarning("tracking.library","Lanes can't be created in different typies,please reset lanes!"));
            }
        } else {
            if (confirm("Are you sure to submit those settings of lanes?")) {
                console.log(this.state.createdlanesInfo);
            }
        }

    }
    makeDiv(ele){
        let div = [];
        //console.log(ele);
        for (let i = 0; i < this.state.createdlanesInfo[ele].length; i++){
            div.push(
                <Col sm={3} key={i} style={{border:"1px solid grey", paddingRight: '30px',borderRadius: '4px',marginBottom:'10px'}}>
                    Lane number: {this.state.createdlanesInfo[ele][i].laneNum}<br/>
                    Library ID: {this.state.createdlanesInfo[ele][i].sample.ID}<br/>
                    Requests Num:  {this.state.createdlanesInfo[ele][i].requests.length}
                </Col>);
        }
        //console.log(div);
        return div
   }

    resetLanes(){
        this.setState({
            isSubmit: false,
            laneNos: this.initalLaneNo(trackingData.summaryData),
            isEmptyLane : true,
            createdlanesInfo : {},
            });

    }

    render() {
        //########Get Real data from backend#######
        // let data = Object.assign({},this.props.data);
        // console.log(data);
        //
        // let summaries={};
        // for (let key in data) {
        //     let sub = data[key];
        //     let arr = sub.map((s) => { return s.desc});
        //     summaries[key] = arr;
        // }
        // console.log(summaries);
        //########Get Real data from backend#######

        let dataSummary =  this.unifyDataLength(trackingData.summaryData);
        let dataDetail = this.unifyDataLength(trackingData.detailData);
        let fieldsHead = Object.keys(trackingData.summaryData);
        let lengthArray = fieldsHead.map((s) =>{ return (trackingData.summaryData[s].length)});

        //########Get Real data from backend#######
        // let dataSummary = summaries;
        // let dataDetail = data;
        // let fieldsHead = Object.keys(summaries);
        //let lengthArray = fieldsHead.map((s) =>{ return (summaries[s].length)});
        //########Transform Real data to be designed data#######
        let maxlength = Math.max(...lengthArray);

        let rows =[];
        if (this.state.isShowDetails) {
            for (let i = 0; i < this.state.insertRow + 1; i++) {
                rows.push(<tr className={trackCss.tr} width='2%' key={i} ><td className= {trackCss.td} style={{textAlign:'center'}}>{i+1}</td>{this.makeTr(dataSummary, i)}</tr>);
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
                {this.props.isLibrary? <Button bsStyle="primary"  type="button" onClick={this.createLanes.bind(this)} className={trackCss.button} >
                        {this.state.isSubmit ? 'Submit':'Create Lanes'}
                    </Button>
                    : null}
                    {this.state.isSubmit ? <Button bsStyle="primary"  type="button" className={trackCss.button} onClick={this.resetLanes.bind(this)}>
                            Reset</Button> :null}

                    {
                        (Object.keys(this.state.createdlanesInfo).length > 0)?
                        <div><label>{Object.keys(this.state.createdlanesInfo)[0]}</label>
                            <div>{this.makeDiv(Object.keys(this.state.createdlanesInfo)[0])}</div></div> : null
                    }

                <Feedback reference="tracking.library" />

                <table id="myTable" className={trackCss.table} >
                    <thead className={trackCss.thead}>
                        <tr className={trackCss.tr}><th className={trackCss.th} width='2%' />
                        {
                            fieldsHead.map((s) =>
                                    {
                                        return (<th className= {trackCss.th} width={98/(fieldsHead.length) + "%"} key={s}><p className={trackCss.header}>{s}</p> </th>)
                                    })
                        }
                    </tr>
                    </thead>
                    <tbody>
                            {rows}
                    </tbody>

                </table>
                </div>

        );
    }
}

TrackingSummaryView.defaultProps = {
    data: {},
    type: ""

};

const mapStateToProps = (state, ownProps) => {
    return {
        data: Object.assign({},state.tracking[ownProps.dataStoreKey])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTrackingSummaries: (storeKey) => dispatch(trackingSummariesAsync(storeKey)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingSummaryView);
// export default TrackingSummaryView;


