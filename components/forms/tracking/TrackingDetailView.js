"use strict";

import React from 'react';
import trackingData from '../../forms/tracking/trackingData';
import trackCss from './tracking.css';
import Icon from "react-fontawesome";


class TrackingDetailView extends React.PureComponent {
    constructor() {
        super();
    }

    SampleDetailsTb(k,v){

        console.log(k);
        let rowSpan = (k==='Customer Comment')? 2:null;

        return (<tr key={k}>
                    <th rowSpan={rowSpan}>{k + ':'}</th><td rowSpan={rowSpan}>{v}</td>
                </tr>)

    }

    RequestsDetailsTbs(k,v){
        let headers = Object.keys(v);
        let makeBody = headers.map(
            s => {
                if (s !== 'Comment'){
                    return (
                        <td key={v[s]}>{v[s]}</td>
                    )
                }
            }
        );

        return (
                 <tbody key={k}>
                 <tr >{makeBody}</tr>
                 <tr ><td colSpan='9'>
                     <Icon name="comment" style={{color:'pink',padding:'5px'}}/> {(v['Comment'] !== undefined)? v['Comment'] : '--'}</td></tr>
                 </tbody>

             )
    }

    render() {
           let dataSample = this.props.detailData['sample'];
           let dataRequests = this.props.detailData['requests'];
           console.log(dataSample);
           console.log(dataRequests);
           let requestheaders = Object.keys(dataRequests[0]);
           let headerWidth = 100/(requestheaders.length-1) +'%';
           let makeRequstsHeader = requestheaders.map(
                s => {
                    if (s !== 'Comment') {
                        return (
                            <th key={s} width={headerWidth}>{s}</th>
                        )
                    }
                }
           );

           return (
                    <div className={trackCss.div1}>

                    <div className={trackCss.div2}>
                        <h4>Sample details</h4>
                        <table width='100%'>
                            <tbody>
                            {
                                Object.keys(dataSample).map(
                                (s) => this.SampleDetailsTb(s,dataSample[s]))
                            }

                            </tbody>
                        </table>
                    </div>
                    <div className={trackCss.div3}>
                        <h4>Open Request(s)</h4>
                        <table width='100%' style = {{border:'1px solid grey'}}>
                            <thead>
                            <tr>{makeRequstsHeader}</tr>
                            </thead>

                            {
                                Object.keys(dataRequests).map(
                                    (s) => this.RequestsDetailsTbs(s,dataRequests[s])
                                            )
                            }
                        </table>
                    </div>
                    </div>



                  )
    }

}

export default TrackingDetailView;
