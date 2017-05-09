"use strict";

import React from 'react';
import trackingData from '../../forms/tracking/trackingData';
import trackCss from './tracking.css';
import Icon from "react-fontawesome";
import TrackingDetailView from './TrackingDetailView';


class TrackingSummaryView extends React.PureComponent {
    constructor() {
        super();
        this.state = {
                        isShowDetails :false,
                        insertRow : -1,
                        insertCol: "",
                      };

    }

    // static propTypes = {
    //     summaryData: React.PropTypes.array,  // tracking summaryData.
    //     detailedData: React.PropTypes.array,   // tracking detailData.
    // };

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

                        if (this.state.insertRow === index && this.state.insertCol == s){
                            return (<td className={trackCss.td} width={widthRate} key={s}>
                                <div type="button" className={trackCss.selectedCell} width="100%" height="100%"
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
                            return (<td className={trackCss.td} width={widthRate} key={s}>
                                <div type="button" width="100%" height="100%"
                                     onClick={this.insertDetailedRow.bind(this, s, index)}>
                                    <div className={trackCss.cell}>
                                        {stringRlt}
                                        <div style={{textAlign: 'right'}}>
                                        {(o[s][index]['comment'] !== "" && o[s][index]['comment'] !== undefined)?

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

    render() {
        let dataSummary =  this.unifyDataLength(trackingData.summaryData);
        let dataDetail = this.unifyDataLength(trackingData.detailData);
        let fieldsHead = Object.keys(trackingData.summaryData);
        let lengthArray = fieldsHead.map((s) =>{ return (trackingData.summaryData[s].length)});
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

        return (
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

        );
    }
}


export default TrackingSummaryView;


