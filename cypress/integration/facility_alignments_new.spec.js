describe('Alignments - HTML Web Form', function() {

    context('New Alignments HTML form submission', function() {
        beforeEach(function () {
            cy.login("test", "test")
        })

        it('visit alignments new page', function(){
            cy.visit('/#/facility/alignments/new')

            //pull down columns
            cy.get('select#analysisTypeId').select("1")
            cy.get('select#runId').select("1076")
            cy.get('select#basecallingId').select("1634")
            cy.get('select#mappingToolId').select("1")

            //input columns
            cy.get('input#elandOutputDir').type('Data/Intensities/Bustard1.5.0_05-10-2009_sbsuser/GERALD_05-10-2009_sbsuser')


            cy.get('button[type=submit]').click()

            cy.url().should('include', '/alignments/list')

        })

    })
})
