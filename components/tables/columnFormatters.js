"use strict";
import tableNames from '../constants/tableNames';



const columnFormatters = {

    [tableNames.PEOPLE]: (data) => data.map((d) => {
        d.name = d.last_name +' '+ d.first_name;
        return d;
    }),

    [tableNames.PROJECTS]: (data) => data.map((d) => {
        d.author = d.author_last_name +' '+d.author_first_name;
        return d;
    }),

};


export default columnFormatters;

