describe('Facility Libraries - HTML Web Form', function() {

    context('New libraries HTML form submission', function() {
        beforeEach(function () {
            cy.login("test", "test")
        })

        it('visit libraries new page', function(){
            cy.visit('/#/facility/libraries/new')

            //input columns
            cy.get('input#name').type("library1")
            cy.get('input#startingMaterial').type("material1")

            //cy.get('input#libraryDate').type("2017-08-01")
            cy.get('input#bioanalyserPeak').type("1")
            cy.get('input#fragSizeMin').type("1")
            cy.get('input#fragSizeMax').type("8")
            cy.get('input#concentration').type("100")

            // //pull down columns
            cy.get('select#projectId').select('707')
            cy.get('select#sampleId').select('28797')
            cy.get('select#libProtocolId').select('42')
            cy.get('select#quantifMethodId').select('1')
            cy.get('select#multiplexIndexId').select('14')
            cy.get('select#index5primeId').select('14')
            cy.get('select#adapterId').select('14')
            cy.get('select#libraryStateId').select('1')

            cy.get('button[type=submit]').click()

            cy.url().should('include', '/libraries/list')

        })

    })
})
