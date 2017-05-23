"use strict";
import React from 'react';
import TrakingSummaryView from '../forms/tracking/TrackingSummaryView';
import TrackingData from '../pages/TrackingData';

export class trackingSamples extends React.Component {
    render() {
        return (
            <TrackingData title="Tracking" name="tracking" content={
                <TrakingSummaryView dataStoreKey="samples" />
            }/>
        );
    }
}

export class trackingLibraries extends React.Component {
    initalLaneNo(data){
        //console.log(data);
        let initalData = {};
        for (let key in data){
            let sub = data[key];
            //console.log(sub[0]==null);
            let arrValue = [];
            arrValue = sub.map((s) => {
                    if (s == null ) {
                        return null
                    } else {
                        return {value: "",valid: true}
                    }
                }
            );

            initalData[key] = arrValue;
        }
        //console.log(initalData);
        return initalData;
    }
    render() {
        return (
            <TrackingData title="Tracking" name="tracking" content={
                <TrakingSummaryView dataStoreKey="libraries" isLibrary={true} initalLaneNo={this.initalLaneNo}/>
            }/>
        );
    }
}

export class trackingRuns extends React.Component {
    render() {
        return (
            <TrackingData title="Tracking" name="tracking" content={
                <TrakingSummaryView dataStoreKey="runs" />
            }/>
        );
    }
}