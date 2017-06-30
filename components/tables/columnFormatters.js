"use strict";
import tableNames from './tableNames';



const columnFormatters = {
    [tableNames.PEOPLE]: (data) => data.map((d) => {
        d.name = d.last_name +' '+d.first_name;
        return d;
    }),

};


export default columnFormatters;

