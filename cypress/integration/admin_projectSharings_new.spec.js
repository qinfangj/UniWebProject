describe('Admin Project Sharings - HTML Web Form', function() {

    context('HTML form submission', function() {
        beforeEach(function () {
            cy.login("test", "test")
        })

        it('visit admin Project Sharings new page', function(){

            cy.visit('/#/admin/project_sharings/new')
            //input columns
            cy.get('input#description').type("description project sharings")

            //select columns
            cy.get('select#projectId').select('52')
            cy.get('select#personId').select('26')


            cy.get('button[type=submit]').click()

            cy.url().should('include', '/project_sharings/list')

        })

    })
})
