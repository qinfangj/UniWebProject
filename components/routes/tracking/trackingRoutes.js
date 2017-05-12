"use strict";
import React from 'react';
import TrakingSummaryView from '../../forms/tracking/TrakingSummaryView';
import TrackingData from '../../pages/TrackingData';



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
    render() {
        return (
            <TrackingData title="Tracking" name="tracking" content={
                <TrakingSummaryView dataStoreKey="libraries" isLibrary={true} />
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