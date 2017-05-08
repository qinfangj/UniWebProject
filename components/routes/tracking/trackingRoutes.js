"use strict";
import React from 'react';
import TableCellClick from '../../forms/tracking/TableCellClick';
import TrackingData from '../../pages/TrackingData';



export class trackingTable extends React.Component {
    render() {
        return (
            <TrackingData title="Tracking" name="tracking" content={
                <TableCellClick />
            }/>
        );
    }
}
