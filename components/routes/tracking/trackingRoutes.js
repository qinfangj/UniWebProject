"use strict";
import React from 'react';
import TrakingSummaryView from '../../forms/tracking/TrakingSummaryView';
import TrackingData from '../../pages/TrackingData';



export class trackingTable extends React.Component {
    render() {
        return (
            <TrackingData title="Tracking" name="tracking" content={
                <TrakingSummaryView />
            }/>
        );
    }
}
