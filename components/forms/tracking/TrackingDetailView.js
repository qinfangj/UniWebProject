"use strict";

import React from 'react';
import trackingData from '../../forms/tracking/trackingData';
import trackingDataModel from './trackingDataModel';
import trackCss from './tracking.css';
import Icon from "react-fontawesome";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Form from 'react-bootstrap/lib/Form';


class TrackingDetailView extends React.PureComponent {
    constructor() {
        super();
    }

    SampleDetailsTb(k, v){

        let rowSpan = (k === 'Customer Comment')? 2:null;

        return (<tr key={k}>
            <th rowSpan={rowSpan}>{k + ':'}</th><td rowSpan={rowSpan}>{v}</td>
        </tr>)

    }

    RequestsDetailsTbs(k, obj){
        //console.log(k.name);
        let td = [];
        for (let i = 0; i < obj.length; i++){
            td.push(<td key={k.name + i}> {obj[i][k.name]} </td>);
        }
        //console.log(td);
        return td

    }

    // RequestsDetailsTbs(k,v,model){
    //     let headers = Object.keys(v);
    //     let makeBody = model.map(
    //         s => {
    //             if (s.name !== 'comment'){
    //                 return (
    //                     <td key={s.name}>{v[s.name]==null?"":v[s.name]}</td>
    //                 )
    //             }
    //         }
    //     );
    //
    //     return (
    //              <tbody key={k}>
    //              <tr >{makeBody}</tr>
    //              {/*<tr ><td colSpan='10'>*/}
    //                  {/*<Icon name="comment" style={{color:'#fff',padding:'5px'}}/> {(v['comment'] !== undefined && v['comment'] != null)? v['comment'] : '--'}</td></tr>*/}
    //              </tbody>
    //
    //          )
    // }

    render() {
           let dataSample = this.props.detailData['desc'];
           let dataRequests = this.props.detailData['requests'];
           //console.log(dataSample);
           console.log(dataRequests);
           let dataKey = "";
           dataKey = this.props.dataKey;
           //console.log(dataKey);
           let summaryModel = null;
           let requestModel = trackingDataModel.requestDetails;
           if (dataKey === "samples") {
               summaryModel = trackingDataModel.summaryDetailSamples;
           } else if (dataKey ==="runs"){
               summaryModel = trackingDataModel.summaryDetailRuns;
           } else if (dataKey = "libraries"){
               summaryModel = trackingDataModel.summaryDetailLibraries;
           }

           let requestheaders = Object.keys(dataRequests[0]);
           let headerWidth = 100/(requestheaders.length-1) +'%';
           let makeRequstsHeader = trackingDataModel.requestDetails.map(
                s => {
                        return (
                            <th key={s.name} width={headerWidth}>{s.label}</th>
                        );
                }
           );

           return (

                    <div className={trackCss.div1}>
                    <Col sm={4} className={trackCss.div2}>

                        <h4>Sample details</h4>
                        <table width='100%' >
                            <tbody>
                            {
                                summaryModel.map(
                                (s) => this.SampleDetailsTb(this, s.label, dataSample[s.name]))
                            }

                            </tbody>
                        </table>

                    </Col>
                    <Col sm={8} className={trackCss.div3}>

                        <h4>Open Request(s)</h4>
                        {/*<table width='100%' style = {{border:'1px solid grey'}}>
                            <thead>
                            <tr>{makeRequstsHeader}</tr>
                            </thead>

                            {
                                Object.keys(dataRequests).map(
                                    (s) => this.RequestsDetailsTbs(s,dataRequests[s],requestModel)
                                            )
                            }

                        </table>*/}
                        <table width='100%'>
                            <tbody>
                            {
                                requestModel.map(
                                    (s) => {
                                        return (
                                            <tr key={s.label}><th width = '150px'>{s.label}</th>{this.RequestsDetailsTbs(s, dataRequests)}</tr>)
                                    })
                            }
                            </tbody>
                        </table>

                    </Col>
                    </div>




                  )
    }

}

export default TrackingDetailView;
