describe('Facility Projects - HTML Web Form', function() {

    context('New projects HTML form submission', function() {
        beforeEach(function () {
            cy.login("test", "test")
        })

        it('visit projects new page', function(){
            cy.visit('/#/facility/projects/new')

            //input columns
            cy.get('input#name').type("projectnew5")
            cy.get('input#codeName').type("Tcells_AB")
            cy.get('input#description').type("description1 2 3 4")
            cy.get('input#userMeetingDate').type("2017-08-01")

            // //pull down columns
            cy.get('select#personId').select('50')
            cy.get('select#projectStateId').select('1')
            cy.get('select#projectAnalysisId').select('1')

            cy.get('button[type=submit]').click()

            cy.url().should('include', '/projects/list')

        })

    })
})
