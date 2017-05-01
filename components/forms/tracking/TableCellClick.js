"use strict";

import React from 'react';
import trackingData from '../../forms/tracking/trackingData';
import trackCss from './tracking.css'


class TableCellClick extends React.PureComponent {
    constructor() {
        super();
        this.state = {
                        isShowDetails :false,
                        insertRow : -1,
                        insertCol: "",
                      };
        // this.summaryData = {
        //     'classA': [{id: 1},{id: 2},{id: 3},{id: 4}],
        //     'classB': [{code: '002'},{code: '003'},{code: '004'}],
        //     'classC': [{type: 'C01'},{type: 'C02'}]
        // };
        // this.detailData = {
        //     'classA': [
        //                 {
        //                     id: 1,
        //                     contents: ["Push successful","Push successful"]
        //                 },
        //                 {
        //                     id: 2,
        //                     contents: ["Plugin Updates","Plugin Updates","Plugin Updates","Plugin Updates"]
        //                 },
        //                 {
        //                     id: 3,
        //                     contents: ["Git Pull Failed","Git Pull Failed","Git Pull Failed","Git Pull Failed"]
        //                 },
        //                 {
        //                     id: 4,
        //                     contents: ["Merge branch","Merge branch","Merge branch",
        //                     "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch",
        //                     "Merge branch","Merge branch","Merge branch","Merge branch","Merge branch"]
        //                 }
        //                 ],
        //     'classB': [
        //                 {
        //                     code: '002',
        //                     contents: ["AAAAAAAAAAAAAAA","BBBBBBBBBBBBB"]
        //                 },
        //                 {
        //                     code: '003',
        //                     contents: ["DDDDDDDDDD","FFFFFFFFFF","EEEEEEEEEE","GGGGGGGGGGGG"]
        //                 },
        //                 {
        //                     code: '004',
        //                     contents: ["HHHHHHHHHHHH","LLLLLLLLLLLL","MMMMMMMMMMMM","KKKKKKKKKKKKKKK"]
        //                 },
        //                 ],
        //     'classC': [
        //                 {
        //                     type: 'C01',
        //                     contents: ["AAAAAAAAAAAAAAA","BBBBBBBBBBBBB"]
        //                 },
        //                 {
        //                     type: 'C02',
        //                     contents: ["DDDDDDDDDD","FFFFFFFFFF","EEEEEEEEEE","GGGGGGGGGGGG"]
        //                 },
        //
        //                 ]
        // };
    }

    // static propTypes = {
    //     summaryData: React.PropTypes.array,  // tracking summaryData.
    //     detailedData: React.PropTypes.array,   // tracking detailData.
    // };

    unifyDataLength(o){
        let arrA = o.classA;
        let arrB = o.classB;
        let arrC = o.classC;

        let fieldsHead = Object.keys(o);

        let lengthMax = Math.max(arrA.length,arrB.length,arrC.length);
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
                //console.log(o[s][index]);
                let widthRate = 100/(Object.keys(o).length) + "%";
                    if (o[s][index]!== null) {

                        if (this.state.insertRow === index && this.state.insertCol == s){
                            return (<td width={widthRate} className= {trackCss.selectedCell}  key={s}>
                                <div type="button" className={trackCss.buttonDiv} width="100%" height="100%" style={{textAlign: 'center'}}
                                     onClick={this.insertDetailedRow.bind(this, s, index)}><p className={trackCss.p.selectedCell}>{JSON.stringify(o[s][index])}</p></div>
                            </td>)
                        } else {
                            return (<td className= {trackCss.td} key={s}>
                                <div type="button" width="100%" height="100%"
                                     onClick={this.insertDetailedRow.bind(this, s, index)}><p className={trackCss.p}>{JSON.stringify(o[s][index])}</p></div>
                            </td>)
                        }
                    } else { return (<td width={widthRate} className= {trackCss.td} key={s}><p className={trackCss.p}>&nbsp;</p></td>);}
            }
        );
        //console.log(index);
        return td
    }

    makeDetailedTr(row,key,data){
        let details = data[key][row];
        let stringDetails = "";
        for (let key in details){
            stringDetails = stringDetails + key + ":" + details[key] + "\r\n";
        }

        return (data[key][row] !== undefined)?
                (<tr key={row +1}><td colSpan={Object.keys(data).length} className= {trackCss.td}><p className={trackCss.showmore}>

                        {/*JSON.stringify(data[key][row])*/}
                    {stringDetails}
                     </p></td></tr>)
                  :(<tr key={row +1}><td colSpan={Object.keys(data).length} className= {trackCss.td}><p className={trackCss.showmore}>No details</p></td></tr>)
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
                rows.push(<tr key={i} >{this.makeTr(dataSummary, i)}</tr>);
            }

            rows.push(this.makeDetailedTr(this.state.insertRow, this.state.insertCol, dataDetail));

            for (let i = this.state.insertRow+1; i < maxlength; i++) {
                rows.push(<tr key={i+2}>{this.makeTr(dataSummary, i)}</tr>);
            }

            let row = document.getElementById("myTable").rows;
            row[this.state.insertRow].scrollIntoView(true);
        } else {
            for (let i = 0; i < maxlength; i++) {
                rows.push(<tr key={i}>{this.makeTr(dataSummary, i)}</tr>);
            }
        }

        return (
                <table id="myTable" className={trackCss.table} >
                    <thead>
                        <tr>
                        {
                            fieldsHead.map((s) =>
                                    {
                                        return (<th className= {trackCss.th}  key={s}><p className={trackCss.header}>{s}</p> </th>)
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


export default TableCellClick;


