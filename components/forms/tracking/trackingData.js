
let largeDataA =[];
for (let i = 0; i < 5; i++){
    largeDataA.push({
                         lab: "Ablasser ",
                         project: "CRISPR screen II - mmMacrophages",
                         data: "2017-04-26",
                         name: "aaa",
                         type: "total RNA",
                         comment: "aa"

                     });
}
//console.log(largeDataA);
const trackingData = {

    summaryData : {
        'MiSeq SR 150': largeDataA,
        'Paired-end reads 100': [{lab: "Ablasser ",
                                  project: "CRISPR screen II - mmMacrophages",
                                  data: "2017-04-26",
                                  name: "aaa",
                                  type: "total RNA",
                                  comment: "bb"},{code: '003'},{code: '004'}],
        'Single read 100': [{
            lab: "Ablasser ",
            project: "CRISPR screen II -aaaa",
            data: "2017-04-26",
            name: "aaa",
            type: "total RNA"
            },{type: 'C02'}],
        'ClassD': [{lab: "Ablasser ",
                    project: "CRISPR screen II - mmMacrophages",
                    data: "2017-04-26",
                    name: "aaa",
                    type: "total RNA",
                    comment: "cc"},{type: 'D02'}]
    },
    detailData:{
        'MiSeq SR 150': [
            {
                id: 1,
                sample: {'ID':'22764','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                            'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                            'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25352','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                                'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                                'Comment':'to be sequenced with library test_D2 which has Index N716/S510'},
                           {'ID':'25353','Sample':'ML4','Laboratory':'Herr1','Libratory':'Commecial1',
                               'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                               'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
            {
                id: 2,
                sample: {'ID':'22765','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                    'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                    'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25354','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                    'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                    'Comment':'to be sequenced with library test_D2 which has Index N716/S510'},
                    {'ID':'25355','Sample':'ML4','Laboratory':'Herr1','Libratory':'Commecial1',
                        'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                        'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
            {
                id: 3,
                sample: {'ID':'22766','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                    'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                    'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25356','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                    'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                    'Comment':'to be sequenced with library test_D2 which has Index N716/S510'},
                    {'ID':'25357','Sample':'ML4','Laboratory':'Herr1','Libratory':'Commecial1',
                        'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                        'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
            {
                id: 4,
                sample: {id:'22767',name:'ML3',Protocol:'Commercial',date:'2016-08-23'},
                requests: [{id:'25358',sample:'ML3',laboratory:'Herr',libratory:'Commecial'},
                    {id:'25359',sample:'ML4',laboratory:'Herr1',libratory:'Commecial1'}]
            }
        ],
        'Paired-end reads 100': [
            {
                code: '002',
                sample: {'ID':'22766','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                    'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                    'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25356','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                    'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                    'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
            {
                code: '003',
                sample: {'ID':'22766','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                    'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                    'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25356','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                    'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                    'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
            {
                code: '004',
                sample: {'ID':'22766','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                    'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                    'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25356','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                    'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                    'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
        ],
        'Single read 100': [
            {
                type: 'C01',
                sample: {'ID':'22766','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                    'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                    'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25356','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                    'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                    'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
            {
                type: 'C02',
                sample: {'ID':'22766','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                    'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                    'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25356','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                    'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                    'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
        ],
        'ClassD': [
            {
                type: 'D01',
                sample: {'ID':'22766','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                    'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                    'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25356','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                    'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                    'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },
            {
                type: 'D02',
                sample: {'ID':'22766','Name':'ML3','Protocol':'Commercial','Recieve Date':'2016-08-23','Type':'genomic DNA','Organism':'Apis mellifera (honey bee)',
                    'project':'Honey bee gut metagenome','Lab':'Engel','Facility Comment':'',
                    'Customer Comment':'Diagenode Microplex library preparation Kit. No size selection. Fragment analyzer peak is not realiable because peak is very wide'},
                requests: [{'ID':'25356','Sample':'ML3','Laboratory':'Engel','Libratory':'Nextera XT DNA',
                    'Run type':'paried-end reads','Nb lanes': '1','Mutiplex':'3','Group': 'group 1','Submitter': 'mlopes',
                    'Comment':'to be sequenced with library test_D2 which has Index N716/S510'}]
            },

        ]
    }

};

export default trackingData;
